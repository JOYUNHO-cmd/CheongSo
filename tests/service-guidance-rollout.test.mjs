import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const routes = Object.keys(JSON.parse(readFileSync(new URL('../src/lib/service-representative-images.json', import.meta.url))));
async function page(path) {
  const response = await fetch('http://127.0.0.1:3101' + encodeURI(path));
  assert.equal(response.status, 200, path);
  return new JSDOM(await response.text()).window.document;
}

test('each remaining service has one entry guide with existing section destinations', async () => {
  for (const slug of routes.filter(slug => slug !== '화재청소')) {
    const doc = await page(`/${slug}/`);
    const guides = doc.querySelectorAll('#quickfacts [data-service-entry]');
    assert.equal(guides.length, 1, slug);
    const links = [...guides[0].querySelectorAll('a')];
    assert.equal(links.length, 3, slug);
    assert.equal(new Set(links.map(a => a.hash)).size, 3);
    for (const link of links) assert.ok(doc.querySelector(link.hash), `${slug}: ${link.hash}`);
    assert.ok(doc.querySelector('#quickfacts table'), slug);
    assert.ok(doc.querySelector('aside[aria-label="상황에 맞는 관련 서비스"]'), slug);
  }
});

test('gallery returns to matching service evidence including case-only services', async () => {
  for (const [query, target] of [
    ['category=office', '/사무실청소/#cases'],
    ['category=flood', '/침수청소/#cases'],
    ['category=special&item=special-g18', '/유품정리/#photos'],
    ['category=floor-tile&item=floor-tile-g08', '/나노코팅/#cases'],
  ]) {
    const doc = await page('/gallery/?' + query);
    assert.ok(doc.querySelector(`a[href="${target}"]`), target);
    const [route, id] = target.split('#');
    assert.ok((await page(route)).getElementById(id), target);
  }
  const unrelated = await page('/gallery/?category=office');
  assert.equal(unrelated.querySelector('a[href="/유품정리/#photos"]'), null);
});
