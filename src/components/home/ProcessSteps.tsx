import Image from "next/image";
import { ChevronDown } from "lucide-react";

const steps = [
  { img: "/images/process/step-01-visit.webp", label: "STEP 01 방문 안내" },
  { img: "/images/process/step-02-diagnosis.webp", label: "STEP 02 현장 진단" },
  { img: "/images/process/step-03-cleaning.webp", label: "STEP 03 꼼꼼한 청소" },
  { img: "/images/process/step-04-finishing.webp", label: "STEP 04 마무리 세정" },
  { img: "/images/process/step-05-aftercare.webp", label: "STEP 05 고객 확인 및 사후관리" },
];

export default function ProcessSteps() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-6">
      {steps.map((step, idx) => (
        <div key={step.label} className="flex w-full flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
            <Image
              src={step.img}
              alt={step.label}
              width={1400}
              height={933}
              className="h-auto w-full"
              sizes="(min-width: 896px) 850px, 100vw"
            />
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
