import JsonLd from '@/components/JsonLd';
import { APP_STORE_URL, CONTACT_EMAIL, ORG_ID, SITE_URL, WEBSITE_ID } from '@/lib/site';

/** 자주 묻는 질문 — 화면과 FAQPage 구조화 데이터가 같은 목록을 쓴다 */
const FAQ = [
  { q: '어떤 분들이 가입하나요?', a: '재혼을 희망하는 분들이에요.' },
  { q: '어떤 서류가 필요한가요?', a: '신원 확인, 혼인 이력, 직장 확인을 위한 서류가 필요해요. 앱 안에서 안내에 따라 제출하시면 돼요.' },
  { q: '하루에 몇 명을 소개받나요?', a: '매일 저녁 6시에 꼭 맞는 분을 1명 골라 소개해 드려요.' },
  { q: '카드는 어떤 게 있고, 언제 쓰나요?', a: '제안카드와 패스카드 두 가지예요. 마음에 드는 분께 제안할 때 제안카드 1장, 넘길 때 패스카드 1장을 써요. 베타 기간에는 매일 저녁 6시에 각각 1장씩 무료로 채워지고, 더 필요하면 앱에서 살 수 있어요. 두 분 모두 제안하면 바로 매칭돼 대화가 열려요.' },
  { q: '대화는 언제 시작되나요?', a: '두 분 모두 [제안하기]를 눌러 매칭되었을 때만 대화가 열려요.' },
];

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
      alternateName: ['Love at', '러브앳 돌싱 소개팅'],
      url: `${SITE_URL}/`,
      inLanguage: 'ko-KR',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'MobileApplication',
      name: '러브앳 - 돌싱 소개팅',
      operatingSystem: 'iOS',
      applicationCategory: 'LifestyleApplication',
      applicationSubCategory: 'SocialNetworkingApplication',
      description: '신원·혼인 이력·직장을 서류로 확인한 돌싱 분들을 매일 1명 소개해요. 대화는 서로 제안했을 때만 시작돼요.',
      downloadUrl: APP_STORE_URL,
      installUrl: APP_STORE_URL,
      image: `${SITE_URL}/assets/img/logo-512.png`,
      inLanguage: 'ko-KR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ],
};

const Chevron = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="#8C857D" strokeWidth="1.8" aria-hidden="true">
    <path d="M1 1l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <span className="doc-ic" aria-hidden="true">
    <svg width="22" height="26" viewBox="0 0 16 18" fill="none" stroke="#D23C34" strokeWidth="1.4">
      <path d="M3 1h7l4 4v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      <path d="M10 1v4h4M5 10h6M5 13h4" strokeLinecap="round" />
    </svg>
  </span>
);

