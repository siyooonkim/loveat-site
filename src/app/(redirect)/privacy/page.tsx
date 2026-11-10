import type { Metadata } from 'next';
import LegalRedirect from '@/components/LegalRedirect';

const TO = 'https://siyooonkim.github.io/loveat-legal/privacy.html';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 러브앳',
  alternates: { canonical: TO },
};

export default function Page() {
  return <LegalRedirect to={TO} label="개인정보처리방침" />;
}
