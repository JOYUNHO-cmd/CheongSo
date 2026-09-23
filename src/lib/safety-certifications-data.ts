export type SafetyDocument = {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
};

// ECOSORB 제품의 VOC 및 독성 관련 시험자료
export const safetyDocuments: SafetyDocument[] = [
  {
    title: "독성 관련 시험 결과",
    description: "자료에 기재된 제품의 독성 관련 시험 결과입니다",
    image: "/images/certifications/non-toxic-test-report.webp",
    width: 1905,
    height: 1200,
  },
  {
    title: "VOC(휘발성유기화합물) 실험 결과",
    description: "시료의 VOC 분석 결과입니다",
    image: "/images/certifications/voc-test-report.webp",
    width: 933,
    height: 1245,
  },
];
