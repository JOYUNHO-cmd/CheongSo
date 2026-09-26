"use client";
import Image from "next/image";
import { useRef } from "react";
import styles from "./AnyangKitchenLanding.module.css";

export function KitchenPhoto({src,alt,caption}:{src:string;alt:string;caption:string}) {
  const dialog=useRef<HTMLDialogElement>(null);
  const filename=src.split('/').pop();
  const [width,height]=filename==='003.jpg'||filename==='008.jpg'?[4000,2252]:filename==='009-6.jpg'?[1080,1440]:[1440,1081];
  return <figure className={styles.photo}>
    <button type="button" aria-label={`${alt} — 사진 크게 보기`} onClick={()=>dialog.current?.showModal()}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 720px, 100vw" className={styles.image} />
      <span>사진 크게 보기 ↗</span>
    </button>
    <figcaption>{caption}</figcaption>
    <dialog ref={dialog} className={styles.dialog} aria-label="현장 사진 크게 보기" onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close();}}>
      <button type="button" autoFocus onClick={()=>dialog.current?.close()}>닫기 ×</button>
      <Image src={src} alt={alt} width={width} height={height} sizes="90vw" className={styles.dialogImage} />
    </dialog>
  </figure>;
}
