import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Yavigo - Apply for Visa',
  description: 'Get in touch with Yavigo for visa assistance and travel solutions. 24/7 support available.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
