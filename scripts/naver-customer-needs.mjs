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

const queries = [
  "바닥왁스코팅",
  "바닥왁스코팅 비용",
  "바닥왁스코팅 가격",
  "기존 왁스 박리",
  "바닥왁스 건조시간",
  "데코타일 왁스코팅",
  "학원 바닥왁스",
  "식당 바닥왁스",
  "사무실 바닥왁스",
];

const needRules = [
  ["비용·견적", /가격|비용|견적|평당|얼마/],
  ["박리 필요 여부", /박리|기존\s*왁스|벗기|제거/],
  ["작업·건조 시간", /건조|작업\s*시간|소요\s*시간|언제|몇\s*시간/],
  ["바닥 재질", /데코타일|디럭스타일|장판|콘크리트|대리석|재질/],
  ["영업·수업과 집기", /영업|수업|출근|집기|가구|책상|의자/],
  ["유지기간·관리", /유지|내구|관리|주기|몇\s*개월|재시공/],
  ["미끄러움·안전", /미끄|안전|냄새|환기/],
  ["작업 범위·과정", /청소|세척|코팅\s*횟수|몇\s*회|작업\s*순서|범위/],
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
  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...init.headers },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 500)}`);
  }
  return JSON.parse(text);
}

async function search(source, query) {
  const params = new URLSearchParams({
    query,
    display: "30",
    start: "1",
    sort: source === "kin" ? "sim" : "date",
    format: "json",
  });
  const data = await requestJson(`${API_BASE}/search/v1/${source}?${params}`);
  return (data.items ?? []).map((item) => ({
    source,
    query,
    title: clean(item.title),
    description: clean(item.description),
    link: item.link,
    date: item.postdate || null,
  }));
}

function isoDateMonthsAgo(months) {
  const date = new Date();
  date.setUTCMonth(date.getUTCMonth() - months);
  return date.toISOString().slice(0, 10);
}

async function getTrend() {
  return requestJson(`${API_BASE}/search-trend/v1/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      startDate: isoDateMonthsAgo(12),
      endDate: new Date().toISOString().slice(0, 10),
      timeUnit: "month",
      keywordGroups: [
        { groupName: "바닥왁스코팅", keywords: ["바닥왁스코팅", "바닥 왁스 코팅", "바닥왁스"] },
        { groupName: "비용·견적", keywords: ["바닥왁스코팅 비용", "바닥왁스코팅 가격", "바닥왁스 견적"] },
        { groupName: "박리", keywords: ["왁스 박리", "기존 왁스 제거", "바닥 박리"] },
        { groupName: "재질", keywords: ["데코타일 왁스", "디럭스타일 왁스", "장판 왁스"] },
        { groupName: "장소", keywords: ["학원 바닥왁스", "식당 바닥왁스", "사무실 바닥왁스"] },
      ],
    }),
  });
}

const settled = await Promise.allSettled(
  queries.flatMap((query) => ["blog", "cafearticle", "kin"].map((source) => search(source, query))),
);

const documents = settled
  .filter((result) => result.status === "fulfilled")
  .flatMap((result) => result.value);
const failures = settled
  .filter((result) => result.status === "rejected")
  .map((result) => result.reason.message);

const deduplicated = [...new Map(documents.map((item) => [item.link || `${item.source}:${item.title}`, item])).values()];
const needs = needRules
  .map(([name, pattern]) => {
    const matches = deduplicated.filter((item) => pattern.test(`${item.title} ${item.description}`));
    return {
      name,
      mentions: matches.length,
      examples: matches.slice(0, 5).map(({ source, title, link }) => ({ source, title, link })),
    };
  })
  .sort((a, b) => b.mentions - a.mentions);

let trend = null;
try {
  trend = await getTrend();
} catch (error) {
  failures.push(`trend: ${error.message}`);
}

const report = {
  generatedAt: new Date().toISOString(),
  purpose: "바닥왁스코팅 FAQ 후보 조사",
  caution: "외부 검색 결과는 고객 질문을 찾는 참고자료입니다. FAQ 답변은 찐청소의 확인된 작업 기준으로 별도 작성해야 합니다.",
  queries,
  collected: documents.length,
  uniqueDocuments: deduplicated.length,
  needs,
  trend,
  failures,
};

function toText(data) {
  const lines = [
    "네이버 API 바닥왁스코팅 고객 니즈 조사",
    `생성 시각: ${data.generatedAt}`,
    "",
    "[주의]",
    data.caution,
    "",
    "[수집 결과]",
    `검색 결과: ${data.collected}건`,
    `중복 제거 후: ${data.uniqueDocuments}건`,
    `실패: ${data.failures.length}건`,
    "",
    "[검색에 사용한 표현]",
    ...data.queries.map((query) => `- ${query}`),
    "",
    "[고객 니즈 우선순위]",
  ];

  data.needs.forEach((need, index) => {
    lines.push("", `${index + 1}. ${need.name} — 관련 문서 ${need.mentions}건`);
    need.examples.forEach((example) => {
      lines.push(`   - [${example.source}] ${example.title}`, `     ${example.link}`);
    });
  });

  lines.push("", "[FAQ 후보]",
    "- 바닥왁스코팅 가격은 평당으로 정하나요?",
    "- 기존 왁스를 반드시 박리해야 하나요?",
    "- 데코타일이나 디럭스타일에도 코팅할 수 있나요?",
    "- 작업 후 언제부터 걸어 다닐 수 있나요?",
    "- 가구와 집기가 많은 공간도 작업할 수 있나요?",
    "- 영업이나 수업을 쉬지 않고 작업할 수 있나요?",
    "- 바닥왁스코팅은 얼마나 유지되나요?",
    "- 바닥이 미끄러워지지는 않나요?",
    "- 청소와 왁스코팅은 무엇이 다른가요?",
    "- 코팅 횟수는 어떻게 정하나요?",
    "",
    "[검색어 트렌드]",
    "수치는 조회 기간 내 최고 검색 관심도를 100으로 둔 상대값입니다.");

  for (const result of data.trend?.results ?? []) {
    const values = result.data?.map((point) => Number(point.ratio)) ?? [];
    const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
    const latest = values.at(-1) ?? 0;
    lines.push(`- ${result.title}: 최근값 ${latest.toFixed(2)}, 기간 평균 ${average.toFixed(2)}`);
  }

  if (data.failures.length) {
    lines.push("", "[호출 실패]", ...data.failures.map((failure) => `- ${failure}`));
  }

  return `${lines.join("\n")}\n`;
}

const outputArg = process.argv.find((arg) => arg.startsWith("--output="));
const textMode = process.argv.includes("--text") || Boolean(outputArg);
const rendered = textMode ? toText(report) : JSON.stringify(report, null, 2);

if (outputArg) {
  const outputPath = resolve(outputArg.slice("--output=".length));
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, rendered, "utf8");
  console.log(outputPath);
} else {
  console.log(rendered);
}
