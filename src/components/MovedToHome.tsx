import type { Metadata } from 'next';
import { GuideFooter, GuideHeader } from '@/components/GuideChrome';

/**
 * 닫은 페이지(옛 가이드 /guide/, /guide/<글>/)를 홈으로 보내는 안내 페이지.
 * GitHub Pages 정적 배포라 서버 리다이렉트를 못 쓰므로 meta refresh(0초) + canonical(홈) + noindex 로 처리한다.
 * 검색엔진은 noindex·canonical 을 보고 이 주소를 색인에서 빼고, 사람은 바로 홈으로 이동한다.
 */
export const movedMetadata: Metadata = {
  title: '러브앳 홈으로 이동해요',
  alternates: { canonical: '/' },
  robots: { index: false, follow: true },
};

export default function MovedToHome() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <GuideHeader />
      <main id="main" className="article">
        <h1>러브앳 홈으로 이동해요</h1>
        <p className="intro">이 페이지는 닫혔어요. 잠시 후 홈으로 이동해요. 이동하지 않으면 아래 링크를 눌러 주세요.</p>
        <ul className="toc">
          <li><a href="/">러브앳 홈으로 가기</a></li>
        </ul>
      </main>
      <GuideFooter />
    </>
  );
}
