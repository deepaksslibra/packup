'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PackingItem } from '@/features/trip/types';
import { cn } from '@/lib/utils';

/**
 * Packing page for a trip
 */
export default function TripPackingPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;

  // Get trip details from store
  const trips = useTripStore((state) => state.trips);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const trip = trips.find((t) => t.id === tripId);

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'essential' | 'remaining'>('all');
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for localStorage data
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If trip not found, redirect to trips page
  useEffect(() => {
    if (isClient && !trip) {
      router.push('/trips');
    }
  }, [trip, router, isClient]);

  if (!isClient || !trip) {
    return <div className="p-12 flex justify-center">Loading trip...</div>;
  }

  // Packing stats
  const totalItems = trip.items.length;
  const packedItems = trip.items.filter((item) => item.packed).length;
  const packingPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  // Toggle packed status of an item
  const toggleItemPacked = (itemId: string) => {
    const updatedTrip = {
      ...trip,
      items: trip.items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    };
    updateTrip(updatedTrip);
  };

  // Filter items based on active filter
  const filteredItems = trip.items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'essential') return item.essential;
    if (activeFilter === 'remaining') return !item.packed;
    return true;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, PackingItem[]>
  );

  return (
    <div>
      {/* Navbar with bottom border */}
      <div className="border-b border-gray-200 mb-6 px-6 py-4">
        <div className="flex justify-between items-center max-w-[95%] mx-auto">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.push('/trips')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold font-serif">{trip.name}</h1>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Packing Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">Packing Progress</h2>
            <span className="text-sm font-medium">{packingPercentage}% packed</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${packingPercentage}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className={cn(activeFilter === 'all' ? 'bg-blue-600 hover:bg-blue-700 text-white' : '')}
          >
            All Items
          </Button>
          <Button
            variant={activeFilter === 'essential' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('essential')}
            className={cn(
              activeFilter === 'essential' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
            )}
          >
            Essential Only
          </Button>
          <Button
            variant={activeFilter === 'remaining' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('remaining')}
            className={cn(
              activeFilter === 'remaining' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
            )}
          >
            Still to Pack
          </Button>
        </div>

        {/* Packing List */}
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-lg font-medium">{category}</h3>
              <div className="space-y-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md py-3 px-4 flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={!!item.packed}
                        onChange={() => toggleItemPacked(item.id)}
                        className="h-5 w-5 rounded border-gray-300 mr-3"
                      />
                      <label
                        htmlFor={item.id}
                        className={cn(
                          'font-medium cursor-pointer',
                          item.packed ? 'line-through text-gray-400' : ''
                        )}
                      >
                        {item.name} {item.quantity > 1 ? `(${item.quantity})` : ''}
                      </label>
                    </div>
                    {item.essential && (
                      <span className="text-sm font-medium text-gray-600">Essential</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(groupedItems).length === 0 && (
            <Card className="p-6 text-center text-gray-500">
              No items match your current filter.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
