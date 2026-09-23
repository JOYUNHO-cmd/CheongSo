import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { serviceConnections } from '../src/lib/service-connections.ts';
import { galleryHref, resolveGallerySelection } from '../src/lib/gallery-navigation.ts';

const gallery = JSON.parse(readFileSync(new URL('../src/lib/gallery-data.json', import.meta.url), 'utf8'));
const regions = JSON.parse(readFileSync(new URL('../src/lib/regional-pages.json', import.meta.url), 'utf8'));

test('all service connections lead to an existing service or published regional route', () => {
  const routes = new Set([
    ...Object.keys(serviceConnections).map(slug => `/${slug}/`),
    ...regions.filter(record => record.reviewed).map(record => `/${record.service}/${record.region}/`),
  ]);
  assert.equal(Object.keys(serviceConnections).length, 34);
  for (const [slug, connection] of Object.entries(serviceConnections)) {
    for (const [, href] of connection.links) {
      assert.ok(routes.has(href), `${slug}: unknown destination ${href}`);
      assert.notEqual(href, `/${slug}/`, 'no self links');
    }
  }
});

test('curated gallery links resolve to real photo pairs and matching categories', () => {
  for (const connection of Object.values(serviceConnections)) {
    if (connection.gallery) assert.ok(gallery.some(category => category.slug === connection.gallery));
    for (const id of connection.cases ?? []) {
      const category = gallery.find(category => category.items.some(item => item.id === id));
      assert.ok(category, `missing case ${id}`);
      const item = category.items.find(item => item.id === id);
      for (const file of [item.before, item.after]) assert.ok(existsSync(new URL(`../public/images/gallery-v2/${file}`, import.meta.url)), file);
      const url = new URL(galleryHref(category.slug, id), 'https://www.cheongso.co.kr');
      assert.deepEqual(resolveGallerySelection(gallery, Object.fromEntries(url.searchParams)), { category: category.slug, item: id });
    }
  }
});
