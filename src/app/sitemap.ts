import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /sitemap.xml — 색인할 페이지만 넣는다.
 * /terms/, /privacy/ 는 외부 문서(loveat-legal)로 넘기는 페이지라 canonical 이 밖을 가리켜서 뺀다.
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
  ];
}
