import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa Assistance & Requirements | Yavigo – Apply Online',
  description: 'Get expert visa assistance for 180+ destinations. Check eligibility, required documents, processing times, and apply online with Yavigo. 95% approval rate.',
  keywords: 'visa requirements, visa assistance, e-visa, visa application, Schengen visa, UK visa, Dubai visa, USA visa, Canada visa',
  openGraph: {
    title: 'Visa Assistance & Requirements | Yavigo',
    description: 'Expert visa assistance for 180+ destinations. Fast, secure, and fully online.',
    type: 'website',
  },
};

export default function VisaRequirementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
