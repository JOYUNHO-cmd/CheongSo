import { ShieldCheck, CheckCircle2, Clock, Star } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "범위부터 확인", desc: "포함 구역과 별도 작업을 미리 정리합니다." },
  { icon: CheckCircle2, title: "비용은 사전 협의", desc: "현장 조건에 맞춰 작업과 비용을 확인합니다." },
  { icon: Clock, title: "일정은 함께 조율", desc: "출입 시간과 이용 재개 시점을 협의합니다." },
  { icon: Star, title: "마무리도 꼼꼼히", desc: "작업 결과와 이후 관리 방법을 안내합니다." },
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
