import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import gallery from "@/lib/gallery-data.json";
import { ReadingParagraph } from "@/components/service-pages/ReadingParagraph";

export const metadata = buildMetadata({
  title: "지역별 청소·시공 안내",
  description: "찐청소의 지역별 실제 작업 사진과 견적 기준을 확인하세요. 안양 바닥왁스코팅 사례부터 안내하며, 다른 지역은 상담으로 방문 가능 여부를 확인합니다.",
  path: "/areas/",
});

export default function AreasPage() {
  const photo = gallery.find(category => category.slug === "floor-wax")!.items.find(item => item.id === "floor-wax-g28")!;
  return <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 break-keep">
    <nav aria-label="현재 위치" className="mb-8 text-sm text-gray-500"><Link href="/" className="underline underline-offset-4">홈</Link><span aria-hidden="true"> / </span><span aria-current="page">지역별 안내</span></nav>
    <p className="font-bold text-brand">우리 동네 작업, 사진과 기준으로 확인하세요</p>
    <h1 className="mt-3 text-3xl font-black leading-tight text-brand-dark sm:text-4xl">지역별 청소·시공 안내</h1>
    <ReadingParagraph className="mt-5 max-w-2xl text-base leading-8 text-gray-700">실제 작업 사진이 있는 지역부터 안내합니다. 내 공간과 비슷한 사례를 살펴보고, 작업 범위와 견적에 영향을 주는 조건을 확인해 보세요.</ReadingParagraph>
    <section aria-labelledby="gyeonggi-title" className="mt-10 sm:mt-14">
      <h2 id="gyeonggi-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 안양시</h2>
      <Link data-region-card href="/바닥-왁스-코팅/경기도-안양시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', photo.before, photo.beforeWidth, photo.beforeHeight], ['작업 후', photo.after, photo.afterWidth, photo.afterHeight]] as const).map(([label, file, width, height]) => <figure key={file}>
            <Image src={`/images/gallery-v2/${file}`} alt={`${photo.title} · ${label}`} width={width} height={height} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사진 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">안양 바닥왁스코팅</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">학원·음식점·업무시설·사무실의 작업 전후 사진을 확인하세요. 한식뷔페 현장에서 두꺼운 왁스를 박리하고 집기를 나눠 옮기며 작업한 과정도 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">안양 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
      <Link data-region-card href="/주방청소/경기도-안양시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="bg-gray-50 p-4 sm:p-5"><Image src="/images/anyang-kitchen/009-6.jpg" alt="안양 배달 돈까스 주방의 조리기기와 통로" width={1200} height={1600} sizes="(min-width: 640px) 440px, 100vw" className="h-auto w-full rounded-lg" /></div>
        <div className="flex flex-col justify-center p-5 sm:p-8"><p className="text-sm font-semibold text-brand">실제 작업 사진 · 작업 범위와 견적 기준</p><h3 className="mt-3 text-2xl font-bold text-brand-dark">안양 주방청소</h3><ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">배달 돈까스 주방의 튀김기·후드·기기 아래 사진을 살펴보세요. 내부 세척과 기기 이동 등 별도 확인 항목, 견적 조건과 상담 준비사항을 안내합니다.</ReadingParagraph><span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">안양 주방 사진과 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span></div>
      </Link>
      <Link data-region-card href="/쓰레기집청소/경기도-안양시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/anyang-trash-house-01.webp'], ['작업 후', '/images/regional/anyang-trash-house-06.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`안양 만안구 다세대주택 쓰레기집청소 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">안양 쓰레기집청소</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">장기간 방치된 만안구 다세대주택에서 4명이 8시간 동안 폐기물 반출부터 청소·냄새 제거·소독까지 진행한 기록입니다. 청소로 해결되지 않은 벽지 얼룩까지 그대로 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">안양 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <section aria-labelledby="gunpo-title" className="mt-10 sm:mt-14">
      <h2 id="gunpo-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 군포시</h2>
      <Link data-region-card href="/쓰레기집청소/경기도-군포시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/gunpo-trash-house-01.webp'], ['작업 후', '/images/regional/gunpo-trash-house-07.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`군포 산본 아파트 쓰레기집청소 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">군포 쓰레기집청소</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">기숙사로 쓰던 산본 아파트의 방 한 칸에서 3명이 8시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다. 교체가 필요했던 합지 벽지까지 그대로 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">군포 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <section aria-labelledby="ansan-title" className="mt-10 sm:mt-14">
      <h2 id="ansan-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 안산시</h2>
      <Link data-region-card href="/쓰레기집청소/경기도-안산시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/ansan-trash-house-04.webp'], ['작업 후', '/images/regional/ansan-trash-house-13.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`안산 상록구 원룸 쓰레기집청소 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">안산 쓰레기집청소</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">날파리가 생긴 상록구 원룸을 가족 방문 전에 4명이 3시간 동안 폐기물 처리부터 오염 제거·냄새 제거·소독까지 진행한 기록입니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">안산 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <section aria-labelledby="suwon-title" className="mt-10 sm:mt-14">
      <h2 id="suwon-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 수원시</h2>
      <Link data-region-card href="/바닥-왁스-코팅/경기도-수원시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['세척 중', '/images/regional/suwon-floor-wax-01.webp'], ['코팅 후', '/images/regional/suwon-floor-wax-04.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`수원 영통 사무실 바닥왁스코팅 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">수원 바닥왁스코팅</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">오랫동안 청소하지 않아 오염과 테이프 자국이 많던 영통 사무실 입구와 회의실을 2명이 6시간 동안 세척하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">수원 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
      <Link data-region-card href="/사무실청소/경기도-수원시-영통구/" className="group mt-6 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/suwon-office-01.webp'], ['작업 후', '/images/regional/suwon-office-10.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`수원 영통구 사무실청소 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">수원 영통구 사무실청소</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">인테리어 공사를 마친 50평 신축 사무실을 3명이 8시간 동안 천장부터 유리·창틀, 탕비실·수납장, 바닥 코팅까지 청소한 입주 전 기록입니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">영통구 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <section aria-labelledby="yongin-title" className="mt-10 sm:mt-14">
      <h2 id="yongin-title" className="flex items-center gap-2 text-xl font-bold text-brand-dark"><MapPin aria-hidden="true" className="h-5 w-5 text-brand" />경기도 · 용인시</h2>
      <Link data-region-card href="/바닥-왁스-코팅/경기도-용인시/" className="group mt-5 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/yongin-floor-wax-03.webp'], ['작업 후', '/images/regional/yongin-floor-wax-10.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`용인 수지구 교회 바닥왁스코팅 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">용인 바닥왁스코팅</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">5년 만에 관리한 수지구 교회 예배당 200평 데코타일 바닥을 6명이 장의자를 옮기며 박리하고 2회 코팅한 기록입니다. 작업 영상도 함께 담았습니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">용인 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
      <Link data-region-card href="/인테리어청소/경기도-용인시/" className="group mt-6 grid overflow-hidden rounded-2xl border border-gray-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-4 sm:p-5">
          {([['작업 전', '/images/regional/yongin-interior-02.webp'], ['작업 후', '/images/regional/yongin-interior-12.webp']] as const).map(([label, src]) => <figure key={src}>
            <Image src={src} alt={`용인 수지구 타운하우스 인테리어청소 · ${label}`} width={900} height={1200} sizes="(min-width: 640px) 240px, 45vw" className="h-auto w-full rounded-lg" />
            <figcaption className="mt-2 text-center text-sm font-bold text-gray-700">{label}</figcaption>
          </figure>)}
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-8">
          <p className="text-sm font-semibold text-brand">실제 작업 사례 · 비용과 견적 기준</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-dark">용인 인테리어청소</h3>
          <ReadingParagraph className="mt-4 text-base leading-8 text-gray-700">인테리어 공사를 마친 수지구 62평 타운하우스를 7명이 8시간 동안 보양지 제거부터 천장 도배풀, 벽지·집기·바닥까지 청소한 입주 전 기록입니다.</ReadingParagraph>
          <span className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">용인 사례와 견적 기준 보기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></span>
        </div>
      </Link>
    </section>
    <aside className="mt-8 rounded-2xl bg-teal-50 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-brand-dark">찾으시는 지역이 아직 없나요?</h2>
      <ReadingParagraph className="mt-3 text-base leading-8 text-gray-700">현재 등록된 지역별 상세 안내입니다. 목록에 없는 지역이 서비스 불가 지역이라는 뜻은 아닙니다. 주소와 필요한 작업을 알려주시면 방문 가능 여부와 일정을 확인해 드립니다.</ReadingParagraph>
      <Link href="/contact/" className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-brand-dark underline underline-offset-4">다른 지역 상담하기<ArrowUpRight aria-hidden="true" className="h-5 w-5" /></Link>
    </aside>
  </div>;
}
