import Image from "next/image";
import Link from "next/link";
import gallery from "@/lib/gallery-data.json";
import { galleryHref } from "@/lib/gallery-navigation";
import { ReadingParagraph } from "./ReadingParagraph";
import { BackToContents } from "./BackToContents";

// 지역·작업명은 등록 자료를 따릅니다. 상담 질문은 해당 현장의 시공 기록과 구분합니다.
const caseQuestions = [
  ["floor-wax-g27", "학원 바닥을 상담하실 때", "수업 종료 시간과 다음 수업 시작 시간, 책상·의자를 옮길 수 있는 위치를 알려주세요. 도포뿐 아니라 건조와 집기 재배치에 필요한 시간도 함께 확인합니다."],
  ["floor-wax-g28", "음식점의 박리·코팅을 상담하실 때", "이 자료는 ‘박리후 코팅’으로 등록된 사례입니다. 다른 식당에도 박리가 필요한지는 기존 왁스 상태를 살펴 판단합니다. 영업 재개 시간과 식탁·배식대 주변 작업 범위를 함께 알려주세요."],
  ["floor-wax-g29", "식당 바닥 코팅을 상담하실 때", "홀 바닥과 주방 바닥은 재질과 오염이 다를 수 있습니다. 코팅을 원하는 구역을 구분해 주시면 세척 범위와 코팅 가능 여부를 확인하기 좋습니다."],
  ["floor-wax-g30", "업무시설 바닥을 상담하실 때", "건물 관리 주체가 정한 작업 시간, 장비 반입과 승강기 사용 조건을 확인해 주세요. 특정 건물의 규정을 일괄 적용하지 않고 실제 현장의 안내를 기준으로 조율합니다."],
  ["floor-wax-g31", "사무실 바닥을 상담하실 때", "책상과 수납장이 놓인 구역, 비워 둘 수 있는 구역을 나누어 알려주세요. 출근 전 이용을 원하신다면 작업 종료와 바닥 이용 재개 시간을 구분해 일정을 협의합니다."],
] as const;

export const anyangWaxFaq: [string, string][] = [
  ["안양 바닥왁스코팅 가격은 평당으로 정하나요?", "찐청소는 평수만으로 가격을 정하지 않습니다. 필요한 인원과 장비·약품, 실제 작업량을 기준으로 확인하며 기존 왁스 박리 여부, 집기 배치와 이동 조건에 따라 견적이 달라집니다."],
  ["안양에서 진행한 작업 사진을 볼 수 있나요?", "이 페이지에 안양 학원, 한식뷔페, 식당, 업무시설, 사무실로 등록된 바닥왁스코팅 전후 사진을 모았습니다. 현장별 제목과 사진을 확인할 수 있으며, 같은 지역의 사례라도 작업 범위와 비용이 같다는 뜻은 아닙니다."],
  ["만안구와 동안구 모두 방문 상담이 가능한가요?", "평촌·범계·비산동·호계동·관양동·인덕원이 있는 동안구와 안양1번가·석수동·박달동·명학역 일대가 있는 만안구 현장 모두 주소와 희망 일정을 알려주시면 방문 가능 여부를 확인합니다. 구 이름만으로 출장 일정이나 비용을 확정하지 않으며 주차, 승강기, 반입 동선도 함께 확인합니다."],
  ["학원 수업이나 매장 영업 전에 끝낼 수 있나요?", "가능 여부는 작업량과 건조 조건을 확인한 뒤 안내합니다. 마지막 수업·영업 종료 시간과 다음 이용 시간을 알려주세요. 코팅 도포가 끝났다고 바로 보행하거나 집기를 놓을 수 있는 것은 아닙니다."],
  ["기존 왁스를 반드시 박리해야 하나요?", "기존 왁스가 여러 겹 쌓였거나 들뜬 부분이 있으면 박리가 필요합니다. 등록된 사례 중 음식점 자료는 박리 후 코팅으로 진행했지만, 다른 현장은 기존 왁스 상태를 확인한 뒤 박리 필요 여부를 판단합니다."],
  ["데코타일이나 디럭스타일에도 코팅할 수 있나요?", "네, 데코타일과 디럭스타일 모두 왁스코팅이 가능한 바닥재입니다. 재질에 따라 코팅제 흡수와 광택 정도가 달라질 수 있어 바닥 사진을 확인한 뒤 안내합니다."],
  ["왁스코팅은 얼마나 유지되나요?", "사용 빈도와 청소 방식에 따라 다르지만, 일반적으로 몇 개월에서 1년 사이에 광택이 떨어지기 시작합니다. 현장 사용 환경을 알려주시면 유지 기간을 안내해 드립니다."],
  ["바닥이 미끄러워지지는 않나요?", "코팅제 자체가 미끄러움을 크게 늘리지는 않지만, 물기가 있는 상태에서는 어떤 바닥이든 미끄러울 수 있습니다. 학원이나 매장처럼 사람이 많이 오가는 공간은 마른 상태를 확인한 뒤 이용해 주세요."],
  ["청소와 왁스코팅은 무엇이 다른가요?", "청소는 바닥의 먼지와 오염을 제거하는 작업이고, 왁스코팅은 청소를 마친 바닥 위에 보호막이 되는 코팅제를 발라 광택과 내구성을 더하는 작업입니다. 코팅 전에는 반드시 충분한 세척이 먼저입니다."],
  ["코팅 횟수는 어떻게 정하나요?", "바닥 재질과 오염 정도, 사용 빈도에 따라 1~2회로 정합니다. 등록된 한식뷔페 사례는 박리 후 코팅으로 진행했으며, 현장 상태를 확인한 뒤 횟수를 안내합니다."],
];

