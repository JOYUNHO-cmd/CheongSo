import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Module from 'node:module';
import test from 'node:test';
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { JSDOM } from 'jsdom';
import ts from 'typescript';

// Compile the actual TSX in memory; no production server or generated files are needed.
const componentPath = fileURLToPath(new URL('../src/components/HeroVideo.tsx', import.meta.url));
const compiled = new Module(componentPath);
compiled.filename = componentPath;
compiled.paths = Module._nodeModulePaths(dirname(componentPath));
compiled._compile(ts.transpileModule(readFileSync(componentPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
}).outputText, componentPath);
const HeroVideo = compiled.exports.default;
const interactionEvents = ['pointerdown', 'touchstart', 'wheel', 'keydown'];

async function mountVideo({ width = 390, mode = 'background', reducedMotion = false } = {}) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { pretendToBeVisual: true, url: 'http://hero-video.test/' });
  const { window } = dom;
  const descriptors = new Map();
  function expose(name, value) {
    descriptors.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
    Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
  }
  for (const name of ['window', 'document', 'navigator', 'HTMLElement', 'HTMLMediaElement']) expose(name, name === 'window' ? window : window[name]);
  expose('IS_REACT_ACT_ENVIRONMENT', true);
  const environment = { width, reducedMotion, hidden: false };
  Object.defineProperty(window.document, 'hidden', { configurable: true, get: () => environment.hidden });
  Object.defineProperty(window.document, 'readyState', { configurable: true, get: () => 'complete' });

  const queries = [];
  window.matchMedia = query => {
    const listeners = new Set();
    const result = {
      media: query,
      get matches() {
        if (query.includes('prefers-reduced-motion')) return environment.reducedMotion;
        if (query.includes('max-width: 767px')) return environment.width <= 767;
        if (query.includes('min-width: 768px')) return environment.width >= 768;
        return true;
      },
      addEventListener: (type, listener) => { if (type === 'change') listeners.add(listener); },
      removeEventListener: (type, listener) => listeners.delete(listener),
      change: () => { for (const listener of listeners) listener({ matches: result.matches, media: query }); },
    };
    queries.push(result);
    return result;
  };

  const observers = [];
  class IntersectionObserverMock {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    disconnect() { this.targets.clear(); }
  }
  expose('IntersectionObserver', IntersectionObserverMock);
  window.IntersectionObserver = IntersectionObserverMock;

  let sequence = 0;
  const timers = new Map();
  const idleCallbacks = new Map();
  window.setTimeout = (callback, delay) => { const id = ++sequence; timers.set(id, { callback, delay }); return id; };
  window.clearTimeout = id => timers.delete(id);
  window.requestIdleCallback = callback => { const id = ++sequence; idleCallbacks.set(id, callback); return id; };
  window.cancelIdleCallback = id => idleCallbacks.delete(id);

  const listeners = new Map();
  const removed = [];
  const add = window.addEventListener.bind(window);
  const remove = window.removeEventListener.bind(window);
  window.addEventListener = (type, listener, options) => {
    if (!listeners.has(type)) listeners.set(type, new Set());
    listeners.get(type).add(listener);
    add(type, listener, options);
  };
  window.removeEventListener = (type, listener, options) => {
    listeners.get(type)?.delete(listener);
    removed.push({ type, listener });
    remove(type, listener, options);
  };

  const calls = new WeakMap();
  const count = element => { if (!calls.has(element)) calls.set(element, { play: 0, pause: 0, load: 0 }); return calls.get(element); };
  window.HTMLMediaElement.prototype.play = function () { count(this).play++; return Promise.resolve(); };
  window.HTMLMediaElement.prototype.pause = function () { count(this).pause++; };
  window.HTMLMediaElement.prototype.load = function () { count(this).load++; };
  const root = createRoot(window.document.getElementById('root'));
  await act(async () => root.render(createElement(HeroVideo, { mode })));
  const videos = [...window.document.querySelectorAll('video')];

  return {
    window, videos, count, timers, idleCallbacks, listeners, removed,
    async ready() {
      await act(async () => {
        for (const [id, timer] of [...timers]) { timers.delete(id); assert.equal(timer.delay, 500); timer.callback(); }
        for (const [id, callback] of [...idleCallbacks]) { idleCallbacks.delete(id); callback({ didTimeout: false, timeRemaining: () => 10 }); }
      });
    },
    async intersect(target, isIntersecting = true) {
      await act(async () => {
        for (const observer of observers) if (observer.targets.has(target)) observer.callback([{ target, isIntersecting }]);
      });
    },
    async event(type) { await act(async () => window.dispatchEvent(new window.Event(type))); },
    async media(patch) { await act(async () => { Object.assign(environment, patch); for (const query of queries) query.change(); }); },
    async visibility(hidden) { await act(async () => { environment.hidden = hidden; window.document.dispatchEvent(new window.Event('visibilitychange')); }); },
    async cleanup() {
      await act(async () => root.unmount());
      dom.window.close();
      for (const [name, descriptor] of descriptors) {
        if (descriptor) Object.defineProperty(globalThis, name, descriptor);
        else delete globalThis[name];
      }
    },
  };
}

const sources = video => [...video.querySelectorAll('source')].map(source => source.getAttribute('src'));
// React/JSDOM may also install their own window listeners. Identify the gate by
// its same callback being registered for all four contracted interaction events.
const interactionGate = fixture => [...(fixture.listeners.get('wheel') ?? [])].find(listener => interactionEvents.every(type => fixture.listeners.get(type)?.has(listener)));

