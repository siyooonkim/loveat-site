import type { Metadata } from 'next';
import LegalRedirect from '@/components/LegalRedirect';

const TO = 'https://siyooonkim.github.io/loveat-legal/terms.html';

export const metadata: Metadata = {
  title: '이용약관 | 러브앳',
  alternates: { canonical: TO },
};

export default function Page() {
  return <LegalRedirect to={TO} label="이용약관" />;
}
