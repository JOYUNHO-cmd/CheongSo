// 모바일 메뉴 드로어와 상담봇 다이얼로그처럼 서로 독립된 오버레이 여러 개가
// 동시에 body 스크롤을 잠글 수 있어, 참조 카운트로 관리해 먼저 닫힌 쪽이
// 아직 열려 있는 다른 오버레이의 잠금을 풀어버리지 않도록 합니다.
let lockCount = 0;

export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
