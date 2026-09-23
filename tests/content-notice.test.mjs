import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3101';

for (const path of ['/', '/사무실청소/']) {
  test(`${path} provides the shared content notice and usable inquiry link`, async () => {
    const response = await fetch(base + path);
    assert.equal(response.status, 200);
    const document = new JSDOM(await response.text()).window.document;
    const notice = document.querySelector('footer #content-usage');
    assert.ok(notice, 'Notice must be in the shared footer');
    assert.match(notice.textContent, /무단 복제·재게시/);
    assert.match(notice.textContent, /법령상 허용되는 이용/);
    assert.match(notice.textContent, /제3자 자료의 권리/);
    assert.ok(notice.querySelector('details > summary'));
    assert.equal(notice.querySelector('a').getAttribute('href'), 'mailto:danger3662@naver.com');
  });
}
