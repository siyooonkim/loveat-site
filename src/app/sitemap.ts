import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /sitemap.xml — 색인할 페이지만 넣는다.
 * /delete-account/ 는 /account-deletion/ 과 같은 본문(canonical 이 /account-deletion/)이라 뺀다.
 * 가이드(/guide/…)는 2026-11-26 닫아서 뺀다(홈으로 보내는 noindex 페이지만 남음).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_UPDATED = '2026-11-26';
  return [
    { url: `${SITE_URL}/`, lastModified: SITE_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/account-deletion/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/child-safety/`, lastModified: SITE_UPDATED, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
