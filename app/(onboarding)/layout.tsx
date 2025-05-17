/**
 * Layout for the (onboarding) route group. This enables nested layouts (like onboarding/layout.tsx) to be picked up by Next.js.
 * Does not render Navbar or any UI, just passes through children.
 * @param {object} props - The layout props.
 * @param {React.ReactNode} props.children - The page content.
 * @returns {JSX.Element} The group layout.
 */
export default function OnboardingGroupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
