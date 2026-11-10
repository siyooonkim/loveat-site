import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import { APP_STORE_ID, OG_IMAGE, PRETENDARD_CSS, SITE_NAME, SITE_URL, verificationMeta } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '러브앳 – 돌싱 소개팅·재혼 만남, 서류로 검증된 돌싱만',
  description:
    '러브앳은 혼인관계증명서로 인증한 돌싱만 만나는 소개팅 앱이에요. 재혼을 생각하는 돌싱에게 매일 최대 세 분, 서류로 검증된 분을 소개해요.',
  alternates: { canonical: '/' },
  itunes: { appId: APP_STORE_ID },
  verification: verificationMeta(),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    url: `${SITE_URL}/`,
    title: '러브앳 – 돌싱을 위한 검증된 소개',
    description: '다시 시작하는 만남, 믿을 수 있는 소개로. 혼인 이력을 서류로 확인한 돌싱 회원만 소개해요.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "러브앳 로고와 '다시 시작하는 만남, 믿을 수 있는 소개로' 문구, 앱 화면",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '러브앳 – 돌싱을 위한 검증된 소개',
    description: '다시 시작하는 만남, 믿을 수 있는 소개로. 혼인 이력을 서류로 확인한 돌싱 회원만 소개해요.',
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
  themeColor: '#FFFDF9',
};

/** 홈(랜딩) 전용 루트 레이아웃 — 디자인 원본 그대로인 assets/style.css 만 쓴다 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  // 히어로 폰 화면 사진(LCP)을 먼저 받는다 — 기존 <link rel="preload" as="image"> 와 같다
  preload('/assets/img/w1.webp', { as: 'image', type: 'image/webp' });
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
