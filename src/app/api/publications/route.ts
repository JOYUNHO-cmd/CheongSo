import { regionalPages, regionalPath } from "@/lib/regional-pages";
export const dynamic = "force-static";
export function GET() {
  return Response.json({ pages: regionalPages.filter(p => p.publicationId).map(p => ({ path: regionalPath(p), id: p.publicationId })) });
}
