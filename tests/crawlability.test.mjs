import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { galleryHref, galleryPageNumber, GALLERY_PAGE_SIZE } from '../src/lib/gallery-navigation.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';
const origin = 'https://www.cheongso.co.kr';
const categories = JSON.parse(readFileSync(new URL('../src/lib/gallery-data.json', import.meta.url), 'utf8'));
const items = categories.flatMap(category => category.items);
async function page(path) {
  const response = await fetch(base + path);
  return { response, doc: new JSDOM(await response.text()).window.document };
}

test('gallery page parameters reject malformed and repeated values', () => {
  assert.equal(galleryPageNumber(undefined), 1);
  assert.equal(galleryPageNumber('2'), 2);
  for (const value of ['0', '-1', '1.5', 'Infinity', '02', '1/', ['1', '2']]) assert.equal(galleryPageNumber(value), null);
  assert.equal(galleryHref('all', null, 2), '/gallery/?page=2');
  assert.equal(galleryHref('fire', 'fire-g02', 2), '/gallery/?category=fire&item=fire-g02&page=2');
});

test('every gallery photo is reachable in stable server-rendered pagination', async () => {
  const observed = [];
  const pages = Math.ceil(items.length / GALLERY_PAGE_SIZE);
  for (let number = 1; number <= pages; number++) {
    const path = galleryHref('all', null, number);
    const { response, doc } = await page(path);
    assert.equal(response.status, 200, path);
    assert.equal(doc.querySelector('link[rel="canonical"]').href, origin + path);
    const photos = [...doc.querySelectorAll('main img')].map(img => img.getAttribute('src')).filter(src => src.includes('/gallery-v2/'));
    const expected = items.slice((number - 1) * GALLERY_PAGE_SIZE, number * GALLERY_PAGE_SIZE);
    assert.deepEqual(photos, expected.flatMap(item => [`/images/gallery-v2/${item.before}`, `/images/gallery-v2/${item.after}`]), path);
    observed.push(...photos);
    const links = [...doc.querySelectorAll('nav[aria-label="현장사진 페이지 이동"] a')].map(a => a.getAttribute('href'));
    if (number < pages) assert.ok(links.includes(galleryHref('all', null, number + 1)));
    if (number > 1) assert.ok(links.includes(galleryHref('all', null, number - 1)));
  }
  assert.equal(observed.length, items.length * 2);
  assert.equal(new Set(observed).size, observed.length);
});

test('category links and metadata describe the selected photos', async () => {
  const { doc: home } = await page('/gallery/');
  const links = new Set([...home.querySelectorAll('main a')].map(a => a.getAttribute('href')));
  for (const category of categories) {
    assert.ok(links.has(galleryHref(category.slug)), category.slug);
    const { response, doc } = await page(galleryHref(category.slug));
    assert.equal(response.status, 200);
    assert.ok(doc.title.includes(category.label));
    assert.equal(doc.querySelector('link[rel="canonical"]').href, origin + galleryHref(category.slug));
    const photos = [...doc.querySelectorAll('main img')].map(img => img.getAttribute('src')).filter(src => src.includes('/gallery-v2/'));
    assert.deepEqual(photos, category.items.slice(0, GALLERY_PAGE_SIZE).flatMap(item => [`/images/gallery-v2/${item.before}`, `/images/gallery-v2/${item.after}`]));
  }
});

test('invalid gallery pages are excluded from indexing', async () => {
  for (const path of ['/gallery/?page=0', '/gallery/?page=99999', '/gallery/?page=2&page=3']) {
    const { response, doc } = await page(path);
    assert.ok(response.status === 404 || doc.querySelector('meta[name="robots"][content*="noindex"]'), path);
    assert.equal(doc.querySelectorAll('main img').length, 0);
  }
});

test('public business details and service providers share one identity', async () => {
  const { doc } = await page('/사무실청소/');
  const data = [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(script => JSON.parse(script.textContent));
  const organization = data.find(item => item['@id'] === origin + '/#organization');
  assert.equal(organization.address.streetAddress, '군포시 도마교동 463 1층');
  assert.equal(organization.email, 'danger3662@naver.com');
  assert.equal(data.find(item => item['@type'] === 'Service').provider['@id'], organization['@id']);
  const { doc: home } = await page('/');
  assert.ok(home.querySelector('main a[href="/reviews/"]'));
});
