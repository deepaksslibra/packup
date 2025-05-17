'use client';

import { useParams } from 'next/navigation';
import TripEditor from './_components/TripEditor';

/**
 * Trip Editing Page that gets the tripId from the URL params
 */
export default function TripEditingPage() {
  const params = useParams();
  const tripId = params.tripId as string;

  return <TripEditor tripId={tripId} />;
}
