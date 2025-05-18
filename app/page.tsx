'use client';

import { redirect } from 'next/navigation';
import { useOnboardingStore } from '@/store/onboardingStore';
import { useTripStore } from '@/store/tripStore';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Root page that redirects based on user's trips and onboarding status.
 * If user has created trips, redirects to trips page, otherwise to onboarding.
 * Direct requests to /onboarding are always honored.
 */
export default function Home() {
  const hasCompletedOnboarding = useOnboardingStore((state) => state.hasCompletedOnboarding);
  const trips = useTripStore((state) => state.trips);
  const pathname = usePathname();

  useEffect(() => {
    // Only apply redirect logic on the root path
    if (pathname === '/') {
      // If user has trips, go to trips page, otherwise go to onboarding
      if (trips.length > 0) {
        window.location.href = '/trips';
      } else {
        window.location.href = '/onboarding';
      }
    }
    // Note: direct requests to /onboarding or /trips will not be redirected
    // as this component only runs on the root path
  }, [trips, pathname]);

  // Return null while redirect happens
  return null;
}
