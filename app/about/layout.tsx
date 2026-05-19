import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Yavigo | Premium Visa & Travel Solutions',
  description: 'Learn about Yavigo - trusted visa and travel solutions serving 120,000+ travelers worldwide with 95% success rate.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
