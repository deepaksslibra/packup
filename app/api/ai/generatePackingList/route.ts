import { generatePackingList, TripDetails } from '@/app/actions/generatePackingList';

/**
 * Generates a personalized packing list based on trip details and the master item list
 * @param tripDetails Details about the trip from the questionnaire
 * @returns A list of recommended packing items with explanations
 */
export async function POST(request: Request) {
  try {
    const tripDetails: TripDetails = await request.json();

    const result = await generatePackingList(tripDetails);

    if (result.error) {
      return Response.json({ error: result.error }, { status: 500 });
    }

    return Response.json({
      items: result.items,
      suggestedTripName: result.suggestedTripName,
    });
  } catch (error) {
    console.error('Error in generatePackingList API route:', error);
    return Response.json(
      {
        error: `Failed to generate packing list: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
}