test('mobile keeps the poster until interaction even after load, idle and intersection', async () => {
  const fixture = await mountVideo();
  try {
    const [mobile, desktop] = fixture.videos;
    await fixture.intersect(mobile);
    await fixture.intersect(desktop);
    await fixture.ready();
    assert.equal(mobile.getAttribute('poster'), '/videos/hero-poster.jpg');
    assert.equal(mobile.getAttribute('preload'), 'none');
    assert.deepEqual(sources(mobile), []);
    assert.deepEqual(sources(desktop), []);
    assert.equal(mobile.autoplay, false);
    assert.equal(fixture.count(mobile).play, 0);
    await fixture.event('scroll');
    await fixture.event('resize');
    assert.deepEqual(sources(mobile), [], 'programmatic scroll and resize do not unlock playback');
    assert.equal(fixture.count(mobile).play, 0);
  } finally { await fixture.cleanup(); }
});

for (const type of interactionEvents) {
  test(`${type} unlocks mobile playback once and cleans up all interaction-gate listeners`, async () => {
    const fixture = await mountVideo();
    try {
      const [mobile] = fixture.videos;
      await fixture.intersect(mobile);
      await fixture.ready();
      const gate = interactionGate(fixture);
      assert.equal(typeof gate, 'function');
      const loadsBeforeInteraction = fixture.count(mobile).load;
      await fixture.event(type);
      assert.deepEqual(sources(mobile), ['/videos/hero-mobile.mp4']);
      assert.equal(mobile.autoplay, true);
      assert.ok(fixture.count(mobile).play > 0);
      assert.equal(fixture.count(mobile).load, loadsBeforeInteraction, 'active playback does not restart loading');
      for (const event of interactionEvents) assert.ok(fixture.removed.some(entry => entry.type === event && entry.listener === gate), event);
      assert.equal(interactionGate(fixture), undefined);
      const plays = fixture.count(mobile).play;
      await fixture.event('wheel');
      await fixture.event('touchstart');
      assert.equal(fixture.count(mobile).play, plays, 'one-time wheel/touch interaction gates remain removed');
    } finally { await fixture.cleanup(); }
  });
}

test('interaction before readiness does not bypass load/idle preparation or visibility safeguards', async () => {
  const fixture = await mountVideo();
  try {
    const [mobile] = fixture.videos;
    await fixture.intersect(mobile);
    await fixture.event('pointerdown');
    assert.deepEqual(sources(mobile), []);
    assert.equal(fixture.count(mobile).play, 0);
    await fixture.ready();
    assert.deepEqual(sources(mobile), ['/videos/hero-mobile.mp4']);
    await fixture.visibility(true);
    assert.deepEqual(sources(mobile), []);
    const stopped = fixture.count(mobile);
    assert.ok(stopped.pause > 0 && stopped.load > 0);
    await fixture.visibility(false);
    assert.deepEqual(sources(mobile), ['/videos/hero-mobile.mp4']);
    await fixture.intersect(mobile, false);
    assert.deepEqual(sources(mobile), []);
    await fixture.intersect(mobile, true);
    assert.deepEqual(sources(mobile), ['/videos/hero-mobile.mp4']);
    await fixture.media({ reducedMotion: true });
    assert.deepEqual(sources(mobile), []);
    await fixture.media({ reducedMotion: false });
    assert.deepEqual(sources(mobile), ['/videos/hero-mobile.mp4']);
  } finally { await fixture.cleanup(); }
});

test('desktop background and inline video have no interaction gate', async () => {
  for (const options of [{ width: 1280 }, { width: 390, mode: 'inline' }]) {
    const fixture = await mountVideo(options);
    try {
      const video = options.mode === 'inline' ? fixture.videos[0] : fixture.videos[1];
      await fixture.intersect(video);
      await fixture.ready();
      assert.deepEqual(sources(video), options.mode === 'inline' ? ['/videos/hero-mobile.mp4'] : ['/videos/hero-hd.mp4', '/videos/hero-web.mp4']);
      assert.ok(fixture.count(video).play > 0);
      // Background mode also mounts the hidden mobile player at desktop widths;
      // its gate must not prevent the separate desktop player from starting.
      if (options.mode === 'inline') assert.equal(interactionGate(fixture), undefined);
    } finally { await fixture.cleanup(); }
  }
});

test('reduced-motion mobile never starts the video and unmount removes timers/listeners', async () => {
  const fixture = await mountVideo({ reducedMotion: true });
  const gate = interactionGate(fixture);
  try {
    const [mobile] = fixture.videos;
    await fixture.intersect(mobile);
    await fixture.event('touchstart');
    await fixture.ready();
    assert.deepEqual(sources(mobile), []);
    assert.equal(fixture.count(mobile).play, 0);
  } finally { await fixture.cleanup(); }
  assert.equal(fixture.timers.size, 0);
  assert.equal(fixture.idleCallbacks.size, 0);
  for (const type of interactionEvents) assert.ok(!fixture.listeners.get(type)?.has(gate));
});

test('unmount before preparation cancels pending work and removes an unused interaction gate', async () => {
  const fixture = await mountVideo();
  const gate = interactionGate(fixture);
  assert.ok(fixture.timers.size > 0);
  assert.equal(typeof gate, 'function');
  await fixture.cleanup();
  assert.equal(fixture.timers.size, 0);
  assert.equal(fixture.idleCallbacks.size, 0);
  for (const type of interactionEvents) assert.ok(fixture.removed.some(entry => entry.type === type && entry.listener === gate));
});
