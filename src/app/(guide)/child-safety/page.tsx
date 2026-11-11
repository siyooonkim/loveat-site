import type { Metadata } from 'next';
import { GuideFooter, GuideHeader } from '@/components/GuideChrome';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: '아동 안전 표준 | 러브앳',
  description: '러브앳의 아동 성착취·학대(CSAE) 금지 정책과 신고·대응 절차, 아동 안전 담당자 연락처를 안내해요.',
  alternates: { canonical: '/child-safety/' },
  openGraph: { type: 'article', siteName: SITE_NAME, locale: 'ko_KR', url: '/child-safety/', title: '아동 안전 표준 | 러브앳' },
};

/** Google Play 아동 안전 표준 선언에 적는 공개 URL. 약관·개인정보처리방침과 같은 문서 레이아웃을 쓴다. */
export default function ChildSafetyPage() {
  return (
    <>
      <GuideHeader />
      <main id="main" className="article">
        <h1>러브앳 아동 안전 표준</h1>
        <p className="intro">시행일: 2026년 11월 11일 · 운영: 러브앳(개인 운영, 대표 김시윤)</p>

        <article>
          <h2 id="c1">1. 이용 대상</h2>
          <p>러브앳은 만 19세 이상 성인만 이용할 수 있는 소개팅 서비스입니다. 가입할 때 휴대폰 본인 확인과 생년월일 확인, 운영자 심사를 거치며, 미성년자로 확인된 계정은 즉시 이용을 제한하고 삭제합니다.</p>
        </article>

        <article>
          <h2 id="c2">2. 아동 성착취·학대(CSAE) 금지</h2>
          <p>러브앳은 아동 성착취·학대(CSAE)와 아동 성착취물(CSAM)을 절대 허용하지 않습니다. 다음 행위는 모두 금지되며, 확인되면 경고 없이 계정을 영구 정지합니다.</p>
          <ul>
            <li>아동·청소년을 성적으로 묘사하거나 착취하는 사진, 영상, 글, 메시지를 올리거나 보내는 행위</li>
            <li>아동·청소년에게 접근하거나 만남을 유도하는 행위(그루밍)</li>
            <li>아동·청소년 대상 성착취물을 요청, 거래, 공유하는 행위</li>
            <li>미성년자가 나이를 속여 가입하거나, 다른 사람이 미성년자를 대신해 가입시키는 행위</li>
          </ul>
        </article>

        <article>
          <h2 id="c3">3. 앱 안에서 신고하는 방법</h2>
          <p>상대 프로필이나 채팅방에서 <strong>신고하기</strong>를 눌러 바로 신고할 수 있습니다. 앱 밖에서는 아래 아동 안전 담당자 이메일로 신고할 수 있습니다. 접수된 신고는 운영자가 직접 확인합니다.</p>
        </article>

        <article>
          <h2 id="c4">4. 발견했을 때의 조치</h2>
          <ol>
            <li>아동 성착취물이나 아동 대상 위해 행위가 확인되면 해당 콘텐츠를 즉시 삭제하고 계정을 영구 정지합니다.</li>
            <li>「아동·청소년의 성보호에 관한 법률」 등 관련 법령에 따라 경찰청 등 수사기관과 관계기관에 신고하고, 수사에 필요한 자료를 법령이 허용하는 범위에서 제공합니다.</li>
            <li>프로필 사진은 공개 전에 운영자가 심사하며, 부적절한 사진은 공개되지 않습니다.</li>
          </ol>
        </article>

        <article>
          <h2 id="c5">5. 관련 법령 준수</h2>
          <p>러브앳은 대한민국의 아동·청소년 보호 관련 법령을 지키며, Google Play의 아동 안전 표준 정책을 준수합니다.</p>
        </article>

        <article>
          <h2 id="c6">6. 아동 안전 담당자</h2>
          <div className="box">
            담당자: 김시윤 (대표)<br />
            이메일: helploveat@gmail.com
          </div>
        </article>
      </main>
      <GuideFooter />
    </>
  );
}
