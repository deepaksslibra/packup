'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current viewport matches a media query
 * @param query The media query to check
 * @returns A boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set initial value on mount
    const media = window.matchMedia(query);
    setMatches(media.matches);

    // Create event listener for changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    media.addEventListener('change', listener);

    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
