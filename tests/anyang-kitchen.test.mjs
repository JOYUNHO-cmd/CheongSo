import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
const path='/주방청소/경기도-안양시/';
const base='http://127.0.0.1:3101';
test('Anyang kitchen renders full approved content, six photos and native closed FAQ with matching schema',async()=>{
  const response=await fetch(base+encodeURI(path)); assert.equal(response.status,200);
  const doc=new JSDOM(await response.text()).window.document;
  assert.equal(doc.querySelectorAll('h1').length,1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href,'https://www.cheongso.co.kr'+encodeURI(path));
  assert.equal(doc.querySelectorAll('[data-kitchen-body] figure').length,6);
  const items=[...doc.querySelectorAll('#section-8 details')];assert.equal(items.length,6);
  assert.ok(items.every(item=>!item.hasAttribute('open')));
  const schema=[...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(el=>JSON.parse(el.textContent));
  assert.deepEqual(schema.find(s=>s['@type']==='FAQPage').mainEntity.map(q=>[q.name,q.acceptedAnswer.text]),items.map(el=>[el.querySelector('summary').textContent,el.querySelector('p').textContent]));
  assert.ok(schema.find(s=>s['@type']==='Service'));assert.ok(schema.find(s=>s['@type']==='BreadcrumbList'));
  for(const link of doc.querySelectorAll('nav[aria-label="페이지 목차"] a')){const section=doc.querySelector(link.hash);assert.ok(section);assert.ok(section.querySelector('a[href="#service-toc"]'));}
  const {markdown}=JSON.parse(readFileSync('src/lib/anyang-kitchen-article.json','utf8'));
  for(const paragraph of markdown.split(/\r?\n/).filter(line=>line && !/^(#|!|\*)/.test(line))){
    const plain=paragraph.replace(/^> /,'').replace(/^(?:- |\d+\. )/,'').replace(/\*\*/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1');
    assert.ok(doc.body.textContent.includes(plain),plain);
  }
  assert.ok(!doc.body.textContent.includes('촬영 지역은 확인되지'));
  assert.ok((await(await fetch(base+'/sitemap.xml')).text()).includes(encodeURI(path)) || (await(await fetch(base+'/sitemap.xml')).text()).includes(path));
});
