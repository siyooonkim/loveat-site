import type { Metadata } from 'next';
import { GuideFooter, GuideHeader } from '@/components/GuideChrome';
import { PRETENDARD_CSS } from '@/lib/site';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없어요 | 러브앳',
  robots: { index: false },
};

/** 404 — 가이드 페이지와 같은 guide.css 스타일 */
export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={PRETENDARD_CSS} />
        <link rel="stylesheet" href="/assets/guide.css" />
      </head>
      <body>
        <GuideHeader />
        <main id="main" className="article">
          <h1>페이지를 찾을 수 없어요</h1>
          <p className="intro">주소가 바뀌었거나 없는 페이지예요. 러브앳 홈이나 돌싱 만남 가이드에서 다시 찾아보세요.</p>
          <ul className="toc">
            <li><a href="/">러브앳 홈</a></li>
            <li><a href="/guide/">돌싱 만남 가이드</a></li>
          </ul>
        </main>
        <GuideFooter />
      </body>
    </html>
  );
}
