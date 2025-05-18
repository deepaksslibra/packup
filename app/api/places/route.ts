import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'Input parameter is required' }, { status: 400 });
  }

  try {
    // Call the Google Places Autocomplete API
    const response = await fetch(
      `${GOOGLE_PLACES_API_BASE_URL}/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Google Places API:', error);
    return NextResponse.json({ error: 'Failed to fetch place suggestions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { placeId } = await request.json();

    if (!placeId) {
      return NextResponse.json({ error: 'placeId is required' }, { status: 400 });
    }

    // Call the Google Places Details API to get place details
    const response = await fetch(
      `${GOOGLE_PLACES_API_BASE_URL}/details/json?place_id=${placeId}&fields=formatted_address,name,geometry&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Places API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Google Places API:', error);
    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 });
  }
}
