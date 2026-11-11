import type { Metadata } from 'next';
import { GuideFooter, GuideHeader } from '@/components/GuideChrome';
import JsonLd from '@/components/JsonLd';
import { breadcrumb } from '@/components/ArticleLd';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '계정 삭제(탈퇴) 안내 | 러브앳',
  description: '러브앳 계정을 삭제(탈퇴)하는 방법과, 탈퇴 후 삭제되는 정보·보관되는 정보와 보관 기간을 안내해요.',
  alternates: { canonical: '/account-deletion/' },
  openGraph: {
    type: 'article',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    url: '/account-deletion/',
    title: '계정 삭제(탈퇴) 안내 | 러브앳',
    description: '러브앳 계정을 삭제하는 방법과 삭제·보관되는 정보를 안내해요.',
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image' },
};

/** 계정 삭제 안내(Google Play 데이터 삭제 URL) — 기존 정적 페이지 본문 그대로 */
export default function AccountDeletionPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          ...breadcrumb([
            { name: '러브앳', path: '/' },
            { name: '계정 삭제(탈퇴) 안내', path: '/account-deletion/' },
          ]),
        }}
      />
      <GuideHeader />

      <main id="main" className="article">
          <h1>계정 삭제(탈퇴) 안내</h1>
          <p className="intro">돌싱 만남 앱 <strong>러브앳(Love at)</strong>의 계정을 삭제하는 방법을 안내해요. 러브앳은 김시윤이 운영해요. 앱에서 바로 탈퇴할 수 있고, 앱을 쓸 수 없다면 이메일로 삭제를 요청할 수도 있어요.</p>
          <ul className="toc">
            <li><a href="#in-app">1. 앱에서 탈퇴하기</a></li>
            <li><a href="#request">2. 앱 없이 삭제 요청하기</a></li>
            <li><a href="#deleted">3. 탈퇴하면 바로 삭제되는 정보</a></li>
            <li><a href="#retained">4. 탈퇴 후에도 보관되는 정보와 기간</a></li>
          </ul>
      
          <article id="in-app">
            <h2>앱에서 탈퇴하기</h2>
            <p>탈퇴는 회원 상태와 상관없이(가입 중, 심사 대기, 반려, 이용 중 모두) 언제든 할 수 있어요.</p>
            <h3>가입을 마친 회원</h3>
            <ul>
              <li>앱 아래쪽 <strong>내 정보</strong> 탭을 눌러 <strong>설정</strong> 화면으로 가요.</li>
              <li>화면 맨 아래 <strong>탈퇴</strong>를 눌러요.</li>
              <li>안내 내용을 확인하고 <strong>탈퇴하기</strong>를 눌러요.</li>
              <li>"정말 탈퇴할까요?" 확인 창에서 한 번 더 <strong>탈퇴하기</strong>를 누르면 끝이에요.</li>
            </ul>
            <h3>아직 가입 중이거나 심사 중인 회원</h3>
            <ul>
              <li>가입 안내, 프로필 작성, 인증 센터, 심사 대기 화면의 오른쪽 위 <strong>계정</strong>을 눌러요.</li>
              <li><strong>탈퇴(계정 삭제)</strong>를 고르고, 확인 창에서 <strong>탈퇴하기</strong>를 눌러요.</li>
            </ul>
            <p>계정은 지우지 않고 일부 정보만 지우고 싶다면, 설정의 <strong>프로필 수정</strong>, <strong>내 Q&amp;A</strong>, <strong>지인 차단</strong>, <strong>회사 차단</strong> 메뉴에서 직접 고치거나 지울 수 있어요.</p>
          </article>
      
          <article id="request">
            <h2>앱 없이 삭제 요청하기</h2>
            <p>앱을 지웠거나 로그인할 수 없다면 이메일로 계정 삭제를 요청해 주세요.</p>
            <ul>
              <li>보낼 곳: <a href="mailto:helploveat@gmail.com?subject=%EB%9F%AC%EB%B8%8C%EC%95%B3%20%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD">helploveat@gmail.com</a></li>
              <li>제목: 러브앳 계정 삭제 요청</li>
              <li>적어 주실 내용: 가입할 때 쓴 로그인 방식(카카오 또는 네이버), 닉네임, 가입한 휴대폰 번호</li>
            </ul>
            <p>본인이 맞는지 확인한 뒤, 요청을 받은 날부터 10일 안에 앱에서 탈퇴할 때와 똑같이 처리하고 결과를 메일로 알려 드려요. 본인 확인을 위해 추가 정보를 여쭤볼 수 있어요.</p>
            <p>열람·정정·삭제 등 다른 권리를 쓰는 방법은 <a href="/privacy/#p11">개인정보처리방침 11. 정보주체의 권리와 행사 방법</a>에서 볼 수 있어요.</p>
          </article>
      
          <article id="deleted">
            <h2>탈퇴하면 바로 삭제되는 정보</h2>
            <ul>
              <li>이름, 닉네임, 이메일, 생년월일, 휴대폰 번호 해시값, 소셜 로그인 식별값</li>
              <li>프로필 항목 전부와 프로필 사진(원본과 축소본)</li>
              <li>인증 서류(심사 전 서류도 바로 삭제)</li>
              <li>Q&amp;A 답변</li>
              <li>푸시 알림 토큰, 로그인 토큰</li>
              <li>지인 차단·회사 차단 목록</li>
              <li>앱 이용 기록(이용 이벤트)</li>
            </ul>
            <p>내가 보낸 채팅 메시지는 "(탈퇴한 회원의 메시지)"로 바뀌고, 진행 중인 소개·매칭·약속은 끝나요. 보유한 제안카드, 패스카드는 탈퇴 후 복구할 수 없어요.</p>
            <p>성별, 가입·탈퇴 일시, 탈퇴 사유는 개인을 알아볼 수 없는 상태로 통계에만 쓸 수 있어요. 상대 회원 쪽 소개·매칭 기록은 회원 번호로만 남고, 탈퇴한 회원의 프로필은 더 이상 보이지 않아요.</p>
          </article>
      
          <article id="retained">
            <h2>탈퇴 후에도 보관되는 정보와 기간</h2>
            <p>아래 정보는 법령이나 부정 이용 방지를 위해 정해진 기간 동안만 보관하고, 기간이 지나면 지워요.</p>
            <h3>휴대폰 인증번호 발송 기록(번호 해시·인증번호 해시)</h3>
            <p>인증·발송 남용 방지를 위해 마지막 발송 후 24시간 보관해요.</p>
            <h3>재가입 제한용 본인 식별 해시값</h3>
            <p>탈퇴 후 30일. 이 기간에는 같은 번호로 다시 가입할 수 없어요.</p>
            <h3>신고·이용 제한 기록</h3>
            <p>회원 번호와 사유만 남기고, 프로필 내용은 남기지 않아요. 탈퇴 후 1년 보관해요. 영구 이용 제한을 받은 회원의 본인 식별 해시값은 제한이 유지되는 동안 보관해요.</p>
            <h3>결제 기록</h3>
            <p>계약·청약철회, 대금 결제·재화 공급 기록은 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 5년 보관해요. 카드 번호 같은 결제 수단 정보는 처음부터 받지 않아요.</p>
            <h3>고객 문의 기록</h3>
            <p>소비자 불만·분쟁 처리 기록은 같은 법에 따라 3년 보관해요.</p>
            <h3>약관 동의 기록</h3>
            <p>동의 사실을 증명하기 위해 탈퇴 후 3년 보관해요.</p>
            <h3>접속 기록</h3>
            <p>IP 주소와 접속 일시는 「통신비밀보호법」에 따라 3개월 보관해요.</p>
            <p>자세한 내용은 <a href="/privacy/#p4">개인정보처리방침 4. 보유 및 이용 기간</a>에서 볼 수 있어요.</p>
          </article>
      
          <div className="back-cta">
            <a className="btn-sm" href="/">러브앳 홈으로</a>
          </div>
        </main>
      <GuideFooter />
    </>
  );
}
