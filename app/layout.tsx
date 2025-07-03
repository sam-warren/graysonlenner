import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grayson Lenner | Victoria, BC Musician | Booking & Events",
  description: "Book Grayson Lenner for your venue. Victoria, BC musician with acoustic guitars, harmonies, and captivating melodies. Latest single 'Lost Hearts' available now.",
  keywords: "Grayson Lenner, Victoria BC musician, acoustic folk pop, Lost Hearts, booking, live music, venues",
  openGraph: {
    title: "Grayson Lenner | Victoria, BC Musician",
    description: "Book Grayson Lenner for your venue. Authentic folk-pop with 800+ monthly listeners.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
