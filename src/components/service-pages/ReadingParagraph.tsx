import { Children, type ComponentPropsWithoutRef } from "react";
import styles from "./ReadingParagraph.module.css";

type Props = ComponentPropsWithoutRef<"p"> & { breakAfter?: readonly string[] };

const sentences = new Intl.Segmenter("ko", { granularity: "sentence" });

export function ReadingParagraph({ children, breakAfter = [], ...props }: Props) {
  return <p {...props}>{Children.map(children, child => {
    if (typeof child !== "string" || !child.trim()) return child;
    return Array.from(sentences.segment(child), ({ segment, index }) => {
      // Keep every character, including whitespace; only presentation changes.
      const breaths = breakAfter.reduce((parts, marker) => marker ? parts.flatMap(part => {
        const pieces = part.split(marker);
        return pieces.map((piece, i) => i < pieces.length - 1 ? piece + marker : piece);
      }) : parts, [segment]).filter(part => part !== "");
      return <span key={index} className={styles.sentence}>{breaths.length === 1 ? segment : breaths.map((breath, i) => <span key={i} className={styles.breath}>{breath}</span>)}</span>;
    });
  })}</p>;
}
