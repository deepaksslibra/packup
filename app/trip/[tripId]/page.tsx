"use client";

import { redirect } from 'next/navigation';
import { useParams } from 'next/navigation';

/**
 * Main Trip Page - redirects to the edit view by default
 */
export default function TripPage() {
  const params = useParams();
  const tripId = params.tripId as string;

  // Redirect to the edit page by default
  redirect(`/trip/${tripId}/edit`);
}
