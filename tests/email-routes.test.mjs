import assert from 'node:assert/strict';
import test from 'node:test';
import { POST as quote } from '../src/app/api/quote/route.ts';
import { POST as consultation } from '../src/app/api/consultation-email/route.ts';

const request = body => new Request('http://localhost/api/test/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
const handlers = [
  { name: 'quote', post: quote, valid: { name: '테스트', phone: '01000000000', service: '사무실청소', region: '안양' }, invalid: [{ name: 12 }, { name: ' ', phone: ' ', service: ' ', region: ' ' }], longField: 'notes', max: 5000 },
  { name: 'consultation', post: consultation, valid: { summary: '테스트 상담 내용' }, invalid: [{ summary: 12 }, { summary: ' ' }], longField: 'summary', max: 10000 },
];

for (const handler of handlers) {
  test(`${handler.name}: invalid JSON, shapes and oversized fields never send email`, async t => {
    const fetchMock = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected external request'); });
    for (const body of ['{', 'null', '[]', '{}', ...handler.invalid.map(JSON.stringify), JSON.stringify({ ...handler.valid, [handler.longField]: 'x'.repeat(handler.max + 1) })]) {
      const response = await handler.post(request(body));
      assert.equal(response.status, 400, body.slice(0, 80));
      assert.equal((await response.json()).ok, false);
    }
    assert.equal(fetchMock.mock.callCount(), 0);
  });

  test(`${handler.name}: missing configuration returns JSON 503`, async t => {
    const originalKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    t.after(() => { if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey; });
    assert.equal((await handler.post(request(JSON.stringify(handler.valid)))).status, 503);
  });

  test(`${handler.name}: success and provider failures are handled without real delivery`, async t => {
    const original = { key: process.env.RESEND_API_KEY, to: process.env.QUOTE_EMAIL_TO };
    process.env.RESEND_API_KEY = 'test-only';
    process.env.QUOTE_EMAIL_TO = 'test@example.invalid';
    t.after(() => {
      if (original.key === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = original.key;
      if (original.to === undefined) delete process.env.QUOTE_EMAIL_TO; else process.env.QUOTE_EMAIL_TO = original.to;
    });
    t.mock.method(console, 'error', () => {});
    const send = t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(url, 'https://api.resend.com/emails');
      assert.equal(JSON.parse(options.body).to, 'test@example.invalid');
      assert.ok(options.signal instanceof AbortSignal);
      return Response.json({ id: 'mock-only' });
    });
    assert.equal((await handler.post(request(JSON.stringify(handler.valid)))).status, 200);
    send.mock.mockImplementation(async () => Response.json({ error: 'unavailable' }, { status: 429 }));
    assert.equal((await handler.post(request(JSON.stringify(handler.valid)))).status, 502);
    send.mock.mockImplementation(async () => { throw new Error('network unavailable'); });
    assert.equal((await handler.post(request(JSON.stringify(handler.valid)))).status, 502);
  });
}
