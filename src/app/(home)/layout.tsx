import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import { APP_STORE_ID, HOME_FONT, OG_IMAGE, OG_IMAGE_ALT, SITE_NAME, SITE_URL, verificationMeta } from '@/lib/site';

const PHONE_PORTRAIT = '(orientation: portrait) and (max-width: 600px)';
const TITLE = '러브앳 – 당신이 원하는 상대를 만나요';
const DESCRIPTION =
  '러브앳은 먼저 당신을 알아가고, 당신과 잘 맞는 사람을 찾아 소개해요. 당신의 취향을 배우는 AI 러비가 소개를 받을수록 더 잘 맞는 상대를 추천해요.';
const SHARE_DESCRIPTION = '먼저 당신을 알아가요. 그리고 당신과 잘 맞는 사람을 찾아요.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  itunes: { appId: APP_STORE_ID },
  verification: verificationMeta(),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    url: `${SITE_URL}/`,
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: '/assets/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
  colorScheme: 'light',
};

/** 홈(랜딩) 전용 루트 레이아웃 — 새 홈(v4) 스타일 /assets/home.css 만 쓴다. 글꼴은 부분 글꼴을 미리 받는다(font-display: swap) */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  preload(HOME_FONT, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  // 영상 첫 장면 포스터를 먼저 받는다 — 영상 선택(본문 스크립트)과 같은 조건(세로 폰이면 9:16)으로 하나만
  preload('/assets/home/film-9x16-poster.webp', { as: 'image', type: 'image/webp', fetchPriority: 'high', media: PHONE_PORTRAIT });
  preload('/assets/home/film-16x9-poster.webp', { as: 'image', type: 'image/webp', fetchPriority: 'high', media: `not all and ${PHONE_PORTRAIT}` });
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" />
        <link rel="stylesheet" href="/assets/home.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
