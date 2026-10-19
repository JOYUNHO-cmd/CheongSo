import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {JSDOM} from 'jsdom';
const cases=JSON.parse(readFileSync('src/lib/trash-batch-02-published.json','utf8'));
const regions=Object.fromEntries(cases.map(c=>[c.slug,c.region]));
const photos=JSON.parse(readFileSync('src/lib/trash-batch-02-published-photos.json','utf8'));
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3104';
for(const [slug,region] of Object.entries(regions))test(`published ${slug}: canonical, photos, FAQ and indexing`,async()=>{
 const path=`/쓰레기집청소/${region}/`;
 const response=await fetch(base+encodeURI(path));assert.equal(response.status,200);
 const doc=new JSDOM(await response.text()).window.document;
 assert.equal(doc.querySelectorAll('h1').length,1);
 assert.equal(doc.querySelectorAll('#case img').length,photos[slug].length);
 assert.ok(!doc.querySelector('meta[name="robots"]')?.content.includes('noindex'));
 assert.equal(decodeURI(doc.querySelector('link[rel="canonical"]').href),'https://www.cheongso.co.kr'+path);
 assert.ok(!doc.body.textContent.includes('검토용 미리보기'));
 const schema=[...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n=>JSON.parse(n.textContent));
 for(const type of ['Service','BreadcrumbList','FAQPage'])assert.ok(schema.some(x=>x['@type']===type));
 const faq=schema.find(x=>x['@type']==='FAQPage');
 const answers=[...doc.querySelectorAll('#faq details')];assert.equal(answers.length,faq.mainEntity.length);
 faq.mainEntity.forEach((q,i)=>assert.ok(answers[i].textContent.includes(q.acceptedAnswer.text)));
});
test('all approved routes are in sitemap; previews excluded',async()=>{
 const xml=await (await fetch(base+'/sitemap.xml')).text();
 for(const region of Object.values(regions))assert.ok(decodeURI(xml).includes(`/쓰레기집청소/${region}/`));
 assert.ok(!xml.includes('/preview/'));
});


