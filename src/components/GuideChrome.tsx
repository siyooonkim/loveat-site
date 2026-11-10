import { CONTACT_EMAIL } from '@/lib/site';

/** 가이드·안내 페이지 공통 머리글/바닥글 — 기존 guide/index.html 과 같은 마크업 */
export function GuideHeader() {
  return (
    <>
      <a className="skip" href="#main">본문으로 건너뛰기</a>
      <header className="site-header">
        <div className="wrap">
          <a className="brand" href="/" aria-label="러브앳 홈">
            <img src="/assets/img/logo-192.png" width="34" height="34" alt="" />
            <span>Love at</span>
          </a>
          <a className="btn-sm" href="/#download">앱 다운로드</a>
        </div>
      </header>
    </>
  );
}

export function GuideFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <nav aria-label="하단 메뉴">
          <a href="/">러브앳 홈</a>
          <a href="/terms/">이용약관</a>
          <a href="/privacy/">개인정보처리방침</a>
        </nav>
        <p>{`운영: 김시윤 · 문의: ${CONTACT_EMAIL}`}</p>
        <p>© 2026 러브앳</p>
      </div>
    </footer>
  );
}
