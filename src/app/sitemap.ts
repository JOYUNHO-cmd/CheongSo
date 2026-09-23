import type { MetadataRoute } from "next";
import { serviceProfiles, servicePath } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { absoluteUrl } from "@/lib/site-url";

// 실제 콘텐츠 수정일을 관리하기 전까지 배포 시각을 수정일로 표시하지 않습니다.

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/areas/"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/pricing/"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/reviews/"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/gallery/"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/contact/"), changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceProfiles.map((s) => ({
    url: absoluteUrl(servicePath(s.name)),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const regionPages: MetadataRoute.Sitemap = regionalPages.map((p) => ({
    url: absoluteUrl(regionalPath(p)),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...mainPages, ...servicePages, ...regionPages];
}
