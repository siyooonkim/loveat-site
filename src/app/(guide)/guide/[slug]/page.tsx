import MovedToHome, { movedMetadata } from '@/components/MovedToHome';

/**
 * /guide/<글>/ — 가이드 글은 2026-11-26 닫았다(서비스 방향 변경).
 * 예전에 공개했던 글 주소가 404 가 되지 않도록, 같은 주소에 홈으로 보내는 안내 페이지만 만든다.
 */
const CLOSED_GUIDE_SLUGS = [
  'dolsing-dating-app',
  'dating-after-divorce',
  'remarriage-checklist',
  'divorce-alimony-property-basics',
  'divorce-lawyer-consultation',
  'single-parent-dating',
  'dolsing-30s-40s',
  'marriage-agency-vs-app',
];

export const dynamicParams = false;

export function generateStaticParams() {
  return CLOSED_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export const metadata = movedMetadata;

export default MovedToHome;
