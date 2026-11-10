/**
 * next build 뒤(out/)에 실행 — Next.js 클라이언트 런타임(React 하이드레이션 JS)을 HTML 에서 걷어낸다.
 *
 * 왜: 이 사이트는 React 클라이언트 컴포넌트가 하나도 없는 순수 정적 페이지다(인터랙션은 /assets/main.js).
 *     그런데 App Router 는 페이지마다 약 130KB(gzip) JS 와 본문을 한 번 더 담은 RSC 데이터를 붙인다.
 *     모바일 LCP 가 정적 HTML 때보다 1~2초 늦어져서, 기존 정적 사이트와 같은 무게로 되돌린다.
 *
 * 안전장치: src/ 에 'use client' 가 생기면(클라이언트 컴포넌트를 쓰기 시작하면) 이 단계는 아무것도 지우지 않고 끝난다.
 * 그때는 이 스크립트를 package.json 의 postbuild 에서 빼면 된다.
 */
import { readdirSync, readFileSync, writeFileSync, statSync, rmSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const OUT = 'out';
const SRC = 'src';

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const usesClient = walk(SRC).some((f) => /\.(t|j)sx?$/.test(f) && /^\s*['"]use client['"]/m.test(readFileSync(f, 'utf8')));
if (usesClient) {
  console.log('[strip-next-runtime] src/ 에 "use client" 가 있어 런타임을 그대로 둡니다.');
  process.exit(0);
}

const PATTERNS = [
  /<script src="\/_next\/[^"]*"[^>]*><\/script>/g, // 런타임 청크·polyfill
  /<link rel="preload" as="script"[^>]*href="\/_next\/[^"]*"[^>]*\/>/g, // 청크 preload
  /<script id="_R_">[\s\S]*?<\/script>/g, // 번들러 부트스트랩
  /<script>\(?self\.__next_f[\s\S]*?<\/script>/g, // RSC 데이터(본문 중복)
];

let pages = 0;
let saved = 0;
for (const f of walk(OUT)) {
  if (f.endsWith('.html')) {
    const before = readFileSync(f, 'utf8');
    let html = before;
    for (const re of PATTERNS) html = html.replace(re, '');
    if (/\/_next\/|__next_f/.test(html)) throw new Error(`[strip-next-runtime] ${f} 에 Next 런타임 흔적이 남았어요. 패턴을 확인하세요.`);
    writeFileSync(f, html);
    pages += 1;
    saved += before.length - html.length;
  } else if (f.endsWith('.txt') && (basename(f) === 'index.txt' || basename(f).startsWith('__next.'))) {
    rmSync(f); // 클라이언트 내비게이션용 RSC 파일 — 런타임이 없으니 쓰지 않는다 (robots.txt 는 남김)
  }
}
if (existsSync(join(OUT, '_next'))) rmSync(join(OUT, '_next'), { recursive: true });
console.log(`[strip-next-runtime] HTML ${pages}개에서 런타임 제거 (${Math.round(saved / 1024)}KB 감소), out/_next 삭제`);
