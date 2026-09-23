import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveGallerySelection, galleryHref } from '../src/lib/gallery-navigation.ts';

const categories = [
  { slug: 'office', items: [{ id: 'office-g01' }] },
  { slug: 'fire', items: [{ id: 'fire-g02' }] },
];

test('category links select only the requested field', () => {
  assert.deepEqual(resolveGallerySelection(categories, { category: 'office' }), { category: 'office', item: null });
});
test('a case link selects its own category, even with conflicting input', () => {
  assert.deepEqual(resolveGallerySelection(categories, { category: 'office', item: 'fire-g02' }), { category: 'fire', item: 'fire-g02' });
});
test('unknown or repeated parameters fall back safely', () => {
  assert.deepEqual(resolveGallerySelection(categories, { category: 'missing', item: 'missing' }), { category: 'all', item: null });
  assert.deepEqual(resolveGallerySelection(categories, { category: ['fire', 'office'], item: ['fire-g02'] }), { category: 'all', item: null });
});
test('generated links round trip and all has a clean URL', () => {
  const url = new URL(galleryHref('fire', 'fire-g02'), 'https://www.cheongso.co.kr');
  assert.deepEqual(resolveGallerySelection(categories, Object.fromEntries(url.searchParams)), { category: 'fire', item: 'fire-g02' });
  assert.equal(galleryHref('all'), '/gallery/');
});

test('opening a photo from all preserves the all filter', () => {
  const url = new URL(galleryHref('all', 'fire-g02'), 'https://www.cheongso.co.kr');
  assert.deepEqual(resolveGallerySelection(categories, Object.fromEntries(url.searchParams)), { category: 'all', item: 'fire-g02' });
});
