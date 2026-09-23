import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';

test('homepage head exposes the Naver site verification token once', async () => {
  const response = await fetch(base + '/');
  assert.equal(response.status, 200);

  const document = new JSDOM(await response.text()).window.document;
  const tags = document.head.querySelectorAll('meta[name="naver-site-verification"]');

  assert.equal(tags.length, 1);
  assert.equal(tags[0].getAttribute('content'), 'fe4c8205531b56fe1f25b4ec59355e26caddc83b');
});
