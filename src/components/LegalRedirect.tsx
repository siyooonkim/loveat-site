/**
 * 자체 도메인 문서로 옮기기 전까지 loveat-legal(GitHub Pages) 문서로 즉시 이동시킨다.
 * TODO: 자체 도메인 문서로 옮기면 이 리다이렉트 페이지를 실제 본문으로 교체
 */
export default function LegalRedirect({ to, label }: { to: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p>러브앳 {label}으로 이동하고 있어요.</p>
      <p><a href={to}>이동하지 않으면 여기를 눌러 주세요</a></p>
    </>
  );
}
