# 찐청소 선택형 자동상담

홈페이지 전체 디자인은 유지하고 공통 레이아웃에 상담 버튼만 추가했습니다.

- PC: 오른쪽 아래 버튼 → 작은 상담창
- 모바일(767px 이하): 버튼 → 전체 높이 상담창, 안전 영역 여백 적용
- 상황 10가지 → 서비스 → 지역 → 면적 → 희망 시기 → 내용 정리
- 이전 단계·다시 시작·자주 묻는 질문·내용 복사·전화 연결
- 로고는 기존 `/logo.png`, 전화번호는 `src/lib/site-config.ts` 사용
- 네이티브 dialog로 키보드 초점 제한, Escape 닫기와 버튼으로 초점 복귀 제공

수정 파일:

- `src/components/consultation/chat-flow.ts`: 질문·답변·선택지
- `src/components/consultation/ConsultationBot.tsx`: 대화와 버튼 동작
- `src/components/consultation/chatbot.css`: 상담봇 전용 접두사로 분리한 스타일
- `src/app/layout.tsx`: 상담봇을 공통으로 표시하는 연결 두 줄

AI·채널톡·외부 스크립트·서버 접수 기능을 사용하지 않습니다. 선택 내역은 현재 열린 화면에서만 유지되고 전송하거나 저장하지 않습니다. 전화 앱에 자동 전달되지 않습니다. 창을 닫으면 초기화됩니다. 상담창에서 가격·예약 확정을 하지 않으며 최종 상담은 전화로 진행합니다. 서비스 분류는 상담 주제이므로 실제 제공 범위에 맞게 검토해 주세요.

검사: `node --experimental-strip-types --test tests/chat-flow.test.mjs`, `npx eslint src/components/consultation`, `npm run build`.

이 변경만으로 운영 사이트 배포 방식은 바뀌지 않습니다. PR 병합 후 기존 Vercel 등 저장소 연동 배포 절차를 이용하세요.
