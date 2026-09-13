import { ShieldCheck, CheckCircle2, Clock, Star } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "범위부터 확인",
    line1: "포함 구역과 별도 작업을",
    line2: "미리 정리합니다",
  },
  {
    icon: CheckCircle2,
    title: "비용은 사전 협의",
    line1: "현장 조건에 맞춰",
    line2: "작업&비용을 확인합니다",
  },
  {
    icon: Clock,
    title: "일정은 함께 조율",
    line1: "출입 시간과 이용 재개의",
    line2: "시점을 협의합니다",
  },
  {
    icon: Star,
    title: "마무리도 꼼꼼히",
    line1: "작업 결과와 이후 관리를",
    line2: "친절하게 안내합니다",
  },
];

export default function TrustFeatures() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-3.5 text-center sm:gap-4 sm:px-6 md:grid-cols-4 md:gap-8">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-2xl border border-gray-100 bg-white px-2.5 py-4 shadow-sm transition-all hover:-translate-y-1 hover:border-brand hover:shadow-lg sm:p-5 md:p-8"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand transition-all group-hover:bg-brand group-hover:text-white md:mb-6 md:h-16 md:w-16">
            <feature.icon className="h-6 w-6 md:h-8 md:w-8" strokeWidth={2.5} />
          </div>
          <h3 className="mb-2 text-sm font-extrabold text-gray-900 md:mb-3 md:text-lg">{feature.title}</h3>
          <p className="text-[11.5px] min-[360px]:text-[12px] leading-snug text-gray-600 sm:text-[13px] md:text-sm md:leading-relaxed">
            <span className="block whitespace-nowrap tracking-tight">{feature.line1}</span>
            <span className="block mt-0.5 md:mt-1 whitespace-nowrap tracking-tight">{feature.line2}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
