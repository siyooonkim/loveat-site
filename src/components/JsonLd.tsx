/** 구조화 데이터(JSON-LD). `<` 를 이스케이프해 </script> 로 끊기지 않게 한다. */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
