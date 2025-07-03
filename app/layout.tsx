import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'GRAYSON LENNER',
  description: 'Official website of Grayson Lenner.',
  keywords: 'Grayson Lenner, music, folk pop, indie',
  openGraph: {
    title: 'GRAYSON LENNER',
    description: 'Official website of Grayson Lenner.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
