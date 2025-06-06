'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { PlusIcon, PencilIcon, LuggageIcon, Trash2, ChevronDown, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { formatDistance } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

/**
 * Trips page displaying all user trips
 */
export default function TripsPage() {
  const router = useRouter();
  const trips = useTripStore((state) => state.trips);
  const removeTrip = useTripStore((state) => state.removeTrip);
  const [isClient, setIsClient] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);

  // Use this to prevent hydration mismatch since we're using localStorage
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check for and remove trips with zero items
  useEffect(() => {
    if (isClient && trips.length > 0) {
      const emptyTrips = trips.filter((trip) => trip.items.length === 0);
      if (emptyTrips.length > 0) {
        emptyTrips.forEach((trip) => {
          console.log(`Removing empty trip: ${trip.name} (ID: ${trip.id})`);
          removeTrip(trip.id);
        });
      }
    }
  }, [isClient, trips, removeTrip]);

  // Format date range for display
  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return '';

    const start = new Date(startDate);
    const end = new Date(endDate);

    // If dates are invalid, return empty string
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      // Same month and year: "June 1-7, 2025"
      return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
    } else {
      // Different months: "June 30 - July 5, 2025"
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${end.getFullYear()}`;
    }
  };

  // Get relative time (e.g., "2 days ago")
  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
      return '';
    }
  };

  // Calculate packing progress
  const calculatePackingProgress = (trip: (typeof trips)[0]) => {
    const totalItems = trip.items.length;
    if (totalItems === 0) return 0;

    const packedItems = trip.items.filter((item) => item.packed).length;
    return Math.round((packedItems / totalItems) * 100);
  };

  // Navigate to create new trip
  const handleAddTrip = () => {
    router.push('/onboarding');
  };

  // Navigate to edit trip
  const handleEditTrip = (tripId: string) => {
    router.push(`/trip/${tripId}/edit`);
  };

  // Navigate to packing view
  const handleStartPacking = (tripId: string) => {
    router.push(`/trip/${tripId}/packing`);
  };

  // Handle trip deletion
  const handleDeleteTrip = (tripId: string) => {
    setTripToDelete(tripId);
  };

  // Confirm trip deletion
  const confirmDeleteTrip = () => {
    if (tripToDelete) {
      removeTrip(tripToDelete);
      setTripToDelete(null);
    }
  };

  // Cancel trip deletion
  const cancelDeleteTrip = () => {
    setTripToDelete(null);
  };

  if (!isClient) {
    return <div className="p-4 md:p-12 flex justify-center">Loading trips...</div>;
  }

  return (
    <div className="container max-w-5xl mx-auto py-4 md:py-6 px-3 md:px-4">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-serif">Your Trips</h1>
        <Button
          onClick={handleAddTrip}
          className="flex items-center gap-1 md:gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-2 md:px-3"
        >
          <PlusIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          Add Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-6 md:py-8">
          <h2 className="text-lg md:text-xl font-medium text-gray-600 mb-2 md:mb-3 font-serif">
            You don&apos;t have any trips yet
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-4">
            Create your first trip to get started with your packing list
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {trips.map((trip) => {
            const progressPercentage = calculatePackingProgress(trip);

            return (
              <Card key={trip.id} className="flex flex-col border shadow-sm">
                {/* Title and dropdown menu */}
                <CardHeader className="pb-0 pt-2 px-3 md:px-4">
                  <div className="flex justify-between items-start">
                    <div className="w-[85%]">
                      <CardTitle className="text-base md:text-lg break-words">
                        {trip.name}
                      </CardTitle>
                      {trip.startDate && trip.endDate && (
                        <p className="text-xs text-gray-500">
                          {formatDateRange(trip.startDate, trip.endDate)}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 md:h-7 md:w-7">
                          <ChevronDown className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteTrip(trip.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                {/* Progress section */}
                <CardContent className="py-2 px-3 md:px-4">
                  <div className="text-xs text-gray-500 mb-1">Packing progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {trip.items.filter((item) => item.packed).length}/{trip.items.length} items
                    </span>
                    <span className="text-right text-xs font-medium">{progressPercentage}%</span>
                  </div>
                </CardContent>

                {/* Action buttons */}
                <CardFooter className="flex justify-between gap-2 pt-1 pb-2 px-3 md:px-4 mt-auto">
                  <Button
                    variant="outline"
                    className="flex-1 justify-center h-8 md:h-9 text-xs md:text-sm"
                    onClick={() => handleEditTrip(trip.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="flex-1 justify-center gap-1 md:gap-2 px-2 md:px-3 h-8 md:h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm"
                    onClick={() => handleStartPacking(trip.id)}
                  >
                    Pack
                    <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <Dialog open={tripToDelete !== null} onOpenChange={cancelDeleteTrip}>
        <DialogContent className="sm:max-w-[425px] p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg md:text-xl">Delete Trip</DialogTitle>
            <DialogDescription className="text-sm md:text-base">
              Are you sure you want to delete this trip? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={cancelDeleteTrip}
              className="text-xs md:text-sm h-8 md:h-9"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteTrip}
              className="text-xs md:text-sm h-8 md:h-9"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
