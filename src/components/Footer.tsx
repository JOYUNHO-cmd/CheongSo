import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Logo from "@/components/Logo";

const footerLinks = [
  { label: "이용약관", href: "/" },
  { label: "개인정보처리방침", href: "/" },
  { label: "회사소개", href: "/about" },
  { label: "문의하기", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-gray-500">
        <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-1 leading-relaxed">
          <div className="mb-2 flex items-center gap-2">
            <Logo className="h-6 w-6" />
            <p className="text-base font-bold">
              <span className="text-brand-dark">Cheong</span>
              <span className="text-brand">So</span>
            </p>
          </div>
          <p>
            대표 {siteConfig.ceo} · 사업자등록번호 {siteConfig.businessNumber} · {siteConfig.address}
          </p>
          <p>
            T. {siteConfig.phone} · E. {siteConfig.email}
          </p>
        </div>
        <p className="mt-6 text-xs text-gray-400">{siteConfig.copyright}</p>
      </div>
    </footer>
  );
}
