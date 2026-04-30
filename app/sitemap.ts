import type { MetadataRoute } from "next";
import {
  getAllArticleSummaries,
  getAuthors,
} from "@/lib/content/loader";
import { CATEGORY_SLUGS } from "@/lib/content/categories";

const SITE = "https://lab.haiinu.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticleSummaries();
  const authors = await getAuthors();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/tags/`, changeFrequency: "weekly", priority: 0.6 },
  ];

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((c) => ({
    url: `${SITE}/${c}/`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE}${a.href}`,
    lastModified: a.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const authorUrls: MetadataRoute.Sitemap = Object.values(authors).map((au) => ({
    url: `${SITE}/authors/${au.id}/`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticUrls, ...categoryUrls, ...articleUrls, ...authorUrls];
}
