import type { MetadataRoute } from "next";
import { serviceProfiles, servicePath } from "@/lib/service-profiles";
import { regionalPages, regionalPath } from "@/lib/regional-pages";
import { absoluteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services/", "/about/", "/pricing/", "/reviews/", "/contact/", ...serviceProfiles.map(s => servicePath(s.name)), ...regionalPages.map(regionalPath)].map(path => ({ url: absoluteUrl(path) }));
}
