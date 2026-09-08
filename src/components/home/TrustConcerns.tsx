import Image from "next/image";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const concerns = [
  {
    title: "교묘한 현장 추가요금 요구",
    desc: "저렴하게 예약을 유도한 뒤, 막상 작업 당일이 되면 현장 오염이나 분진을 핑계로 일방적인 추가금을 청구하는 경우가 많습니다.",
  },
  {
    title: "하청 및 일용직 대리 파견",
    desc: "정식 직원이 아닌, 청소 방법을 제대로 숙지하지 못한 불분명한 일용직이나 하청팀을 대리 파견하여 무책임한 날림 청소가 이뤄집니다.",
  },
  {
    title: "귀중품 분실 및 파손 면피",
    desc: "청소 도중 가구가 긁히거나 가전제품이 고장 났음에도 보증·보험 장치가 없어 고객님에게 모든 책임을 전가하려 합니다.",
  },
  {
    title: "유독 세제 잔존 미처리",
    desc: "빠르게 오염을 제거하기 위해 독한 세제를 무분별하게 사용해, 청소 후 집안 곳곳에 유해 가스가 남아 두통을 만듭니다.",
  },
];

export default function TrustConcerns() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="relative w-full max-w-[280px] rounded-2xl border-2 border-gray-900 bg-white px-6 py-4 text-center shadow-sm sm:max-w-[380px]">
          <p className="text-base font-black text-gray-900 md:text-lg">
            안녕하세요, 대표 <span className="text-brand">{siteConfig.ceo}</span> 입니다
          </p>
        </div>
        <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-2xl shadow-md md:h-64 md:w-64">
          <Image src="/images/process/professional-cleaning.webp" alt="대표 현장 사진" fill className="object-cover" sizes="256px" />
        </div>
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-xl font-black leading-tight text-gray-900 md:text-3xl">
          청소업체를 알아볼 때, 이런{" "}
          <span className="text-red-500">불쾌한 경험이나 두려움</span>이 앞서지 않으셨나요?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base">
          상당수의 고객님이 타사 청소 서비스를 경험하신 후 후회하며 저희를 다시 찾아주고 계십니다.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {concerns.map((item) => (
          <div
            key={item.title}
            className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors group-hover:bg-brand group-hover:text-white">
              <ShieldAlert className="block h-5 w-5 group-hover:hidden" />
              <ShieldCheck className="hidden h-5 w-5 group-hover:block" />
            </div>
            <h3 className="mb-2 text-base font-extrabold text-gray-900">{item.title}</h3>
            <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark to-brand p-8 text-center md:p-10">
        <h4 className="mb-4 text-base font-black text-white md:text-xl">
          &ldquo;{siteConfig.name}는 고객님의 모든 의심과 피로를 정면으로 해결합니다.&rdquo;
        </h4>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
          낯선 사람이 나의 삶의 공간을 만지는 작업이기에 신분 보증, 사후 관리, 투명한 요금 약속은 단순한
          서비스 규정이 아닌 브랜드의 핵심 윤리입니다. {siteConfig.name}는 투명함과 철저함으로 보답합니다.
        </p>
      </div>
    </div>
  );
}
