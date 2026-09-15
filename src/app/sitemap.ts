import type { MetadataRoute } from "next";
import { serviceProfiles, servicePath } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { absoluteUrl } from "@/lib/site-url";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services/"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/pricing/"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about/"), lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/reviews/"), lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/contact/"), lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceProfiles.map((s) => ({
    url: absoluteUrl(servicePath(s.name)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const regionPages: MetadataRoute.Sitemap = regionalPages.map((p) => ({
    url: absoluteUrl(regionalPath(p)),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...mainPages, ...servicePages, ...regionPages];
}
