'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { PlusIcon, PencilIcon, Save } from 'lucide-react';
import { TripPackingList } from '@/app/trip/[tripId]/edit/_components/TripPackingList';
import { AddItemDialog } from '@/app/trip/[tripId]/edit/_components/AddItemDialog';
import { AddCategoryDialog } from '@/app/trip/[tripId]/edit/_components/AddCategoryDialog';
import { Trip } from '@/features/trip/types';
import { Input } from '@/components/ui/input';

// Mock data for development and preview
const MOCK_TRIP: Trip = {
  id: 'mock-trip-1',
  name: 'Mountain Adventure',
  createdAt: new Date().toISOString(),
  location: 'Paris, France',
  startDate: '2025-06-01',
  endDate: '2025-06-07',
  items: [
    { id: 'item-1', name: 'T-shirts', category: 'Clothing', quantity: 5, essential: false },
    { id: 'item-2', name: 'Pants', category: 'Clothing', quantity: 2, essential: true },
    { id: 'item-3', name: 'Underwear', category: 'Clothing', quantity: 7, essential: true },
    { id: 'item-4', name: 'Socks', category: 'Clothing', quantity: 7, essential: true },
    { id: 'item-5', name: 'Light jacket', category: 'Clothing', quantity: 1, essential: true },
    { id: 'item-6', name: 'Toothbrush', category: 'Toiletries', quantity: 1, essential: true },
    { id: 'item-7', name: 'Toothpaste', category: 'Toiletries', quantity: 1, essential: true },
  ],
};

/**
 * Trip Edit Page that displays the packing list organized by categories
 */
export default function TripEditPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  // Get trip details from store
  const trips = useTripStore((state) => state.trips);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const storeTrip = trips.find((t) => t.id === tripId);

  // Use mock data if no trip is found
  const trip = storeTrip || MOCK_TRIP;

  // Add mock trip to store if needed (for development)
  useEffect(() => {
    if (!storeTrip) {
      updateTrip(MOCK_TRIP);
    }
    setTitleValue(trip.name);
  }, [storeTrip, updateTrip, trip.name]);

  const handleSaveTitle = () => {
    if (titleValue.trim() !== '') {
      updateTrip({
        ...trip,
        name: titleValue,
      });
    }
    setIsEditingTitle(false);
  };

  const handleSaveTrip = () => {
    // Save trip to store
    updateTrip(trip);
    // Navigate to trips page
    router.push('/trips');
  };

  // Format dates for display
  const formatDateRange = () => {
    if (!trip.startDate || !trip.endDate) return '';

    const startDate = new Date(trip.startDate);
    const endDate = new Date(trip.endDate);

    // If dates are invalid, return empty string
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    if (
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      // Same month and year: "June 1-7, 2025"
      return `${startDate.toLocaleDateString('en-US', { month: 'long' })} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`;
    } else {
      // Different months: "June 30 - July 5, 2025"
      return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${endDate.getFullYear()}`;
    }
  };

  return (
    <div>
      {/* Navbar with bottom border - wider than content */}
      <div className="border-b border-gray-200 mb-6 px-6 py-4">
        <div className="flex justify-between items-center max-w-[95%] mx-auto">
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className="w-64"
                  autoFocus
                  onBlur={handleSaveTitle}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold font-serif">{trip.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-sm flex items-center gap-1"
              onClick={handleSaveTrip}
            >
              <Save className="h-4 w-4" />
              Save Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area - narrower than navbar */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Location/Date and Add Item row */}
        <div className="flex justify-between items-center mb-8">
          <div>
            {trip.location && <h2 className="text-lg font-medium font-serif">{trip.location}</h2>}
            {trip.startDate && trip.endDate && (
              <p className="text-sm text-gray-600">{formatDateRange()}</p>
            )}
          </div>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsAddItemOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add Item
          </Button>
        </div>

        <TripPackingList tripId={tripId} />

        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-6 border-dashed"
            onClick={() => setIsAddCategoryOpen(true)}
          >
            <PlusIcon className="h-4 w-4" />
            Add New Category
          </Button>
        </div>

        <AddItemDialog
          isOpen={isAddItemOpen}
          onClose={() => setIsAddItemOpen(false)}
          tripId={tripId}
        />

        <AddCategoryDialog
          isOpen={isAddCategoryOpen}
          onClose={() => setIsAddCategoryOpen(false)}
          tripId={tripId}
        />
      </div>
    </div>
  );
}
