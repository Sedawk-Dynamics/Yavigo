import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Yavigo | B2B Visa & Immigration Partner',
  description: 'Yavigo is a trusted B2B partner delivering visa and immigration services to travel agencies, corporates, and immigration consultants worldwide.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
