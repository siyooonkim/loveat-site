import type { Metadata, Viewport } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: [{ url: '/assets/favicon.ico', sizes: 'any' }] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

const CSS =
  'body{font-family:-apple-system,"Apple SD Gothic Neo",sans-serif;background:#F6F3EE;color:#1D1B19;padding:40px 20px;text-align:center}a{color:#B8322B;font-weight:600}';

/** 이용약관·개인정보처리방침 이동 페이지 레이아웃 — 기존 정적 리다이렉트 HTML 과 같은 모양 */
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
