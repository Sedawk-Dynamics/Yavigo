import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Yavigo | B2B Visa & Immigration Partnerships',
  description: 'Talk to Yavigo about visa and immigration services for your travel agency, corporate, or consultancy. Dedicated specialist support for partners.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
