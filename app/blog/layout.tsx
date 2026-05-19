import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Travel Guides | Yavigo',
  description: 'Expert tips, visa guides, and travel stories to help you plan your next international adventure.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
