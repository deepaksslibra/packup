'use client';

import { Card } from '@/components/ui/card';

/**
 * Displays a progress bar showing how much of the trip is packed
 * @param {object} props - Component props
 * @param {string} props.tripId - The ID of the trip
 */
export default function PackingProgressBar({ tripId }: { tripId: string }) {
  // This would come from store in a real implementation
  const totalItems = 10;
  const packedItems = 4;
  const percentage = Math.round((packedItems / totalItems) * 100) || 0;

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Packing Progress</h2>
          <span className="text-sm font-medium">{percentage}% Complete</span>
        </div>
        
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-500">
          {packedItems} of {totalItems} items packed
        </div>
      </div>
    </Card>
  );
} 