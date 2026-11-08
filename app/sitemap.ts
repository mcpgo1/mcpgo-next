import type { MetadataRoute } from "next";
import { SITE_URL } from "./site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: SITE_URL,
    lastModified: new Date("2026-11-07T00:00:00Z"),
    changeFrequency: "monthly",
    priority: 1,
  }, {
    url: `${SITE_URL}/career`,
    lastModified: new Date("2026-11-08T00:00:00Z"),
    changeFrequency: "monthly",
    priority: 0.7,
  }];
}
