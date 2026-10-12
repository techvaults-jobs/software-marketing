import type { MetadataRoute } from "next"
import { sectors } from "@/content/sectors"
import { site } from "@/content/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/inventory",
    "/industries",
    "/demo",
    "/services",
    "/systems",
    "/customers/abu-twins",
    "/contact",
    ...sectors.flatMap((sector) => [`/industries/${sector.slug}`, `/demo/${sector.slug}`]),
  ]
  return paths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }))
}
