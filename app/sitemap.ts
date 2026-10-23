import type { MetadataRoute } from 'next';
import { siteUrlString } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrlString) return [];

  return [
    {
      url: siteUrlString,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
