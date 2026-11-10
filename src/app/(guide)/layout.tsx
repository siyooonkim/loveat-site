import type { Metadata, Viewport } from 'next';
import { PRETENDARD_CSS, SITE_URL, verificationMeta } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: verificationMeta(),
  icons: {
    icon: [{ url: '/assets/favicon.ico', sizes: 'any' }],
    apple: '/assets/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#F6F3EE',
};

/** 가이드·안내 페이지 루트 레이아웃 — 기존 정적 페이지와 같은 assets/guide.css 를 쓴다 */
export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
        <link rel="stylesheet" href="/assets/guide.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
