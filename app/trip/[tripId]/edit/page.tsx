'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { PlusIcon, PencilIcon, Save, MapPin, Calendar, Sun, Shirt } from 'lucide-react';
import { TripPackingList } from '@/app/trip/[tripId]/edit/_components/TripPackingList';
import { AddItemDialog } from '@/app/trip/[tripId]/edit/_components/AddItemDialog';
import { AddCategoryDialog } from '@/app/trip/[tripId]/edit/_components/AddCategoryDialog';
import { Trip } from '@/features/trip/types';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

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
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

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

  // Fetch AI recommendations if needed
  useEffect(() => {
    let isMounted = true;

    async function fetchAIRecommendations() {
      if (trip.isLoadingItems && trip.aiTripDetails) {
        try {
          setIsLoadingRecommendations(true);
          // Simulate some loading time for better UX with skeleton loaders
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Import the server action
          const { generatePackingList } = await import('@/app/actions/generatePackingList');

          // Call the server action directly
          const data = await generatePackingList(trip.aiTripDetails);

          // Only update if component is still mounted
          if (!isMounted) return;

          // Generate category icons mapping from the items
          const categoryIconsMap: Record<string, string> = {};

          // First, collect all unique categories
          const categories = [...new Set(data.items.map((item) => item.category))];

          // Import category icons mapping
          const { categoryIcons: defaultCategoryIcons } = await import(
            '@/features/trip/data/templateItems'
          );

          // Assign icons to categories
          categories.forEach((category) => {
            // Try to find an item with this category that has an icon
            const itemWithIcon = data.items.find((item) => item.category === category && item.icon);

            if (itemWithIcon && itemWithIcon.icon) {
              // If we have an item with an icon, use that for the category
              categoryIconsMap[category] = itemWithIcon.icon;
            } else if (defaultCategoryIcons[category]) {
              // If not, try to use the default icon for this category from our mapping
              categoryIconsMap[category] = defaultCategoryIcons[category];
            } else {
              // If all else fails, use a generic folder icon
              categoryIconsMap[category] = 'Folder';
            }
          });

          // Update the trip
          if (data.items && data.items.length > 0) {
            updateTrip({
              ...trip,
              items: data.items,
              name: data.suggestedTripName || trip.name,
              isLoadingItems: false, // Mark loading as complete
              categoryIcons: categoryIconsMap, // Add the category icons mapping
              // Keep aiTripDetails for displaying trip tips
              weather: data.weather || {
                temperature: '22°C',
                condition: 'Partly Cloudy',
                forecast: 'Expect mild temperatures during your trip',
                weatherTags: ['Mild', 'Pleasant'],
              },
              packingStrategy:
                data.packingStrategy ||
                'This packing list is tailored to your trip details, considering weather conditions, activities, and duration.',
              approximateWeight: data.approximateWeight || 'Unknown',
            });
          } else {
            // If no items returned, mark loading as complete anyway
            updateTrip({
              ...trip,
              isLoadingItems: false,
            });
          }
        } catch (error) {
          console.error('Error generating packing list:', error);
          // If error, mark loading as complete
          if (isMounted) {
            updateTrip({
              ...trip,
              isLoadingItems: false,
            });
          }
        } finally {
          if (isMounted) {
            setIsLoadingRecommendations(false);
          }
        }
      }
    }

    fetchAIRecommendations();

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false;
    };
  }, [trip, updateTrip]);

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

  // Calculate trip duration in days
  const calculateDuration = (startDate?: string, endDate?: string): number => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // If dates are invalid, return 0
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end days
  };

  return (
    <div>
      {/* Mobile-optimized navbar with sticky positioning and responsive sizing */}
      <div className="border-b border-gray-200 mb-4 md:mb-6 px-4 md:px-6 py-3 md:py-4 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center w-full max-w-[95%] mx-auto">
          <div className="flex items-center gap-2 max-w-[70%] md:max-w-none">
            {isEditingTitle ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                  className="w-full md:w-64 text-sm md:text-base"
                  autoFocus
                  onBlur={handleSaveTitle}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-semibold font-serif truncate">{trip.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 flex-shrink-0"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <PencilIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>

          <div className="flex">
            <Button
              variant="outline"
              size="sm"
              className="text-xs md:text-sm flex items-center gap-1 h-8 md:h-9"
              onClick={handleSaveTrip}
            >
              <Save className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Save</span> Trip
            </Button>
          </div>
        </div>
      </div>

      {/* Responsive main content area with proper padding */}
      <div className="max-w-3xl mx-auto px-3 md:px-4">
        {/* AI Recommendation loading state */}
        {trip.isLoadingItems || isLoadingRecommendations ? (
          <>
            <div className="py-4 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Generating AI-powered packing recommendations...</span>
              </div>
              <p className="mt-2 mb-6 text-sm text-gray-600">
                We&apos;re using your trip details and checking weather conditions to create a
                personalized packing list.
              </p>
            </div>

            {/* Weather data placeholder */}
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-4 rounded-lg border border-blue-100 mb-6">
              <div className="animate-pulse h-4 w-16 bg-blue-200 rounded mb-2" />
              <div className="flex space-x-4 items-center mb-3">
                <div className="animate-pulse h-12 w-12 bg-blue-200 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="animate-pulse h-5 w-1/3 bg-blue-200 rounded" />
                  <div className="animate-pulse h-4 w-1/2 bg-blue-200 rounded" />
                </div>
              </div>
              <div className="animate-pulse h-4 w-full bg-blue-200 rounded mb-2" />
              <div className="animate-pulse h-4 w-3/4 bg-blue-200 rounded" />

              {/* Weight placeholder */}
              <div className="mt-4 flex space-x-4 items-center">
                <div className="animate-pulse h-10 w-10 bg-blue-200 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="animate-pulse h-5 w-1/2 bg-blue-200 rounded" />
                  <div className="animate-pulse h-4 w-1/3 bg-blue-200 rounded" />
                </div>
              </div>
            </div>

            {/* Skeleton for categories and items */}
            <div className="space-y-8">
              {/* First category skeleton */}
              <div className="rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse h-5 w-5 bg-gray-200 rounded" />
                    <div className="animate-pulse h-6 w-28 bg-gray-200 rounded" />
                  </div>
                </div>
                <div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="px-4 py-3 flex items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="animate-pulse h-5 w-5 bg-gray-200 rounded mr-3" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second category skeleton */}
              <div className="rounded-lg overflow-hidden bg-white shadow-sm">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="animate-pulse h-5 w-5 bg-gray-200 rounded" />
                    <div className="animate-pulse h-6 w-32 bg-gray-200 rounded" />
                  </div>
                </div>
                <div>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="px-4 py-3 flex items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="animate-pulse h-5 w-5 bg-gray-200 rounded mr-3" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="animate-pulse h-4 w-24 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Responsive trip info card with proper text and element sizing */}
            {trip.startDate && trip.endDate ? (
              <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-6 md:mb-8">
                <div className="flex flex-col space-y-3 md:space-y-4">
                  {/* Location & Date */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h2 className="font-medium text-sm md:text-base">{trip.location}</h2>
                      <div className="flex items-center gap-1 md:gap-2 text-gray-500 text-xs md:text-sm">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{formatDateRange()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weather */}
                  {trip.weather && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <Sun className="h-4 w-4 md:h-5 md:w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="flex items-center flex-wrap gap-1.5 md:gap-2">
                          <span className="font-medium text-sm md:text-base">{trip.weather.temperature}</span>
                          <div className="text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-amber-600 border border-amber-200 bg-amber-50">
                            {trip.weather.condition}
                          </div>
                          {trip.weather.weatherTags?.map((tag, index) => (
                            <div
                              key={index}
                              className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${
                                index === 0
                                  ? 'text-blue-600 border border-blue-200 bg-blue-50'
                                  : 'text-purple-600 border border-purple-200 bg-purple-50'
                              }`}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                        <p className="text-gray-600 text-xs md:text-sm mt-0.5 md:mt-1">{trip.weather.forecast}</p>
                      </div>
                    </div>
                  )}

                  {/* Approximate Weight */}
                  {trip.approximateWeight && (
                    <div className="flex items-start gap-2 md:gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 md:h-5 md:w-5 text-orange-600 mt-0.5 flex-shrink-0"
                      >
                        <path d="M6 18h12" />
                        <path d="M12 8a4 4 0 0 0-2 7.5" />
                        <path d="M12 8a4 4 0 0 1 2 7.5" />
                        <path d="M12 2v6" />
                      </svg>
                      <div>
                        <h2 className="font-medium text-sm md:text-base">Approximate Weight</h2>
                        <p className="text-gray-600 text-xs md:text-sm mt-0.5 md:mt-1">
                          Estimated total packed weight:{' '}
                          <span className="font-semibold">{trip.approximateWeight}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Packing Strategy */}
                  <div className="flex items-start gap-2 md:gap-3">
                    <Shirt className="h-4 w-4 md:h-5 md:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h2 className="font-medium text-sm md:text-base">Packing Strategy</h2>
                      <p className="text-gray-600 text-xs md:text-sm mt-0.5 md:mt-1">
                        {trip.packingStrategy || (
                          <>
                            We&apos;ve recommended items based on your{' '}
                            {trip.aiTripDetails?.tripPurpose || 'trip purpose'}
                            in {trip.location}. The selection prioritizes essentials while remaining
                            compact enough for easy travel.
                            {trip.aiTripDetails?.activities &&
                              trip.aiTripDetails.activities.length > 0 &&
                              ` Special consideration was given to your planned activities: ${trip.aiTripDetails.activities.join(', ')}.`}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Powered by Gemini */}
                  <div className="flex items-center justify-end text-xs md:text-sm text-gray-500">
                    Powered by
                    <Image
                      src="/gemini.svg"
                      alt="Gemini"
                      width={45}
                      height={16}
                      className="ml-1 relative -mt-0.5 mb-[3px]"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Mobile-optimized packing list component */}
            <TripPackingList tripId={tripId} />
          </>
        )}

        {/* Responsive "Add New Category" button with proper sizing */}
        <div className="mt-6 md:mt-8 mb-6 md:mb-8 flex justify-center">
          <Button
            variant="outline"
            className="flex items-center gap-1.5 md:gap-2 rounded-full px-4 md:px-6 py-2 md:py-2.5 border-dashed text-sm md:text-base"
            onClick={() => setIsAddCategoryOpen(true)}
            disabled={trip.isLoadingItems || isLoadingRecommendations}
          >
            <PlusIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Add New Category
          </Button>
        </div>

        {/* Mobile-specific fixed floating action button for adding items */}
        <div className="fixed bottom-6 right-6 md:hidden z-10">
          <Button
            onClick={() => setIsAddItemOpen(true)}
            className="h-12 w-12 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
            disabled={trip.isLoadingItems || isLoadingRecommendations}
          >
            <PlusIcon className="h-5 w-5" />
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
