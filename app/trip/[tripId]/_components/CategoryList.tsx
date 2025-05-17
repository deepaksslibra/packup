'use client';

import React from 'react';
import { PackingItem } from '@/features/trip/types';

/**
 * Renders a list of packing categories and their items.
 * @param {object} props - Component props.
 * @param {Record<string, PackingItem[]>} props.categories - Items grouped by category.
 */
const CategoryList = ({ categories }: { categories: Record<string, PackingItem[]> }) => {
  return (
    <div>
      {/* TODO: Render each category and its items */}
      <div className="text-gray-400">Category list UI coming soon.</div>
    </div>
  );
};

export default CategoryList; 