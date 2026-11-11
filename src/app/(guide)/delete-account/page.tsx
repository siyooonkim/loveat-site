import type { Metadata } from 'next';
import { metadata as accountDeletionMetadata } from '../account-deletion/page';

/**
 * /delete-account/ — Google Play 계정 삭제 URL 로 쓸 수 있는 같은 주소.
 * 본문은 /account-deletion/ 한 곳에서만 고친다(내용이 갈라지지 않게 그 페이지를 그대로 보여 준다).
 */
export const metadata: Metadata = accountDeletionMetadata;

export { default } from '../account-deletion/page';
