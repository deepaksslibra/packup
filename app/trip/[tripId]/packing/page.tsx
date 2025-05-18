'use client';

import { useParams } from 'next/navigation';
import PackingList from './_components/PackingList';
import PackingProgressBar from './_components/PackingProgressBar';
import TripViewNavigation from '@/features/trip/components/TripViewNavigation';

/**
 * Trip Packing Page that allows marking items as packed and shows progress
 */
export default function TripPackingPage() {
  const params = useParams();
  const tripId = params.tripId as string;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Trip Items</h1>

      <TripViewNavigation />

      <PackingProgressBar tripId={tripId} />
      <PackingList tripId={tripId} />
    </div>
  );
}
