const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const pairs = value => Array.isArray(value) && value.every(pair => Array.isArray(pair) && pair.length === 2 && pair.every(nonempty));
const imagePath = /^\/(images|videos)\/[\p{L}\p{N}_/.-]+\.(webp|jpg|jpeg|png)$/u;
const photoPath = /^\/images\/[\p{L}\p{N}_/.-]+\.(webp|jpg|jpeg|png)$/u;
const videoPath = /^\/videos\/[\p{L}\p{N}_/.-]+\.(mp4|webm)$/u;

// This validator runs before Next builds, while the source documents and public
// files are available. It is deliberately absent from the request-time bundle.
export function validateRegionalPages(pages, { services, regions, fileExists }) {
  if (!Array.isArray(pages)) throw new Error('지역 문서 목록은 배열이어야 합니다.');
  const seen = new Set();
  for (const page of pages) {
    if (!page || typeof page !== 'object') throw new Error('지역 문서 형식 확인 필요');
    const key = `${page.service}/${page.region}`;
    if (seen.has(key)) throw new Error(`중복 지역 주소: ${key}. 새 문서를 추가하지 말고 기존 문서를 갱신하세요.`);
    seen.add(key);
    if (!services.has(page.service) || !regions.has(page.region)) throw new Error(`현재 서비스·지역 범위 밖의 문서: ${key}`);
    if (typeof page.reviewed !== 'boolean') throw new Error(`검토 상태 누락: ${key}`);
    if (!page.reviewed) continue;
    if (![page.title, page.description, page.heading, page.intro].every(nonempty) || !Array.isArray(page.sections) || !page.sections.length || page.sections.some(section => !section || !nonempty(section.heading) || !nonempty(section.body))) throw new Error(`지역 문서 내용 누락: ${key}`);
    if (!Array.isArray(page.media)) throw new Error(`미디어 목록 누락: ${key}`);
    for (const media of page.media) {
      const pattern = media?.type === 'image' ? photoPath : media?.type === 'video' ? videoPath : null;
      if (!pattern?.test(media.src) || media.src.includes('..') || !nonempty(media.alt) || !nonempty(media.caption) || !fileExists(media.src) || (media.poster !== undefined && (!imagePath.test(media.poster) || media.poster.includes('..') || !fileExists(media.poster)))) throw new Error(`미디어 파일 또는 설명 확인 필요: ${key} (${media?.src ?? '경로 누락'})`);
    }
    if (page.fieldCase) {
      const c = page.fieldCase;
      const sources = new Set(page.media.map(media => media.src));
      if (![c.heading, c.lead, c.note].every(nonempty) || !pairs(c.facts) || !Array.isArray(c.steps) || !c.steps.length || c.steps.some(step => !step || !nonempty(step.heading) || !nonempty(step.body) || (step.media !== undefined && (!Array.isArray(step.media) || step.media.some(src => !sources.has(src)))))) throw new Error(`실제 사례 내용 확인 필요: ${key}`);
    }
    if (page.faq !== undefined && !pairs(page.faq)) throw new Error(`FAQ 내용 누락: ${key}`);
  }
}
