import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant_Garamond, Montserrat } from 'next/font/google';
import { TrayProvider } from '@/context/TrayContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Artisana Bakery by Mohfood — Baked With Obsession',
  description: 'Handcrafted luxury bakes in Lagos. Decadent dark chocolate cake, warm banana loaves, clean keto line, and circular upcycled coconut pantry staples.',
  keywords: ['Bakery Lagos', 'Banana Bread Lagos', 'Chocolate Cake Lagos', 'Keto Bakery Lagos', 'Artisana Bakery', 'Mohfood'],
  openGraph: {
    title: 'Artisana Bakery by Mohfood',
    description: 'Baked With Obsession. Made fresh daily in Lagos with zero preservatives.',
    type: 'website',
    locale: 'en_NG',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A3A2A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="font-sans antialiased selection:bg-[#9E1B32] selection:text-white">
        <TrayProvider>{children}</TrayProvider>
      </body>
    </html>
  );
}
