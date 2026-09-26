import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ReadingParagraph } from "@/components/service-pages/ReadingParagraph";
import AreaFinder from "@/components/areas/AreaFinder";

export const metadata = buildMetadata({
  title: "지역별 청소·시공 안내",
  description: "찐청소의 지역별 실제 작업 사진과 견적 기준을 확인하세요. 안양 바닥왁스코팅 사례부터 안내하며, 다른 지역은 상담으로 방문 가능 여부를 확인합니다.",
  path: "/areas/",
});

export default function AreasPage() {
  return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 break-keep">
    <nav aria-label="현재 위치" className="mb-8 text-sm text-gray-500"><Link href="/" className="underline underline-offset-4">홈</Link><span aria-hidden="true"> / </span><span aria-current="page">지역별 안내</span></nav>
    <p className="font-bold text-brand">우리 동네 작업, 사진과 기준으로 확인하세요</p>
    <h1 className="mt-3 text-3xl font-black leading-tight text-brand-dark sm:text-4xl">지역별 청소·시공 안내</h1>
    <ReadingParagraph className="mt-5 max-w-2xl text-base leading-8 text-gray-700">실제 작업 사진이 있는 지역부터 안내합니다. 내 공간과 비슷한 사례를 살펴보고, 작업 범위와 견적에 영향을 주는 조건을 확인해 보세요.</ReadingParagraph>
    <AreaFinder />
    <aside className="mt-8 rounded-2xl bg-teal-50 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-brand-dark">찾으시는 지역이 아직 없나요?</h2>
      <ReadingParagraph className="mt-3 text-base leading-8 text-gray-700">현재 등록된 지역별 상세 안내입니다. 목록에 없는 지역이 서비스 불가 지역이라는 뜻은 아닙니다. 주소와 필요한 작업을 알려주시면 방문 가능 여부와 일정을 확인해 드립니다.</ReadingParagraph>
      <Link href="/contact/" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">다른 지역 상담하기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
    </aside>
  </div>;
}
