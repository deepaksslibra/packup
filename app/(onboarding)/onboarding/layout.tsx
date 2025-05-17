import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Onboarding | PackUp',
  description: 'Personalized onboarding for PackUp',
};

/**
 * Custom layout for onboarding routes that hides the Navbar.
 * Mirrors the root layout but omits the Navbar for a distraction-free onboarding experience.
 * @param {object} props - The layout props.
 * @param {React.ReactNode} props.children - The page content.
 * @returns {JSX.Element} The onboarding layout without Navbar.
 */
export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
