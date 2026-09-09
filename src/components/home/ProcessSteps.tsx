import Image from "next/image";
import { ChevronDown } from "lucide-react";

const steps = [
  { img: "/images/process/visit-notification.webp", label: "STEP 01", title: "방문 안내" },
  { img: "/images/process/diagnosis-process.webp", label: "STEP 02", title: "현장 진단" },
  { img: "/images/process/top-to-bottom-cleaning.webp", label: "STEP 03", title: "위에서 아래로 청소" },
  { img: "/images/process/eco-neutralization.webp", label: "STEP 04", title: "친환경 중화 처리" },
  { img: "/images/process/confirmation-aftercare.webp", label: "STEP 05", title: "확인 및 사후관리" },
];

export default function ProcessSteps() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex w-full flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="relative aspect-[4/3] w-full bg-gray-50">
              <Image src={step.img} alt={`${step.label} ${step.title}`} fill className="object-contain" sizes="(min-width: 768px) 700px, 100vw" />
            </div>
            <div className="px-5 py-4 text-center">
              <p className="text-xs font-bold text-brand">{step.label}</p>
              <p className="mt-1 text-base font-bold text-gray-900">{step.title}</p>
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className="my-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-md">
              <ChevronDown className="h-5 w-5" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
