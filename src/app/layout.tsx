import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artisana Bakery by Mohfood',
  description: 'Handcrafted luxury bakes in Lagos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
