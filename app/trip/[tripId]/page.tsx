import { redirect } from 'next/navigation';

/**
 * Main Trip Page - redirects to the edit view by default
 */
export default function TripPage({ params }: { params: { tripId: string } }) {
  const { tripId } = params;
  
  // Redirect to the edit page by default
  redirect(`/trip/${tripId}/edit`);
}
