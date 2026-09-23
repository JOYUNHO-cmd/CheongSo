import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = 'http://127.0.0.1:3101';

test('homepage head preserves both Naver site verification tokens once each', async () => {
  const response = await fetch(base + '/');
  assert.equal(response.status, 200);

  const document = new JSDOM(await response.text()).window.document;
  const tags = document.head.querySelectorAll('meta[name="naver-site-verification"]');

  assert.deepEqual([...tags].map(tag => tag.getAttribute('content')).sort(), [
    'fe4c8205531b56fe1f25b4ec59355e26caddc83b',
    '36e2b575b85f34bdbe15e6e05ac5afeb35c29eb2',
  ].sort());
});