/** 랜딩 — "LoveAt Web v2" 디자인. 마크업·클래스는 정적 HTML 원본과 같다(모양 변경 금지). */
export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <a className="skip" href="#main">본문으로 건너뛰기</a>
      <div className="page">
        <header className="site-header">
          <div className="container">
            <a className="brand" href="#" aria-label="러브앳 홈">
              <picture><source srcSet="/assets/img/loveat-logo-80.webp" type="image/webp" /><img src="/assets/img/loveat-logo-80.png" width="34" height="34" alt="" /></picture>
              <span>Love at</span>
            </a>
            <a className="btn-header" href="#download">앱 다운로드</a>
          </div>
        </header>

        <main id="main">
          {/* Hero */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="container">
              <span className="eyebrow">돌싱을 위한 인연 소개, 러브앳</span>
              <h1 id="hero-title">오직 돌싱만,<br />검증된 소개</h1>
              <p className="hero-lead">믿을 수 있는 인연, 러브앳에서 다시 시작하세요.<br />신원·혼인 이력·직장까지 확인한 분들만 만나요.</p>
              <a className="btn-hero" href="#download">앱 다운로드</a>
              <div className="hero-visual" role="img" aria-label="러브앳 앱 '오늘의 소개' 화면 예시(연출 이미지). 서로 제안했어요 알림">
                <div className="phone" aria-hidden="true">
                  <div className="phone-screen">
                    <div className="phone-island"></div>
                    <div className="phone-status"></div>
                    <div className="phone-head">
                      <span className="phone-title">오늘의 소개</span>
                      <span className="phone-chip">카드 1장</span>
                    </div>
                    <div className="phone-card">
                      <picture>
                        <source srcSet="/assets/img/w1.webp" type="image/webp" />
                        <img src="/assets/img/w1.jpg" width="286" height="381" fetchPriority="high" alt="" />
                      </picture>
                      <div className="phone-card-shade"></div>
                      <div className="phone-card-info"><span className="n">서지원, 29</span><span className="m">서울 마포 · 초등 교사</span></div>
                    </div>
                    <div className="phone-bottom"><p className="phone-note">화면 속 인물은 연출 이미지예요.</p></div>
                  </div>
                </div>
                <div className="float float-r" aria-hidden="true">
                  <span className="float-ic"><svg width="16" height="14" viewBox="0 0 18 16" fill="#fff"><path d="M9 15.5S1 10.6 1 5.2C1 2.8 2.9 1 5.1 1 6.7 1 8.1 1.9 9 3.2 9.9 1.9 11.3 1 12.9 1 15.1 1 17 2.8 17 5.2c0 5.4-8 10.3-8 10.3z" /></svg></span>
                  <span className="float-tx"><span className="t">서로 제안했어요</span><span className="s">이제 대화를 시작해 보세요</span></span>
                </div>
              </div>
            </div>
          </section>

          {/* 철학 */}
          <section className="about" id="about" aria-labelledby="about-title">
            <span className="eyebrow">러브앳의 철학</span>
            <h2 id="about-title">가벼운 만남을 위한<br />앱이 아니에요</h2>
            <p>한 번의 아픔을 지나 다시 시작하려는 분들께,<br />서두르지 않고 믿을 수 있는 한 사람을 소개해요.</p>
          </section>

          {/* 차별점 */}
          <section className="diff" aria-labelledby="diff-title">
            <div className="container">
              <div className="sec-head">
                <span className="eyebrow">소개는 신중하게</span>
                <h2 id="diff-title">많은 소개보다,<br />나에게 맞는 한 사람</h2>
              </div>
              <div className="diff-grid">
                <article className="diff-card">
                  <div className="diff-text">
                    <h3>매일, 1명.</h3>
                    <p>검증된 분 가운데 나와 어울리는 분을 매일 새로 소개해요.</p>
                  </div>
                  <div className="diff-visual v-cards" aria-hidden="true">
                    <div className="c c-l"><picture><source srcSet="/assets/img/w4.webp" type="image/webp" /><img src="/assets/img/w4.jpg" width="152" height="203" loading="lazy" decoding="async" alt="" /></picture></div>
                    <div className="c c-r"><picture><source srcSet="/assets/img/w5.webp" type="image/webp" /><img src="/assets/img/w5.jpg" width="160" height="213" loading="lazy" decoding="async" alt="" /></picture></div>
                    <div className="c-main"><picture><source srcSet="/assets/img/w3.webp" type="image/webp" /><img src="/assets/img/w3.jpg" width="285" height="380" loading="lazy" decoding="async" alt="" /></picture></div>
                  </div>
                </article>

                <article className="diff-card">
                  <div className="diff-text">
                    <h3>72시간, 충분히 살펴보세요.</h3>
                    <p>프로필을 천천히 읽고 [제안하기] 또는 [패스]를 골라요.</p>
                  </div>
                  <div className="diff-visual v-timer" aria-hidden="true">
                    <span className="lb">선택 마감까지</span>
                    <span className="tm">71:59:42</span>
                    <div className="bt"><span>패스</span><span className="on">제안하기</span></div>
                  </div>
                </article>

                <article className="diff-card">
                  <div className="diff-text">
                    <h3>서로 원할 때만, 대화.</h3>
                    <p>두 분 모두 제안했을 때만 매칭되고 대화가 열려요.</p>
                  </div>
                  <div className="diff-visual v-chat" aria-hidden="true">
                    <div className="b in">안녕하세요, 제안 주셔서 반가웠어요.</div>
                    <div className="b out">저도요. 주말 잘 보내셨어요?</div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* 서류 검증 */}
          <section className="safety" id="safety" aria-labelledby="safety-title">
            <div className="sec-head">
              <span className="eyebrow">서류 검증</span>
              <h2 id="safety-title">안전한 만남을 위해<br />서류로 꼼꼼하게 확인해요</h2>
            </div>
            <div className="doc-grid">
              <article className="doc-card">
                <DocIcon />
                <div className="doc-tx">
                  <h3>신원 확인</h3>
                  <p>실명과 나이가 프로필과 같은지 확인해요.</p>
                </div>
                <span className="doc-chip">휴대폰 본인인증 · 신분증</span>
              </article>
              <article className="doc-card">
                <DocIcon />
                <div className="doc-tx">
                  <h3>혼인 이력 확인</h3>
                  <p>현재 혼인 중이 아닌 돌싱인지 확인해요.</p>
                </div>
                <span className="doc-chip">혼인관계증명서(상세)</span>
              </article>
              <article className="doc-card">
                <DocIcon />
                <div className="doc-tx">
                  <h3>직장 확인</h3>
                  <p>프로필에 적은 직업과 직장이 맞는지 확인해요.</p>
                </div>
                <span className="doc-chip">재직증명서 · 사업자등록증</span>
              </article>
            </div>
          </section>

          {/* FAQ (디자인 초기 상태: 첫 번째 질문 펼침, 한 번에 하나만 열림 — 동작은 /assets/main.js) */}
          <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="wrap">
              <h2 id="faq-title">자주 묻는 질문</h2>
              <div className="faq-list">
                {FAQ.map(({ q, a }, i) => {
                  const n = i + 1;
                  return (
                    <div className="faq-item" key={n}>
                      <h3><button className="faq-q" type="button" aria-expanded={i === 0 ? 'true' : 'false'} aria-controls={`faq-a${n}`} id={`faq-q${n}`}>{q}<Chevron /></button></h3>
                      <p className="faq-a" id={`faq-a${n}`} role="region" aria-labelledby={`faq-q${n}`} hidden={i !== 0}>{a}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 다운로드 — 실제 이동 여부는 /assets/main.js 의 IS_RELEASED 스위치가 정한다 */}
          <section className="download" id="download" aria-labelledby="download-title">
            <div className="container">
              <picture><source srcSet="/assets/img/loveat-logo-160.webp" type="image/webp" /><img className="download-logo" src="/assets/img/loveat-logo-160.png" width="80" height="80" loading="lazy" decoding="async" alt="러브앳 앱 아이콘" /></picture>
              <h2 id="download-title">지금 바로 시작하세요</h2>
              <div className="stores">
                <a className="store js-store" data-store="ios" href={APP_STORE_URL} aria-label="App Store에서 다운로드">
                  <svg width="22" height="26" viewBox="0 0 22 26" fill="#fff" aria-hidden="true"><path d="M18.2 13.8c0-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.5-2-.2-3.8 1.1-4.8 1.1-1 0-2.5-1.1-4.1-1.1-2.1 0-4.1 1.3-5.2 3.2-2.2 3.8-.6 9.5 1.6 12.6 1.1 1.5 2.3 3.2 3.9 3.2 1.6-.1 2.2-1 4.1-1 1.9 0 2.4 1 4.1 1 1.7 0 2.8-1.5 3.8-3.1 1.2-1.8 1.7-3.5 1.7-3.6 0 0-3.2-1.3-3.2-5zM15.1 4.4c.9-1.1 1.5-2.5 1.3-4-1.3.1-2.8.9-3.7 1.9-.8.9-1.5 2.4-1.3 3.9 1.4.1 2.8-.7 3.7-1.8z" /></svg>
                  <span className="store-tx"><span className="s">Download on the</span><span className="b">App Store</span></span>
                </a>
                {/* TODO: Android 출시 후 Google Play 링크로 교체 */}
                <a className="store js-store" data-store="android" href="#" aria-label="Google Play에서 받기">
                  <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden="true"><path d="M1 1.2L12.3 12 1 22.8c-.4-.2-.6-.7-.6-1.2V2.4c0-.5.2-1 .6-1.2z" fill="#4AC3F3" /><path d="M15.8 8.5L12.3 12 1 1.2c.3-.2.8-.2 1.3.1l13.5 7.2z" fill="#3DDC84" /><path d="M15.8 15.5L2.3 22.7c-.5.3-1 .3-1.3.1L12.3 12l3.5 3.5z" fill="#F0453C" /><path d="M20.3 13.3l-4.5 2.2-3.5-3.5 3.5-3.5 4.5 2.2c1 .6 1 2 0 2.6z" fill="#FFCC00" /></svg>
                  <span className="store-tx"><span className="s">GET IT ON</span><span className="b">Google Play</span></span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-top">
              <span className="footer-brand"><picture><source srcSet="/assets/img/loveat-logo-80.webp" type="image/webp" /><img src="/assets/img/loveat-logo-80.png" width="30" height="30" loading="lazy" decoding="async" alt="" /></picture><span>Love at</span></span>
              <nav className="footer-nav" aria-label="하단 메뉴">
                <a href="/terms">이용약관</a>
                <a className="strong" href="/privacy">개인정보 처리방침</a>
                {/* TODO: 커뮤니티 가이드라인 페이지 생기면 링크 연결 */}
                <a href="#">커뮤니티 가이드라인</a>
                {/* TODO: 고객센터(문의 채널) 정해지면 링크 연결 */}
                <a href="#">고객센터</a>
                <a href="/guide/">돌싱 만남 가이드</a>
              </nav>
            </div>
            <div className="footer-line"></div>
            <p className="footer-info">{`운영: 김시윤 · 문의: ${CONTACT_EMAIL}`}<br />© 2026 러브앳</p>
          </div>
        </footer>
      </div>

      <div className="toast" id="toast" role="status" aria-live="polite"></div>
      <script src="/assets/main.js" defer></script>
    </>
  );
}
