import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PackUp - Smart Travel Packing Lists',
  description: 'PackUp helps you create perfect AI-powered packing lists for any trip. Never forget essential items again.',
  generator: 'Next.js',
  applicationName: 'PackUp',
  keywords: ['travel', 'packing', 'trips', 'smart packing', 'travel planning', 'packing list'],
  authors: [{ name: 'PackUp Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://packup.travel'),
  openGraph: {
    title: 'PackUp - Never Forget Essential Travel Items Again',
    description: 'Create AI-powered packing lists customized for your destination, trip length, and activities. Travel smarter with PackUp.',
    url: 'https://packup.travel',
    siteName: 'PackUp',
    images: [
      {
        url: '/og.png', 
        width: 1200,
        height: 630,
        alt: 'PackUp - Smart Travel Packing Lists',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackUp - Smart Travel Packing Lists',
    description: 'AI-powered packing lists for any destination. Travel confidently with PackUp.',
    images: ['/og.png'],
    creator: '@packupapp',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
