import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa & Immigration Requirements | Yavigo B2B Partner',
  description: 'Visa and immigration requirements for 100+ destinations. Eligibility, documents, and processing times for travel partners and corporates working with Yavigo.',
  keywords: 'visa requirements, immigration requirements, B2B visa partner, e-visa, visa application, Schengen visa, UK visa, Dubai visa, USA visa, Canada visa',
  openGraph: {
    title: 'Visa & Immigration Requirements | Yavigo',
    description: 'Visa and immigration expertise for 100+ destinations — built for travel and corporate partners.',
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
