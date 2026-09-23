import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

test('every office contents destination ends with a working return to its contents menu', async () => {
  const response = await fetch('http://127.0.0.1:3101/' + encodeURIComponent('사무실청소') + '/');
  assert.equal(response.status, 200);
  const doc = new JSDOM(await response.text()).window.document;
  const menu = doc.querySelector('nav[aria-label="목차"]');
  const destinations = [...menu.querySelectorAll('ol a')];
  assert.equal(destinations.length, 10);
  for (const entry of destinations) {
    const section = doc.querySelector(entry.getAttribute('href'));
    const back = section.lastElementChild.querySelector('a[href="#service-toc"]');
    assert.ok(back, `${section.id} must end with a return link`);
    assert.equal(back.getAttribute('aria-label'), '상단 메뉴로 이동');
    assert.ok(back.querySelector('svg[aria-hidden="true"]'), 'icon has an accessible link name without announcing decoration');
    assert.ok(doc.querySelector(back.getAttribute('href')).contains(menu));
  }
});
