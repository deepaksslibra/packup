import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PackUp - Never Forget Essential Travel Items Again',
  description:
    'Create AI-powered packing lists customized for your destination, trip length, and activities. Travel smarter with PackUp.',
  generator: 'Next.js',
  applicationName: 'PackUp',
  keywords: ['travel', 'packing', 'trips', 'smart packing', 'travel planning', 'packing list'],
  authors: [{ name: 'PackUp Team' }],
  metadataBase: new URL('https://packup-two.vercel.app'),
  openGraph: {
    title: 'PackUp - Never Forget Essential Travel Items Again',
    description:
      'Create AI-powered packing lists customized for your destination, trip length, and activities. Travel smarter with PackUp.',
    url: 'https://packup-two.vercel.app',
    siteName: 'PackUp',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/781721c9-4028-45c6-b385-e8a8a2bbd374.png?token=ZaOIUQEqyb6Gypn1RCQ9iFipEp5xkIp_9_R0TynudOg&height=961&width=1200&expires=33283600317',
        width: 1200,
        height: 961,
        alt: 'PackUp - Never Forget Essential Travel Items Again',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackUp - Never Forget Essential Travel Items Again',
    description:
      'Create AI-powered packing lists customized for your destination, trip length, and activities. Travel smarter with PackUp.',
    images: [
      'https://opengraph.b-cdn.net/production/images/781721c9-4028-45c6-b385-e8a8a2bbd374.png?token=ZaOIUQEqyb6Gypn1RCQ9iFipEp5xkIp_9_R0TynudOg&height=961&width=1200&expires=33283600317',
    ],
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
