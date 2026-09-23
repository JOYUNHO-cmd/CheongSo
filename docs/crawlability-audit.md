# 검색·AI 수집성 점검 — 2026-09-23

## 범위와 상태

- 운영 사이트: https://www.cheongso.co.kr/
- 기준 배포: `f1b25af` (네이버 소유 확인 메타 태그).
- 로컬 검증 후 2026-09-23 사용자 배포 승인을 받았다. 아래 결과는 배포 전 점검 기록이며 운영 반영 여부는 배포 결과로 별도 확인한다.
- 사이트맵에 등록된 43개 URL 전체의 HTTP 응답, HTML 본문, 제목·설명·canonical, H1, JSON-LD, FAQ 일치 여부, 이미지 alt 속성과 내부 연결을 검사했다.
- 이는 기술적 수집성 검사다. 실제 색인·검색 순위·AI 인용·추천, 모든 콘텐츠의 사실성, 실제 사용자 성능 지표를 인증하는 검사는 아니다.

## 결과

| 항목 | 결과 |
| --- | --- |
| 운영 43개 URL | 모두 HTTP 200, 검사 대상 메타·JSON-LD 오류 없음 |
| 본문·FAQ | JavaScript 실행 전 HTML에 포함. FAQ 450개 질문·답변이 본문과 일치 |
| 검색 차단 | 검사한 페이지에 noindex/nosnippet 없음. robots.txt는 검색·AI 봇 허용 |
| 대표 주소 | apex→www, 슬래시 없는 주소→슬래시 주소의 308 리디렉션 확인 |
| 없는 페이지 | 임의의 존재하지 않는 주소에서 404 확인 |
| 내부 연결 | 수정본의 등록 페이지 간 링크·앵커 오류 없음. 후기 페이지 고립 해소 |
| 이미지 | 갤러리를 포함한 고유 이미지 경로 1,527개의 로컬 공개 파일 존재 확인. 원격 이미지 전체의 다운로드 검사는 아님 |
| 기존 서비스 보존 | 서비스 34개+지역 1개의 제목·설명·사진 목록·본문 분량 변화 없음. 소스 변경은 provider 식별자 추가뿐 |
| 회귀 검증 | 프로덕션 빌드 성공, 자동 테스트 42개 통과, 변경 파일 ESLint 통과 |

## 이번 개선

1. 갤러리의 분야 선택을 실제 `href` 링크로 변경했다.
2. 24쌍 단위의 서버 렌더링 페이지와 이전·다음 링크를 추가했다. 전체 441쌍이 19개 페이지에 빠짐없이 표시되는지 검사했다. 기존 더보기·확대 기능은 유지한다.
3. 페이지 간 누락·중복을 막기 위해 사진 순서를 고정했다. 사진 파일이나 제목은 변경하지 않았다.
4. 갤러리 분야·페이지에 맞는 제목·설명·self-canonical을 제공한다. 잘못된 페이지 번호는 not-found 처리한다. 확대창의 item 파라미터는 별도 대표 페이지로 만들지 않는다.
5. 공개된 주소·이메일·사업자등록번호를 업체 구조화 데이터에 연결했다. 모든 서비스의 provider가 동일한 업체 `@id`를 참조한다. 미확인 좌표·영업시간·평점은 추가하지 않았다.
6. 메인 후기 영역에서 기존 `/reviews/` 페이지로 이동하는 링크를 추가했다.

## 봇 접근에 대한 한계

Googlebot, Yeti, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot 이름을 넣은 홈페이지 요청은 모두 200과 동일한 본문을 반환했다. 그러나 이는 동일한 점검 환경에서 User-Agent 헤더를 바꾼 결과이지, 해당 회사의 실제 봇 IP 접근을 검증한 것은 아니다.

실제 방문·색인은 Search Console, 네이버 서치어드바이저와 호스팅 접근/방화벽 기록으로 확인해야 한다. 학습용 봇 허용은 검색·추천을 보장하지 않는다. 기존 학습 허용 정책은 변경하지 않았다.

## 이후 유지 기준

- 새로운 페이지도 본문·비용 조건·FAQ를 서버 HTML에 제공한다. 모바일에만 축약본을 제공하지 않는다.
- 새 사진은 갤러리 데이터에 추가하면 같은 페이지 나누기·링크 구조가 적용된다. 페이지 수와 전후 사진 누락 검사는 `tests/crawlability.test.mjs`로 실행한다.
- 실제 확인된 사례·업체 정보만 사용한다. 자동 생성한 지역별 복제 페이지, 가짜 후기·평점, 과장된 안전·효능 주장은 넣지 않는다.
- `llms.txt`를 필수로 간주하지 않는다. Google은 별도 AI 파일을 검색 노출 요건으로 사용하지 않는다고 안내한다.
- 배포 후 실제 주소의 페이지·canonical·robots·사이트맵을 재검증하고, Search Console/서치어드바이저에서 수집 및 색인 상태를 확인한다.

## 공식 참고 자료

- Google AI 검색 안내: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google 페이지 나누기: https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading
- OpenAI 크롤러: https://developers.openai.com/api/docs/bots
- Anthropic 크롤러: https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Google 크롤러·Google-Extended: https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers
- 네이버 검색로봇 확인: https://searchadvisor.naver.com/guide/seo-basic-firewall
