import React from 'react';
import { Button } from '@/components/ui/button';

/**
 * Header for the trip edit screen, showing trip name, rename button, and summary.
 * @param {object} props - Component props.
 * @param {string} props.tripName - The name of the trip.
 * @param {() => void} props.onRenameClick - Handler for rename button click.
 * @param {number} props.totalItems - Total number of items in the trip.
 * @param {number} props.totalCategories - Number of categories in the trip.
 */
const TripEditHeader = ({
  tripName,
  onRenameClick,
  totalItems,
  totalCategories,
}: {
  tripName: string;
  onRenameClick: () => void;
  totalItems: number;
  totalCategories: number;
}) => {
  return (
    <header className="flex flex-col gap-2 mb-8">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex-1 truncate">{tripName}</h1>
        <Button size="sm" variant="outline" onClick={onRenameClick} aria-label="Rename trip">Rename</Button>
      </div>
      <div className="text-gray-500 text-sm flex gap-4">
        <span>{totalItems} items</span>
        <span>{totalCategories} categories</span>
      </div>
    </header>
  );
};

export default TripEditHeader; 