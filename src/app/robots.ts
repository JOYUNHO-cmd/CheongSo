import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site-url";

// 검색엔진뿐 아니라 AI 답변엔진(GEO/AEO) 크롤러도 명시적으로 허용합니다.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
];

// 네이버 검색로봇(예티)도 명시적으로 허용합니다.
const naverCrawlers = ["Yeti", "NaverBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
      ...naverCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
