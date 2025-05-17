'use client';

import { useTripStore } from '@/store/tripStore';
import { Trip } from '@/features/trip/types';
import React from 'react';

/**
 * Main Trip Editor UI for editing a trip's packing list.
 * @param {object} props - Component props.
 * @param {string} props.tripId - The ID of the trip to edit.
 */
const TripEditor = ({ tripId }: { tripId: string }) => {
  const trip = useTripStore((state) => state.trips.find((t) => t.id === tripId));

  if (!trip) {
    return <div className="p-4 text-red-500">Trip not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Trip: {trip.name}</h1>
      {/* TODO: Render categories, items, editing controls */}
      <div className="text-gray-500">Trip editing UI coming soon.</div>
    </div>
  );
};

export default TripEditor;
