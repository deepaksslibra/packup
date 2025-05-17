'use client';

import { redirect } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useEffect } from 'react';

/**
 * Root page that redirects based on onboarding status.
 * Redirects to dashboard if onboarding is complete, otherwise to onboarding.
 */
export default function Home() {
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);
  
  useEffect(() => {
    // Use client-side redirect to avoid hydration issues
    if (hasCompletedOnboarding) {
      // Redirect to dashboard or trips page when we have it
      // For now, still go to onboarding
      window.location.href = '/onboarding';
    } else {
      window.location.href = '/onboarding';
    }
  }, [hasCompletedOnboarding]);
  
  // Return null while redirect happens
  return null;
}
