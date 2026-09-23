import styles from "./BackToContents.module.css";

export function BackToContents() {
  return (
    <div data-back-to-contents className="mt-6 flex justify-end">
      <a href="#service-toc" aria-label="상단 메뉴로 이동" title="상단 메뉴로 이동" className={styles.button}>
        <svg aria-hidden="true" viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6h14" />
          <g className={styles.arrow}>
            <path d="m9 18 7-7 7 7M16 12v14" />
          </g>
        </svg>
      </a>
    </div>
  );
}