export function AnyangWaxEvidence() {
  const items = gallery.find(category => category.slug === "floor-wax")!.items;
  return <section id="cases" className="scroll-mt-36" aria-label="안양 바닥왁스코팅 현장 사진">
    <h2 className="text-2xl font-black text-brand-dark">안양 바닥왁스코팅 실제 작업 사진</h2>
    <ReadingParagraph className="mt-4">안양 학원·음식점·업무시설·사무실로 등록된 작업 전후 사진입니다. 내 현장과 비슷한 공간부터 살펴보세요.</ReadingParagraph>
    <ReadingParagraph className="mt-3 text-sm text-gray-500">현장 이름과 작업명은 기존 등록 자료를 따릅니다. 한식뷔페 사례에는 대표님이 확인한 작업 과정을 담았으며, 다른 사진 아래에는 비슷한 공간을 의뢰할 때의 상담 확인사항을 안내합니다.</ReadingParagraph>
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {[caseQuestions[1], caseQuestions[0], ...caseQuestions.slice(2)].map(([id, question, note]) => {
        const item = items.find(photo => photo.id === id)!;
        return <article key={id} data-case={id} className={`min-w-0 rounded-2xl border p-4 sm:p-5 ${id === "floor-wax-g28" ? "border-brand/30 lg:col-span-2" : "border-gray-200"}`}>
          {id === "floor-wax-g28" && <p className="mb-3 text-sm font-bold text-brand">대표 사례 · 작업 과정과 견적 판단</p>}
          <h3 className="text-lg font-bold text-brand-dark">{item.title}</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {([['작업 전', item.before, item.beforeWidth, item.beforeHeight], ['작업 후', item.after, item.afterWidth, item.afterHeight]] as const).map(([label, file, width, height]) => <figure key={file}>
              <Image src={`/images/gallery-v2/${file}`} alt={`${item.title} · ${label}`} width={width} height={height} sizes="(min-width: 768px) 330px, 45vw" className="h-auto w-full rounded-lg" />
              <figcaption className="mt-2 text-center text-sm font-bold text-brand-dark">{label}</figcaption>
            </figure>)}
          </div>
          {id === "floor-wax-g28" ? <div data-case-detail className="mt-5">
            <h4 className="text-lg font-bold text-brand-dark">집기를 나눠 옮기며, 2명이 8시간 넘게 작업한 이유</h4>
            <dl className="mt-4 grid gap-3 rounded-xl bg-brand-light/40 p-4 sm:grid-cols-2">
              <div><dt className="font-bold">바닥 재질</dt><dd className="mt-1">디럭스 타일</dd></div>
              <div><dt className="font-bold">작업 인원·시간</dt><dd className="mt-1">2명 · 8시간 초과</dd></div>
              <div><dt className="font-bold">기존 상태</dt><dd className="mt-1">오염이 남은 바닥 위로 덧발라진 두꺼운 왁스층</dd></div>
              <div><dt className="font-bold">진행 방식</dt><dd className="mt-1">집기를 옮겨 구역을 나눈 뒤 기존 왁스 전체 박리·코팅</dd></div>
            </dl>
            <h5 className="mt-6 font-bold text-brand-dark">01 · 현장 문제와 전체 박리가 필요했던 이유</h5>
            <ReadingParagraph className="mt-2">이 현장의 바닥은 검은색과 흰색 계열이 반씩 섞여 보이는 디럭스 타일이었습니다. 기존 오염을 제대로 제거하지 않은 상태에서 그 위에 코팅이 덧발라져, 두꺼운 왁스층을 전부 박리해야 했습니다.</ReadingParagraph>
            <h5 className="mt-6 font-bold text-brand-dark">02 · 집기를 나눠 옮기며 진행한 작업</h5>
            <ReadingParagraph className="mt-2">집기가 많은 상태라 바닥 전체를 한 번에 비울 수 없었습니다. 집기를 한쪽으로 모아 절반을 작업하고, 반대쪽으로 다시 옮겨 나머지 절반을 진행했습니다.</ReadingParagraph>
            <h5 className="mt-6 font-bold text-brand-dark">03 · 작업량에 영향을 준 피막과 집기 이동</h5>
            <ReadingParagraph className="mt-2">이렇게 기존 왁스를 제거하고 구역을 나누어 진행한 작업에는 2명이 8시간 넘게 투입됐습니다. 평수만 보면 드러나지 않는 기존 피막 상태와 집기 이동 조건이 작업량에 영향을 준 사례입니다.</ReadingParagraph>
            <ReadingParagraph className="mt-3 text-sm text-gray-500">현장 설명과 인원·시간은 찐청소 대표님의 작업 경험을 바탕으로 작성했습니다. 이 현장의 기록이며 다른 현장의 표준 작업 시간이나 확정 견적을 뜻하지 않습니다.</ReadingParagraph>
            <a href="#estimate" className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">내 현장의 견적에 영향을 주는 조건 보기 →</a>
          </div> : <>
            <p className="mt-4 font-bold text-brand-dark">{question}</p>
            <ReadingParagraph className="mt-2">{note}</ReadingParagraph>
          </>}
          <Link href={galleryHref("floor-wax", id)} className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">이 현장의 전후 사진 크게 보기 →</Link>
        </article>;
      })}
    </div>
    <ReadingParagraph className="mt-5 text-sm text-gray-500">사진은 촬영 각도와 조명에 따라 다르게 보일 수 있습니다. 사진만으로 바닥 재질, 코팅 횟수, 내구성이나 작업 금액을 확정하지 않습니다.</ReadingParagraph>
    <Link href={galleryHref("floor-wax")} className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">다른 지역을 포함한 바닥왁스코팅 사진 보기 →</Link>
    <BackToContents />
  </section>;
}

export function AnyangWaxEstimate() {
  return <div data-regional-estimate className="mt-5 border-l-4 border-brand pl-4 sm:pl-5">
    <ReadingParagraph>안양 바닥왁스코팅 비용은 필요한 인원과 장비·약품, 실제 작업량을 기준으로 확인합니다. 같은 평수라도 기존 왁스를 벗겨야 하는지, 집기를 이동해야 하는지에 따라 필요한 작업이 달라집니다.</ReadingParagraph>
    <ReadingParagraph className="mt-3">학원은 책상·의자 배치, 음식점은 식탁·배식대 주변, 사무실은 책상·수납장 아래처럼 접근이 어려운 구역도 사진에 담아주세요. 넓이만으로는 보이지 않는 작업 조건을 확인하는 데 도움이 됩니다.</ReadingParagraph>
    <Link href="/바닥-왁스-코팅/#estimate" className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-dark underline underline-offset-4">세척·박리·코팅의 상세 견적 기준 →</Link>
  </div>;
}
