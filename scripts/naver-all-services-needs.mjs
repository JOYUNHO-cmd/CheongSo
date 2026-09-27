import process from "node:process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const API_BASE = "https://naverapihub.apigw.ntruss.com";
const clientId = process.env.NAVER_CLIENT_ID;
const clientSecret = process.env.NAVER_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET 환경변수가 필요합니다.");
  process.exit(1);
}

const headers = {
  "X-NCP-APIGW-API-KEY-ID": clientId,
  "X-NCP-APIGW-API-KEY": clientSecret,
};

const services = [
  { name: "인테리어청소", keywords: ["인테리어청소", "인테리어 청소"] },
  { name: "신축·준공청소", keywords: ["신축청소", "준공청소", "신축 준공 청소"] },
  { name: "사무실청소", keywords: ["사무실청소", "오피스 청소"] },
  { name: "관공서청소", keywords: ["관공서청소", "공공기관 청소"] },
  { name: "학교청소", keywords: ["학교청소", "교실 청소"] },
  { name: "공장청소", keywords: ["공장청소", "산업체 청소"] },
  { name: "주방청소", keywords: ["주방청소", "업소용 주방 청소"] },
  { name: "후드청소", keywords: ["후드청소", "주방 후드 청소"] },
  { name: "정기청소", keywords: ["정기청소", "정기 관리 청소"] },
  { name: "냄새·악취제거", keywords: ["냄새 제거", "악취 제거", "냄새악취제거"] },
  { name: "곰팡이제거", keywords: ["곰팡이제거", "곰팡이 청소"] },
  { name: "화재청소", keywords: ["화재청소", "화재 복구 청소"] },
  { name: "침수청소", keywords: ["침수청소", "침수 복구 청소"] },
  { name: "쓰레기집청소", keywords: ["쓰레기집청소", "쓰레기집 정리"] },
  { name: "유품정리", keywords: ["유품정리", "유품 정리 업체"] },
  { name: "고독사청소", keywords: ["고독사청소", "고독사 특수청소"] },
  { name: "폐기물처리", keywords: ["폐기물처리", "생활폐기물 처리"] },
  { name: "외벽청소", keywords: ["외벽청소", "건물 외벽 청소"] },
  { name: "행사장청소", keywords: ["행사장청소", "행사 청소"] },
  { name: "석재청소", keywords: ["석재청소", "대리석 청소"] },
  { name: "바닥본드제거", keywords: ["바닥본드제거", "바닥 본드 제거"] },
  { name: "마루코팅", keywords: ["마루코팅", "마루 바닥 코팅"] },
  { name: "나노코팅", keywords: ["나노코팅", "욕실 나노코팅"] },
  { name: "콩자갈청소", keywords: ["콩자갈청소", "콩자갈 바닥 청소"] },
  { name: "바닥청소", keywords: ["바닥청소", "바닥 세척"] },
];

const needRules = [
  { name: "비용·견적", pattern: /가격|비용|견적|평당|얼마|금액/, question: (s) => `${s} 비용은 어떤 조건으로 정하나요?`, answer: "면적만으로 단정하지 않고 오염 상태, 실제 작업 범위, 필요한 인원·장비, 출입과 반출 조건을 확인해 안내하는 항목입니다." },
  { name: "작업 범위·포함 항목", pattern: /범위|포함|어디까지|전체|부분|구역/, question: (s) => `${s} 기본 작업 범위에는 무엇이 포함되나요?`, answer: "기본 범위와 별도 요청 항목을 구분해 견적서에서 확인하도록 안내하는 항목입니다. 서비스별 포함 범위는 실제 운영 기준을 추가 확인해야 합니다." },
  { name: "작업 시간·일정", pattern: /시간|기간|일정|당일|며칠|예약|영업|수업|출근/, question: (s) => `${s} 작업 시간과 이용 재개 시점은 어떻게 정하나요?`, answer: "현장 규모와 오염, 작업 방법, 건조·환기 필요 여부, 영업·수업·출근 시간을 함께 확인해야 합니다. 확인 전에는 특정 시간을 보장하지 않습니다." },
  { name: "작업 방법·장비", pattern: /방법|과정|순서|장비|기계|약품|세척|고압|연마|코팅/, question: (s) => `${s} 작업 방법과 장비는 어떻게 선택하나요?`, answer: "재질과 오염 상태, 주변 시설, 작업 목적을 먼저 확인한 뒤 적합한 방법과 장비를 정하는 항목입니다." },
  { name: "별도 작업·제외 항목", pattern: /추가|별도|제외|철거|교체|수리|폐기|반출/, question: (s) => `${s}에서 별도 확인하거나 추가되는 작업은 무엇인가요?`, answer: "기본 청소 외 철거·교체·수리·특수 장비·추가 반출 등은 현장에 따라 별도 확인이 필요합니다. 실제 항목은 견적 전에 구분해야 합니다." },
  { name: "효과·결과의 한계", pattern: /효과|제거|복구|흔적|얼룩|변색|손상|완벽|재발/, question: (s) => `${s}로 해결되는 부분과 남을 수 있는 한계는 무엇인가요?`, answer: "표면 오염과 재질 손상은 구분해야 합니다. 청소로 해결되지 않는 변색·부식·파손·흡착 오염은 교체나 보수가 필요할 수 있습니다." },
  { name: "안전·약품·냄새", pattern: /안전|약품|냄새|유해|소독|방역|환기|보호|마스크/, question: (s) => `${s} 작업 중 안전과 약품 사용은 어떻게 확인하나요?`, answer: "공간 이용자, 재질, 오염 종류와 환기 조건을 확인하고 약품·장비 사용 및 작업 후 이용 조건을 상담하는 항목입니다." },
  { name: "유지관리·재작업", pattern: /관리|유지|주기|재작업|재시공|예방|보관/, question: (s) => `${s} 후에는 어떻게 관리해야 하나요?`, answer: "작업 결과와 재질, 공간 사용 빈도에 따라 관리 방법과 주기가 달라집니다. 현장 결과를 확인한 뒤 안내해야 합니다." },
  { name: "상담 준비·현장 조건", pattern: /사진|상담|준비|주차|엘리베이터|승강기|계단|출입|가구|집기/, question: (s) => `${s} 상담 전에 어떤 사진과 정보를 준비하면 좋나요?`, answer: "전체 공간, 집중 오염, 재질과 모서리 사진을 준비하고 주소, 면적, 층수, 주차·승강기, 집기 이동, 희망 일정을 함께 알려주면 범위를 확인하기 좋습니다." },
];

