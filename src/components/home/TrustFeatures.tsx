import { ShieldCheck, CheckCircle2, Clock, Star } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "대표 직접 관리", desc: "상담부터 마무리까지 대표가 직접 관리합니다." },
  { icon: CheckCircle2, title: "정직한 투명 견적", desc: "현장 상태와 범위 확인 후 추가 없는 견적 안내" },
  { icon: Clock, title: "신속 현장 대응", desc: "고객님이 원하는 시간, 언제든 달려갑니다." },
  { icon: Star, title: "100% 만족 보장", desc: "만족하실 때까지 끝까지 책임집니다." },
];

export default function TrustFeatures() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 text-center md:grid-cols-4 md:gap-8">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg md:p-8"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand transition-all group-hover:bg-brand group-hover:text-white md:mb-6 md:h-16 md:w-16">
            <feature.icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={2.5} />
          </div>
          <h3 className="mb-1 text-sm font-extrabold text-gray-900 md:mb-3 md:text-lg">{feature.title}</h3>
          <p className="hidden text-sm leading-relaxed text-gray-500 md:block">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
}
