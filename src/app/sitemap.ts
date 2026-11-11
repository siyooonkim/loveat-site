import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /sitemap.xml — 색인할 페이지만 넣는다.
 * /delete-account/ 는 /account-deletion/ 과 같은 본문(canonical 이 /account-deletion/)이라 뺀다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_UPDATED = '2026-11-10';
  return [
    { url: `${SITE_URL}/`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/guide/`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/guide/${a.slug}/`,
      lastModified: a.dateModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/account-deletion/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
