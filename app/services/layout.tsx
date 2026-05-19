import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Yavigo B2B Visa & Immigration Services',
  description: "Explore Yavigo's B2B visa and immigration services for travel partners and corporates across 100+ destinations.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
