export type SafetyDocument = {
  title: string;
  description: string;
  image: string;
  width: number;
  height: number;
};

// 찐청소가 공기질 관리에 사용하는 약품의 안전성·효과를 입증하는 공인 시험 자료
export const safetyDocuments: SafetyDocument[] = [
  {
    title: "무독성 실험 결과",
    description: "인체에 무해한 성분임을 확인한 독성 시험 결과입니다",
    image: "/images/certifications/non-toxic-test-report.webp",
    width: 1905,
    height: 1200,
  },
  {
    title: "VOC(휘발성유기화합물) 실험 결과",
    description: "공기질 개선 효과를 확인한 공인 시험 결과입니다",
    image: "/images/certifications/voc-test-report.webp",
    width: 933,
    height: 1245,
  },
];
