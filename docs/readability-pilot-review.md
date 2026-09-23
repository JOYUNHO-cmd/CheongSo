# 가독성 시범 적용 검증 — 2026-09-23

적용: `/services/`, `/사무실청소/`. 다른 페이지는 미적용, 배포/커밋 없음.

- 변경 전 모바일 서비스 소개/카드 제목 14px로 기준 미달을 재현했다.
- 변경 후 각각 16px/18px로 동일 브라우저 검사 통과.
- 서비스 목록 320/390/768/1280px 및 사무실 320/390/768/1280px에서 문서 가로 넘침 없음.
- 서비스 목록 모바일 #moving: 헤더 하단 61px, 대상 상단 96px.
- 서비스 목록 태블릿 #moving: 헤더 하단 125px, 대상 상단 192px.
- 사무실 PC #estimate: 헤더 하단 172.5px, 대상 상단 192.5px.
- 사무실 모바일 #scope: 헤더 하단 61px, 대상 상단 96.5px.
- 사무실 FAQ 첫 질문 클릭 후 열린 상태와 기존 답변 확인.
- PC 목록/본문, 모바일 목록/본문 스크린샷 시각 점검.
- `node work/readability-check.cjs`: 변경 전 저장한 본문(FAQ 포함), 링크, 사진/alt, 제목 계층, 메타, canonical, JSON-LD와 완전 일치.
- `node --test tests/*.test.mjs`: 24개 통과. 기존 MODULE_TYPELESS_PACKAGE_JSON 경고 남아 있음.
- `npm run build`: 50개 페이지 생성 성공.

공통 CSS는 opt-in으로 만들었다. 새 랜딩페이지는 `docs/readability-guidelines.md`를 따르고 화면별 확인 후 적용한다.
메인/다른 서비스/지역 페이지 확장은 시범안 확인 후 다음 작업으로 진행한다.
