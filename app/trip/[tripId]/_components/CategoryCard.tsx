import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';

/**
 * Collapsible card for a category in the trip edit screen.
 * @param {object} props - Component props.
 * @param {string} props.categoryName - The name of the category.
 * @param {number} props.itemCount - Number of items in the category.
 * @param {React.ReactNode} props.children - The card body (item rows, add item row).
 */
const CategoryCard = ({
  categoryName,
  itemCount,
  children,
}: {
  categoryName: string;
  itemCount: number;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Card className="mb-8 rounded-2xl shadow-md bg-white overflow-hidden p-0">
      <button
        type="button"
        className="w-full flex items-center justify-between bg-gray-50 px-6 py-4 border-b font-semibold text-lg focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`category-body-${categoryName}`}
      >
        <div className="flex items-center gap-2">
          {/* TODO: Add icon for category if desired */}
          <span>{categoryName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 text-xs ml-2">{itemCount} items</span>
          {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </button>
      {open && (
        <div id={`category-body-${categoryName}`} className="px-0 py-0">
          {children}
        </div>
      )}
    </Card>
  );
};

export default CategoryCard; 