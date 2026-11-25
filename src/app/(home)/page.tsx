import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import JsonLd from '@/components/JsonLd';
import { CONTACT_EMAIL, ORG_ID, SITE_URL, STORES, STORE_SOON_MESSAGE, WEBSITE_ID } from '@/lib/site';

/**
 * 랜딩 — 새 홈 v4 (아티팩트 v21, 2026-11-26 최종 확정).
 *
 * 본문 마크업은 원본 home-v4.html 의 <header>~<footer> 를 그대로 복사한 home-v4.body.html 이다.
 * 홈 디자인이 다시 바뀌면 그 파일만 새 원본으로 바꾸면 되고, 사이트에 맞추는 손질은 아래 SITE_FIXES 가 빌드 때 한다.
 * (손질할 자리를 못 찾으면 빌드가 멈춘다 — 조용히 틀어지지 않게)
 * 스타일은 /assets/home.css, 동작은 /assets/home.js.
 */

const MEDIA = '/assets/home';
const RAW = readFileSync(join(process.cwd(), 'src/app/(home)/home-v4.body.html'), 'utf8');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/** 스토어 버튼 <a> 여는 태그 — 출시 전(live=false)에는 #download 로만 가고 '곧 출시돼요' 안내(home.js)가 뜬다 */
function storeOpenTag(alt: string, name: 'App Store' | 'Google Play') {
  const key = name === 'App Store' ? 'ios' : 'android';
  const s = STORES[key];
  const live = s.live && !!s.url;
  const cls = `store${alt}`;
  return live
    ? `<a class="${cls}" href="${esc(s.url)}" data-store="${key}" aria-label="${name}에서 받기">`
    : `<a class="${cls}" href="#download" data-store="${key}" data-soon="${esc(STORE_SOON_MESSAGE)}" aria-label="${name}에서 받기 (준비 중)">`;
}

type Fix = { what: string; from: string | RegExp; to: string | ((...m: string[]) => string); count: number };

const SITE_FIXES: Fix[] = [
  {
    what: '자동재생은 home.js 가 받는 속도를 재서 끊김 없을 때 시작한다(브라우저 autoplay 속성 제거)',
    from: '<video id="film" autoplay muted playsinline preload="auto"',
    to: '<video id="film" muted playsinline preload="auto"',
    count: 1,
  },
  {
    what: '영상 포스터는 화면에 맞는 것 하나만 받도록 스크립트에서 정한다(마크업 기본값 제거)',
    from: ' poster="v4/film-16x9-poster.jpg"',
    to: '',
    count: 1,
  },
  {
    what: '세로 폰: WebP 첫 장면 포스터',
    from: "v.poster='v4/film-9x16-poster.jpg';",
    to: `v.poster='${MEDIA}/film-9x16-poster.webp';`,
    count: 1,
  },
  {
    what: '가로 화면: WebP 첫 장면 포스터',
    from: "f.classList.add('wide'); v.src=",
    to: `f.classList.add('wide'); v.poster='${MEDIA}/film-16x9-poster.webp'; v.src=`,
    count: 1,
  },
  { what: '미디어 경로', from: /(["'])v4\//g, to: (_m, q) => `${q}${MEDIA}/`, count: 3 },
  {
    what: '스토어 버튼 4개 — 주소·출시 여부는 src/lib/site.ts',
    from: /<a class="store( store-alt)?" href="#download" aria-label="(App Store|Google Play)에서 받기 \(준비 중\)">/g,
    to: (_m, alt, name) => storeOpenTag(alt ?? '', name as 'App Store' | 'Google Play'),
    count: 4,
  },
  {
    what: '하단 링크를 실제 페이지로 + 운영 정보',
    from: '<nav aria-label="약관과 문의"><a href="#top">이용약관</a><a href="#top">개인정보처리방침</a></nav>',
    to:
      `<nav aria-label="약관과 문의"><a href="/terms/">이용약관</a><a href="/privacy/">개인정보처리방침</a><a href="mailto:${CONTACT_EMAIL}">문의</a></nav>` +
      `<p class="info">운영: 김시윤 · 문의: ${CONTACT_EMAIL}</p>`,
    count: 1,
  },
];

function applyFixes(html: string) {
  for (const f of SITE_FIXES) {
    const n = typeof f.from === 'string' ? html.split(f.from).length - 1 : (html.match(f.from) ?? []).length;
    if (n !== f.count) throw new Error(`[home] '${f.what}' 손질 자리가 ${f.count}곳이어야 하는데 ${n}곳이에요. home-v4.body.html 을 확인하세요.`);
    html = typeof f.from === 'string' ? html.split(f.from).join(f.to as string) : html.replace(f.from, f.to as (...m: string[]) => string);
  }
  if (/["']v4\//.test(html)) throw new Error('[home] v4/ 경로가 남았어요.');
  return html;
}

const BODY = applyFixes(RAW);

const appStoreLive = STORES.ios.live && !!STORES.ios.url;
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: '러브앳',
      alternateName: 'Love at',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/img/logo-512.png`,
      email: CONTACT_EMAIL,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: '러브앳',
      alternateName: 'Love at',
      url: `${SITE_URL}/`,
      inLanguage: 'ko-KR',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'MobileApplication',
      name: '러브앳',
      operatingSystem: 'iOS, Android',
      applicationCategory: 'LifestyleApplication',
      applicationSubCategory: 'SocialNetworkingApplication',
      description: '먼저 당신을 알아가고, 당신과 잘 맞는 사람을 찾아 소개해요. 당신의 취향을 배우는 AI 러비가 소개를 받을수록 더 잘 맞는 상대를 추천해요.',
      ...(appStoreLive ? { downloadUrl: STORES.ios.url, installUrl: STORES.ios.url } : {}),
      image: `${SITE_URL}/assets/img/logo-512.png`,
      inLanguage: 'ko-KR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      publisher: { '@id': ORG_ID },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <a className="skip" href="#top">본문으로 건너뛰기</a>
      {/* display:contents — 감싸는 상자가 레이아웃에 끼지 않게 한다 */}
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: BODY }} />
      <div className="toast" id="toast" role="status" aria-live="polite"></div>
      <script src="/assets/home.js" defer></script>
    </>
  );
}
