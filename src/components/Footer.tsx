import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const quickLinks = [
  ["홈", "/"], ["회사소개", "/about/"], ["서비스", "/services/"],
  ["찐현장사진들", "/gallery/"], ["견적문의", "/contact/"],
];
const services = [
  ["간단청소", "/services/#easy"], ["이사·입주청소", "/services/#moving"],
  ["사업자청소", "/services/#commercial"], ["위생·방역케어", "/services/#hygiene"],
  ["특수청소", "/services/#special"], ["외부·공간청소", "/services/#exterior"],
  ["바닥시공", "/services/#floor"],
];
const linkClass = "rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300";

export default function Footer() {
  return (
    <footer className="bg-[#101827] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-28 md:pt-16 md:pb-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.65fr_1.3fr_1.15fr] lg:gap-8">
          <div>
            <Link href="/" className={`${linkClass} text-3xl font-black tracking-tight text-white`}>{siteConfig.name}</Link>
            <p className="mt-6 font-semibold leading-8">청소는 찐하게, 견적은 이유 있게.</p>
            <p className="mt-4 text-sm leading-7">평수만 묻고 가격부터 정하지 않습니다.<br />현장에 필요한 작업부터 봅니다.</p>
          </div>
          <nav aria-label="하단 바로가기">
            <h2 className="text-base font-bold tracking-wide text-white">바로가기</h2>
            <ul className="mt-5 space-y-1">
              {quickLinks.map(([label, href]) => <li key={href}><Link href={href} className={`${linkClass} inline-block py-2 text-sm`}>{label}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="하단 주요 서비스">
            <h2 className="text-base font-bold tracking-wide text-white">주요 서비스</h2>
            <ul className="mt-5 grid grid-flow-col grid-rows-4 grid-cols-2 gap-x-4 gap-y-1">
              {services.map(([label, href]) => <li key={href}><Link href={href} className={`${linkClass} inline-block break-keep py-2 text-sm`}>{label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="text-base font-bold tracking-wide text-white">연락처</h2>
            <address className="mt-7 space-y-6 not-italic">
              <p className="flex items-start gap-3 text-sm leading-6"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-teal-400" /><span>{siteConfig.address}</span></p>
              <p className="flex items-center gap-3"><Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-400" /><a href={`tel:${siteConfig.phoneRaw}`} className={`${linkClass} text-lg font-bold text-white`}>{siteConfig.phone}</a></p>
              <div className="flex items-start gap-3"><Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-teal-400" /><div className="min-w-0"><p className="mb-1 text-xs font-semibold tracking-widest text-slate-400">EMAIL</p><a href={`mailto:${siteConfig.email}`} className={`${linkClass} break-all text-sm`}>{siteConfig.email}</a></div></div>
            </address>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-slate-400">
          <p className="flex flex-wrap gap-x-5"><span>대표 {siteConfig.ceo}</span><span>사업자등록번호 {siteConfig.businessNumber}</span></p>
          <p className="mt-2">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
