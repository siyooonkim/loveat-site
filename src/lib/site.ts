/** 사이트 공통 값. 주소·문의처·앱 ID 는 여기 한 곳만 고친다. */
export const SITE_URL = 'https://loveat.kr';
export const SITE_NAME = '러브앳';
export const CONTACT_EMAIL = 'helploveat@gmail.com';
export const APP_STORE_ID = '6830739150';
export const APP_STORE_URL = `https://apps.apple.com/kr/app/id${APP_STORE_ID}`;
/**
 * 스토어 버튼 — 주소와 출시 여부는 여기 한 곳만 고친다. (홈 상단·하단 버튼 4개가 모두 이 값을 쓴다)
 * - live: false 이면 버튼은 그대로 보이지만 스토어로 가지 않고 '곧 출시돼요' 안내만 뜬다(깨진 링크 없음).
 * - 출시되면 url 을 채우고 live 를 true 로 바꾼 뒤 배포하면 된다.
 */
export const GOOGLE_PLAY_URL = ''; // TODO: Android 출시 후 입력 (예: https://play.google.com/store/apps/details?id=…)
export const STORES = {
  ios: { url: APP_STORE_URL, live: false },
  android: { url: GOOGLE_PLAY_URL, live: false },
} as const;
export const STORE_SOON_MESSAGE = '곧 출시돼요';
/** 공유 이미지(한강 카페 장면, 1200×630, 글자 없음) — 모든 페이지 공통 */
export const OG_IMAGE = `${SITE_URL}/assets/og.jpg`;
export const OG_IMAGE_ALT = '한강이 보이는 카페 창가에서 마주 앉아 웃는 두 사람';
/** 홈 글꼴(SUIT) 부분 글꼴 — 첫 화면 글자가 늦게 뜨지 않게 미리 받는다 */
export const HOME_FONT = '/assets/fonts/suit-subset.woff2';
export const PRETENDARD_CSS =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';

/**
 * [TODO: 사용자 입력] 검색엔진 소유 확인 값.
 * - 구글 서치 콘솔 → 속성 추가(URL 접두어 https://loveat.kr/) → 'HTML 태그' 방식의 content 값
 * - 네이버 서치어드바이저 → 사이트 등록 → 'HTML 태그' 방식의 content 값
 * 빈 문자열이면 메타 태그를 만들지 않는다. 값을 넣고 다시 배포하면 모든 페이지 <head> 에 들어간다.
 */
export const GOOGLE_SITE_VERIFICATION = '';
export const NAVER_SITE_VERIFICATION = '';

export function verificationMeta() {
  const other: Record<string, string> = {};
  if (NAVER_SITE_VERIFICATION) other['naver-site-verification'] = NAVER_SITE_VERIFICATION;
  return {
    ...(GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : {}),
    ...(Object.keys(other).length ? { other } : {}),
  };
}

export const ORG_ID = `${SITE_URL}/#org`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
