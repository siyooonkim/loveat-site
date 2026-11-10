/** 사이트 공통 값. 주소·문의처·앱 ID 는 여기 한 곳만 고친다. */
export const SITE_URL = 'https://loveat.kr';
export const SITE_NAME = '러브앳';
export const CONTACT_EMAIL = 'helploveat@gmail.com';
export const APP_STORE_ID = '6830739150';
export const APP_STORE_URL = `https://apps.apple.com/kr/app/id${APP_STORE_ID}`;
export const OG_IMAGE = `${SITE_URL}/assets/og.jpg`;
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
