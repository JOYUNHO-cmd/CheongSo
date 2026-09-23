import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';
async function page(path) {
  const response = await fetch(base + encodeURI(path));
  assert.equal(response.status, 200);
  return new JSDOM(await response.text()).window.document;
}

test('fire entry guidance links to real sections without replacing the facts table', async () => {
  const doc = await page('/화재청소/');
  const intro = doc.querySelector('#quickfacts [data-fire-pilot]');
  assert.ok(intro, 'a concise entry guide precedes the full detail');
  for (const id of ['scope', 'estimate', 'cases']) {
    assert.ok(intro.querySelector(`a[href="#${id}"]`));
    assert.ok(doc.getElementById(id));
  }
  assert.ok(doc.querySelector('#quickfacts table'));
});

test('fire onward choices explain their context and the gallery returns to the case section', async () => {
  const doc = await page('/화재청소/');
  const guide = doc.querySelector('#scope [data-fire-pilot]');
  assert.ok(guide);
  for (const href of ['/폐기물처리/', '/신축준공청소/']) {
    const link = guide.querySelector(`a[href="${href}"]`);
    assert.ok(link);
    assert.ok(link.closest('li').querySelector('p')?.textContent.length > 30);
    await page(href);
  }
  const gallery = await page('/gallery/?category=fire&item=fire-g02');
  assert.ok(gallery.querySelector('a[href="/화재청소/#cases"]'));
  const other = await page('/gallery/?category=office');
  assert.equal(other.querySelector('a[href="/화재청소/#cases"]'), null);
});
