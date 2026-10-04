import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

const read = name => readFileSync(new URL('../' + name, import.meta.url), 'utf8');

function elements(name) {
  const source = read(name);
  const ast = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const nodes = [];
  function visit(node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const attrs = Object.fromEntries(node.attributes.properties.filter(ts.isJsxAttribute).map(attr => {
        const value = attr.initializer;
        return [attr.name.getText(ast), value && ts.isStringLiteral(value) ? value.text : value?.getText(ast)];
      }));
      nodes.push({ tag: node.tagName.getText(ast), attrs, text: node.parent.getText(ast) });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return nodes;
}

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map(channel => parseInt(channel, 16) / 255);
  const linear = channels.map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test('readable teal token meets normal-text contrast while the decorative brand stays unchanged', () => {
  const css = read('src/app/globals.css');
  const readable = css.match(/--brand-readable:\s*(#[0-9a-f]{6})\s*;/i)?.[1];
  assert.equal(readable, '#007582');
  assert.match(css, /--color-brand-readable:\s*var\(--brand-readable\)/);
  assert.match(css, /--brand:\s*#00adbc\s*;/i);
  for (const background of ['#ffffff', '#f9fafb', '#f0fdfa']) {
    assert.ok(contrast(readable, background) >= 4.5, `${readable} on ${background} must pass normal-text contrast`);
  }
});

test('reported navigation and contact controls use readable teal without changing their destinations', () => {
  const header = elements('src/components/Header.tsx').find(node => node.attrs.id === 'mobile-all-menu-btn');
  assert.ok(header.attrs.className.includes('bg-brand-readable'));
  assert.equal(header.attrs['aria-label'], '전체 메뉴 열기');

  const home = elements('src/app/page.tsx');
  for (const href of ['/contact', '/services']) {
    const link = home.find(node => node.tag === 'Link' && node.attrs.href === href);
    assert.ok(link.attrs.className.includes('bg-brand-readable'), href);
  }

  const quote = elements('src/components/QuoteForm.tsx');
  const telephone = quote.find(node => node.tag === 'a' && node.attrs.href.includes('siteConfig.phoneRaw'));
  const submit = quote.find(node => node.tag === 'button' && node.attrs.type === 'submit');
  assert.ok(telephone.attrs.className.includes('bg-brand-readable'));
  assert.ok(submit.attrs.className.includes('bg-brand-readable'));
  assert.ok(submit.attrs.disabled.includes('status === "sending"'));

  const dock = elements('src/components/MobileQuickContact.tsx');
  const phone = dock.find(node => node.tag === 'a' && node.attrs.href.includes('siteConfig.phoneRaw'));
  const bot = dock.find(node => node.attrs['aria-controls'] === 'jjin-consultation-dialog');
  for (const node of [phone, bot]) {
    assert.ok(node.attrs.className.includes('bg-brand-readable'));
    assert.ok(node.attrs.className.includes('min-h-11'));
    assert.ok(node.attrs.className.includes('focus-visible:outline-2'));
  }
  assert.ok(bot.attrs.onClick.includes('open-consultation-bot'));
  const kakao = dock.find(node => node.attrs.href === '{siteConfig.kakaoUrl}');
  assert.ok(kakao.attrs.className.includes('bg-[#FEE500]'));
});

test('small home labels, document actions and selected filters use readable teal', () => {
  const ceo = elements('src/components/home/CeoMessage.tsx').find(node => node.tag === 'p' && node.text.includes('CEO MESSAGE'));
  assert.ok(ceo.attrs.className.includes('text-brand-readable'));
  const document = elements('src/components/home/SafetyCertifications.tsx').find(node => node.tag === 'span' && node.text.includes('문서 크게 보기 →'));
  assert.ok(document.attrs.className.includes('text-brand-readable'));
  const pricing = elements('src/components/home/PricingTransparency.tsx').find(node => node.tag === 'Link' && node.attrs.href === '/pricing/');
  assert.ok(pricing.attrs.className.includes('text-brand-readable'));

  const portfolioFilters = elements('src/components/home/PortfolioShowcase.tsx').filter(node => node.tag === 'button' && node.attrs.onClick?.includes('selectFilter('));
  assert.equal(portfolioFilters.length, 2);
  for (const filter of portfolioFilters) {
    assert.ok(filter.attrs.className.includes('bg-brand-readable text-white'));
    assert.ok(filter.attrs.className.includes('hover:text-brand-readable'));
  }
  const faq = elements('src/components/home/FaqAccordion.tsx').find(node => node.tag === 'button' && node.attrs['aria-pressed']);
  assert.ok(faq.attrs.className.includes('bg-brand-readable text-white'));
  assert.ok(faq.attrs['aria-controls'].includes('faq-category-'));
});

test('certification images describe the document instead of exactly repeating the adjacent title', () => {
  const images = elements('src/components/home/Certifications.tsx').filter(node => node.tag === 'Image');
  assert.equal(images.length, 2);
  for (const image of images) {
    assert.ok(image.attrs.alt.includes('.title'));
    assert.ok(image.attrs.alt.includes(' 자격증 자료'));
  }
  const certificates = read('src/lib/certifications-data.ts');
  assert.equal(certificates.match(/title:/g)?.length, 7); // type field plus the existing six certificates
  assert.equal(certificates.match(/image: "\/images\/about\/cert-/g)?.length, 6);
});
