import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Grayson Lenner | Victoria, BC Musician | Booking & Events',
  description:
    "Book Grayson Lenner for your venue. Victoria, BC musician with acoustic guitars, harmonies, and captivating melodies. Latest single 'Lost Hearts' available now.",
  keywords:
    'Grayson Lenner, Victoria BC musician, acoustic folk pop, Lost Hearts, booking, live music, venues',
  openGraph: {
    title: 'Grayson Lenner | Victoria, BC Musician',
    description:
      'Book Grayson Lenner for your venue. Authentic folk-pop with 800+ monthly listeners.',
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