function clean(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

async function requestJson(url, init = {}) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const response = await fetch(url, { ...init, headers: { ...headers, ...init.headers } });
    const text = await response.text();
    if (response.ok) return JSON.parse(text);
    if (response.status !== 429 || attempt === 5) throw new Error(`${response.status}: ${text.slice(0, 300)}`);
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 600 * (attempt + 1)));
  }
}

async function search(source, query) {
  const params = new URLSearchParams({ query, display: "20", start: "1", sort: "sim", format: "json" });
  const data = await requestJson(`${API_BASE}/search/v1/${source}?${params}`);
  return (data.items ?? []).map((item) => ({
    source,
    query,
    title: clean(item.title),
    description: clean(item.description),
    link: item.link,
  }));
}

function trendPeriod() {
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 0));
  const start = new Date(end);
  start.setUTCMonth(start.getUTCMonth() - 11, 1);
  return { startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10) };
}

async function trendBatch(batch) {
  const anchor = { name: "공통 기준", keywords: ["청소업체", "청소 업체"] };
  const groups = [anchor, ...batch];
  const period = trendPeriod();
  const data = await requestJson(`${API_BASE}/search-trend/v1/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: period.startDate,
      endDate: period.endDate,
      timeUnit: "month",
      keywordGroups: groups.map((service) => ({ groupName: service.name, keywords: service.keywords })),
    }),
  });
  const anchorResult = data.results.find((result) => result.title === anchor.name);
  const anchorValues = anchorResult?.data?.map((point) => Number(point.ratio)) ?? [];
  const anchorAverage = anchorValues.length ? anchorValues.reduce((sum, value) => sum + value, 0) / anchorValues.length : 0;
  return data.results
    .filter((result) => result.title !== anchor.name)
    .map((result) => {
      const values = result.data?.map((point) => Number(point.ratio)) ?? [];
      const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
      const latest = values.at(-1) ?? 0;
      const recent = values.slice(-3);
      const previous = values.slice(-6, -3);
      const recentAverage = recent.length ? recent.reduce((sum, value) => sum + value, 0) / recent.length : 0;
      const previousAverage = previous.length ? previous.reduce((sum, value) => sum + value, 0) / previous.length : 0;
      const direction = recentAverage > previousAverage * 1.1 ? "상승" : recentAverage < previousAverage * 0.9 ? "하락" : "비슷";
      return {
        name: result.title,
        relativeToAnchor: anchorAverage ? (average / anchorAverage) * 100 : null,
        latest,
        average,
        direction,
      };
    });
}

const serviceResults = [];
const failures = [];

for (const service of services) {
  const queries = [...new Set([
    service.keywords[0],
    `${service.keywords[0]} 비용`,
    `${service.keywords[0]} 업체`,
  ])];
  const settled = await Promise.allSettled(
    queries.flatMap((query) => ["blog", "cafearticle", "kin"].map((source) => search(source, query))),
  );
  const documents = settled.filter((result) => result.status === "fulfilled").flatMap((result) => result.value);
  settled.filter((result) => result.status === "rejected").forEach((result) => failures.push(`${service.name}: ${result.reason.message}`));
  const unique = [...new Map(documents.map((item) => [item.link || `${item.source}:${item.title}`, item])).values()];
  const normalizedKeywords = service.keywords.map((keyword) => keyword.replace(/\s+/g, "").toLowerCase());
  const relevant = unique.filter((item) => {
    const text = `${item.title} ${item.description}`.replace(/\s+/g, "").toLowerCase();
    return normalizedKeywords.some((keyword) => text.includes(keyword));
  });
  const evidence = relevant.length >= 5 ? relevant : unique;
  const needs = needRules
    .map((rule) => ({
      ...rule,
      mentions: evidence.filter((item) => rule.pattern.test(`${item.title} ${item.description}`)).length,
    }))
    .sort((a, b) => b.mentions - a.mentions);
  const selectedNames = [...new Set([
    needRules[0].name,
    needRules[1].name,
    ...needs.slice(0, 4).map((rule) => rule.name),
    needRules[8].name,
  ])].slice(0, 7);
  const selectedRules = selectedNames.map((name) => needRules.find((rule) => rule.name === name));
  serviceResults.push({
    name: service.name,
    collected: documents.length,
    unique: evidence.length,
    needs: needs.map(({ name, mentions }) => ({ name, mentions })),
    faq: selectedRules.map((rule) => ({ question: rule.question(service.name), answer: rule.answer })),
    examples: evidence.slice(0, 4).map(({ source, title, link }) => ({ source, title, link })),
  });
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
}

const trends = [];
for (let index = 0; index < services.length; index += 4) {
  try {
    trends.push(...await trendBatch(services.slice(index, index + 4)));
  } catch (error) {
    failures.push(`검색어 트렌드 ${index / 4 + 1}차: ${error.message}`);
  }
}

const trendMap = new Map(trends.map((trend) => [trend.name, trend]));
const lines = [
  "찐청소 25개 업종 네이버 고객 니즈·FAQ·검색어 트렌드 조사",
  `생성 시각: ${new Date().toISOString()}`,
  "조사 출처: 네이버 블로그·카페·지식iN 검색 API, 네이버 검색어 트렌드 API",
  "",
  "[읽기 전에]",
  "- 외부 검색 결과는 고객이 무엇을 궁금해하는지 찾기 위한 자료입니다.",
  "- 아래 FAQ 답변은 게시 전 찐청소의 실제 작업 기준과 대표님의 확인이 필요합니다.",
  "- 검색어 트렌드는 절대 검색량이 아니라 상대적인 관심도입니다.",
  "- 업종 간 비교값은 각 묶음에 공통 검색어를 넣어 환산한 참고 지수이며 정확한 검색 횟수가 아닙니다.",
  "- 요청하신 ‘의벽청소’는 찐청소의 업종명인 ‘외벽청소’로 분석했습니다.",
  "- ‘신축준공청소’는 신축청소와 준공청소를 묶어 분석했습니다.",
];

for (const [index, service] of serviceResults.entries()) {
  const trend = trendMap.get(service.name);
  lines.push(
    "",
    "=".repeat(72),
    `${index + 1}. ${service.name}`,
    "=".repeat(72),
    `수집: ${service.collected}건 / 중복 제거 후 ${service.unique}건`,
    "",
    "[반복 확인된 고객 니즈]",
    ...service.needs.slice(0, 6).map((need, needIndex) => `${needIndex + 1}) ${need.name}: 관련 문서 ${need.mentions}건`),
    "",
    "[FAQ 초안]",
  );
  service.faq.forEach((faq, faqIndex) => {
    lines.push(`Q${faqIndex + 1}. ${faq.question}`, `A. ${faq.answer}`, "");
  });
  lines.push("[최근 12개월 검색어 트렌드]");
  if (trend) {
    lines.push(
      `- 공통 기준 대비 관심도 지수: ${trend.relativeToAnchor?.toFixed(1) ?? "계산 불가"}`,
      `- 최근 3개월 흐름: ${trend.direction}`,
      `- 해당 묶음 내 최근 상대값: ${trend.latest.toFixed(2)}`,
    );
  } else {
    lines.push("- 트렌드 데이터를 불러오지 못했습니다.");
  }
  lines.push("", "[대표 검색 결과]", ...service.examples.flatMap((example) => [`- [${example.source}] ${example.title}`, `  ${example.link}`]));
}

lines.push("", "=".repeat(72), "전체 참고 순위 — 공통 기준 대비 검색 관심도", "=".repeat(72));
for (const [index, trend] of [...trends].sort((a, b) => (b.relativeToAnchor ?? 0) - (a.relativeToAnchor ?? 0)).entries()) {
  lines.push(`${index + 1}. ${trend.name}: ${trend.relativeToAnchor?.toFixed(1) ?? "계산 불가"} / 최근 흐름 ${trend.direction}`);
}

lines.push("", `[API 호출 실패: ${failures.length}건]`, ...(failures.length ? failures.map((failure) => `- ${failure}`) : ["- 없음"]));

const outputArg = process.argv.find((arg) => arg.startsWith("--output="));
const outputPath = resolve(outputArg?.slice("--output=".length) || "outputs/naver-all-services-customer-needs.txt");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${lines.join("\n")}\n`, "utf8");
console.log(outputPath);
