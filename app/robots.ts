import type { MetadataRoute } from 'next';
import { siteUrlString } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/'],
    },
    ...(siteUrlString ? { sitemap: `${siteUrlString}/sitemap.xml`, host: siteUrlString } : {}),
  };
}
