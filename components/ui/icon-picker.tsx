'use client';

import React, { useMemo, useState, useEffect } from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';
import Fuse from 'fuse.js';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

type IconProps = {
  size?: string | number;
  weight?: IconWeight;
  color?: string;
  className?: string;
  [key: string]: unknown;
};

type Icons = {
  // the name of the component
  name: string;
  // a more human-friendly name
  friendly_name: string;
  Component: React.ComponentType<IconProps>;
};

export type IconRendererProps = {
  icon: string;
  weight?: IconWeight;
} & React.ComponentPropsWithoutRef<'svg'>;

export const useIconPicker = (
  defaultWeight: IconWeight = 'duotone'
): {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  weight: IconWeight;
  setWeight: React.Dispatch<React.SetStateAction<IconWeight>>;
  icons: Icons[];
} => {
  const allIcons: Icons[] = useMemo(
    () =>
      Object.entries(PhosphorIcons)
        .filter(([name]) => name.endsWith('Icon'))
        .map(([iconName, IconComponent]) => ({
          name: iconName,
          // split the icon name at capital letters, remove "Icon" suffix, and join with a space
          friendly_name:
            iconName
              .replace(/Icon$/, '')
              .match(/[A-Z][a-z]+/g)
              ?.join(' ') ?? iconName,
          Component: IconComponent as React.ComponentType<IconProps>,
        })),
    []
  );

  const [search, setSearch] = useState('');
  const [weight, setWeight] = useState<IconWeight>(defaultWeight);
  const [filteredIcons, setFilteredIcons] = useState<Icons[]>(allIcons);

  // Create a Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(allIcons, {
      keys: ['name', 'friendly_name'],
      threshold: 0.3, // Lower threshold = more strict matching (0.0 = exact match only)
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      shouldSort: true,
      includeScore: true,
    });
  }, [allIcons]);

  // Update search results whenever the search term changes
  useEffect(() => {
    if (!search.trim()) {
      setFilteredIcons(allIcons);
      return;
    }

    // Perform fuzzy search
    const results = fuse.search(search);
    setFilteredIcons(results.map((result) => result.item));
  }, [search, fuse, allIcons]);

  return {
    search,
    setSearch,
    weight,
    setWeight,
    icons: filteredIcons,
  };
};

export const IconRenderer = ({ icon, weight = 'duotone', ...rest }: IconRendererProps) => {
  const IconComponent = PhosphorIcons[
    icon as keyof typeof PhosphorIcons
  ] as React.ComponentType<IconProps>;

  // If icon doesn't exist, use Backpack as fallback
  if (!IconComponent) {
    return <PhosphorIcons.BackpackIcon data-slot="icon" weight={weight} {...rest} />;
  }

  return <IconComponent data-slot="icon" weight={weight} {...rest} />;
};
