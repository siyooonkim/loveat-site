/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages 정적 배포: `next build` 결과가 out/ 에 HTML 로 떨어진다
  output: 'export',
  // 기존 주소(/guide/, /account-deletion/ …)와 같게 끝에 / 를 붙인 폴더형 index.html 로 만든다
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
