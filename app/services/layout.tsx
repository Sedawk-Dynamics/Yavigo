import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Yavigo - Visa & Travel Solutions',
  description: 'Explore our complete range of visa processing, flight booking, and travel services for 180+ destinations.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
