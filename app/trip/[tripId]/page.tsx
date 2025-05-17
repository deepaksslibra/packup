import TripEditor from './_components/TripEditor';

/**
 * Trip Editing Page
 * @param {object} props - The page props.
 * @param {object} props.params - Route parameters.
 * @param {string} props.params.tripId - The ID of the trip to edit.
 */
export default function TripEditingPage({ params }: { params: { tripId: string } }) {
  return <TripEditor tripId={params.tripId} />;
} 