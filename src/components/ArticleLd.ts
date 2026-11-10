import { ORG_ID, SITE_URL, OG_IMAGE } from '@/lib/site';

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export const publisherOrg = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: '러브앳',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/img/logo-512.png` },
};

export function articleLd(a: { headline: string; description: string; path: string; datePublished: string; dateModified: string }) {
  return {
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    inLanguage: 'ko-KR',
    url: `${SITE_URL}${a.path}`,
    mainEntityOfPage: `${SITE_URL}${a.path}`,
    image: OG_IMAGE,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    author: publisherOrg,
    publisher: publisherOrg,
  };
}
