import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GuideFooter, GuideHeader } from '@/components/GuideChrome';
import JsonLd from '@/components/JsonLd';
import { articleLd, breadcrumb } from '@/components/ArticleLd';
import { ARTICLES, getArticle } from '@/lib/articles';
import { OG_IMAGE, SITE_NAME } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const path = `/guide/${a.slug}/`;
  const title = `${a.metaTitle} | ${SITE_NAME}`;
  return {
    title,
    description: a.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      locale: 'ko_KR',
      url: path,
      title,
      description: a.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: '러브앳 – 돌싱을 위한 검증된 소개' }],
      publishedTime: a.datePublished,
      modifiedTime: a.dateModified,
    },
    twitter: { card: 'summary_large_image', title, description: a.description, images: [OG_IMAGE] },
  };
}

const LEGAL_NOTE =
  '이 글은 이해를 돕기 위한 일반 정보이며 법률 자문이 아니에요. 제도와 법령은 바뀔 수 있고 결과는 사정마다 달라요. 구체적인 판단은 변호사나 공공 법률 상담 기관과 상담하세요.';

export default async function GuideArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const path = `/guide/${a.slug}/`;
  const related = a.related.map(getArticle).filter((r) => r !== undefined);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            articleLd({ headline: a.title, description: a.description, path, datePublished: a.datePublished, dateModified: a.dateModified }),
            breadcrumb([
              { name: '러브앳', path: '/' },
              { name: '돌싱 만남 가이드', path: '/guide/' },
              { name: a.title, path },
            ]),
          ],
        }}
      />
      <GuideHeader />

      <main id="main" className="article">
        <h1>{a.title}</h1>
        <p className="intro">{a.intro}</p>
        {a.legal ? <p className="intro"><strong>안내</strong> · {LEGAL_NOTE}</p> : null}
        <ul className="toc">
          {a.sections.map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
          ))}
        </ul>

        {a.sections.map((s) => (
          <article id={s.id} key={s.id}>
            <h2>{s.title}</h2>
            {s.body}
          </article>
        ))}

        <article id="related">
          <h2>함께 읽으면 좋은 글</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}><a href={`/guide/${r.slug}/`}>{r.title}</a></li>
            ))}
            <li><a href="/guide/">돌싱 만남 가이드 전체 보기</a></li>
          </ul>
          {a.legal ? <p>{LEGAL_NOTE}</p> : null}
        </article>

        <div className="back-cta">
          <a className="btn-sm" href="/#download">러브앳 시작하기</a>
        </div>
      </main>

      <GuideFooter />
    </>
  );
}
