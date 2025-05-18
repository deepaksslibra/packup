'use server'

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Tool } from "@google/generative-ai";
import { PACKING_MASTER_LIST } from "@/lib/packing-items";
import { v4 as uuidv4 } from 'uuid';
import { PackingItem } from "@/features/trip/types";

// Initialize the Gemini API with your API key
const API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Trip details from the smart planning questionnaire
 */
export interface TripDetails {
  destination: string;
  startDate: string;
  endDate: string;
  tripPurpose: string;
  activities: string[];
  accommodation: string;
  transportation: string;
  travelParty: string[];
  additionalInfo?: string;
}

/**
 * Weather information from the AI
 */
export interface TripWeather {
  temperature: string;
  condition: string;
  forecast: string;
  weatherTags: string[]; // Tags like "Chilly", "Rainy", etc.
}

/**
 * Response from the AI packing list generator
 */
export interface PackingListResponse {
  items: PackingItem[];
  suggestedTripName?: string;
  weather?: TripWeather;
  packingStrategy?: string;
  approximateWeight?: string; // Total approximate weight of all items
  error?: string;
}

/**
 * Generates a personalized packing list based on trip details and the master item list
 * @param tripDetails Details about the trip from the questionnaire
 * @returns A list of recommended packing items with explanations
 */
export async function generatePackingList(
  tripDetails: TripDetails
): Promise<PackingListResponse> {
  try {
    // Check if API key is available
    if (!API_KEY) {
      return {
        items: [],
        error: 'Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable.'
      };
    }

    // Create a flat list of all items from the master list with their categories
    const allItems = PACKING_MASTER_LIST.flatMap(category => 
      category.items.map(item => ({
        name: item.name,
        category: category.category,
        icon: item.icon || category.defaultIcon,
        essential: item.essential || false,
        tags: item.tags || []
      }))
    );

    // Get the generative model with web search capability
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Format trip details as a string for the prompt
    const tripDuration = calculateDuration(tripDetails.startDate, tripDetails.endDate);
    const tripDetailsFormatted = `
Destination: ${tripDetails.destination}
Trip Dates: ${tripDetails.startDate} to ${tripDetails.endDate} (${tripDuration} days)
Purpose: ${tripDetails.tripPurpose}
Activities: ${tripDetails.activities.join(', ')}
Accommodation: ${tripDetails.accommodation}
Transportation: ${tripDetails.transportation}
Travel Party: ${tripDetails.travelParty.join(', ')}
${tripDetails.additionalInfo ? `Additional Info: ${tripDetails.additionalInfo}` : ''}
`;

    // Create prompt for Gemini
    const packingPrompt = `
You are a smart packing assistant helping to create a personalized packing list. 
Search the internet for weather information and local conditions for this trip:

${tripDetailsFormatted}

Based on this information, select items from the master packing list below that would be appropriate for this specific trip.
For each selected item, provide:
1. Whether it's essential or optional
2. Recommended quantity
3. An estimated weight per item in grams
4. A personalized, direct explanation written in second person ("you") of why the traveler needs this item

Write explanations in a conversational, personalized tone, addressing the traveler directly, like:
- "You'll need these comfortable shoes as you'll be walking 5+ miles daily in Paris"
- "You should pack 3 of these since you're prone to catching colds in rainy weather"
- "Pack this for your hiking excursion at Mount Fuji, as temperatures drop significantly at higher elevations"

Consider weather conditions, trip duration, activities, local customs, and travel requirements. Give great impetus to overall luggage weight and aim to recommend only what's truly necessary. Be conservative with quantities to keep total weight manageable.

Here is the master list of items to choose from:
${allItems.map(item => `- ${item.name} (Category: ${item.category})`).join('\n')}

Format your response as valid JSON with this structure:
{
  "items": [
    {
      "name": "Item Name",
      "quantity": 2,
      "weight": 300, // Estimated weight in grams per single item
      "essential": true,
      "explanation": "Personalized explanation addressing the traveler directly (e.g., 'You'll need this because...')",
      "category": "Category name"
    },
    ...
  ],
  "approximateWeight": "3.2 kg", // Calculated total weight of all items (quantity × individual weight)
  "suggestedTripName": "An engaging name for this trip based on destination and purpose",
  "weather": {
    "temperature": "Average temperature in degrees Celsius",
    "condition": "Brief description of current weather conditions",
    "forecast": "One concise line summarizing the weather for the trip duration",
    "weatherTags": ["Chilly", "Rainy"] // Very concise 1-2 word tags only
  },
  "packingStrategy": "A concise paragraph (max 2-3 sentences) about the packing approach. Emphasize weight considerations and how you've optimized the list to maintain a manageable luggage weight. Use language like 'Lightweight clothing is suggested for hot conditions' or 'Multiple layers are recommended for variable temperatures'."
}

Only include items from the provided master list. Ensure the category matches exactly what was provided.
Do not include any explanatory text outside the JSON structure.
`;

    // Define the Google Search tool
    const googleSearchTool = {
        googleSearch: {}
    } as Tool;

    // Generate content using Gemini with Google Search grounding, with retry logic
    const fetchGeminiContentWithRetry = async (maxRetries = 2) => {
      let lastError;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: packingPrompt }] }],
            generationConfig: {
              temperature: 0.2, // Lower temperature for more factual responses
              maxOutputTokens: 4096,
            },
            tools: [googleSearchTool]
          });
          return result.response.text();
        } catch (err) {
          lastError = err;
          console.error(`Gemini API attempt ${attempt + 1} failed:`, err);
          if (attempt < maxRetries) {
            // Add a short delay before retrying
            await new Promise(res => setTimeout(res, 500));
          }
        }
      }
      throw lastError;
    };

    const response = await fetchGeminiContentWithRetry(2);
    
    try {
      // Parse the JSON response
      const jsonStartIndex = response.indexOf('{');
      const jsonEndIndex = response.lastIndexOf('}') + 1;
      
      if (jsonStartIndex >= 0 && jsonEndIndex > jsonStartIndex) {
        const jsonString = response.substring(jsonStartIndex, jsonEndIndex);
        const packingList = JSON.parse(jsonString);
        
        // Merge the returned items with the master list to ensure we have all the properties
        const enrichedItems: PackingItem[] = packingList.items.map((item: {
          name: string;
          quantity?: number;
          weight: number;
          essential?: boolean;
          category?: string;
          explanation: string;
        }) => {
          const masterItem = allItems.find(mi => mi.name.toLowerCase() === item.name.toLowerCase());
          if (!masterItem) {
            console.warn(`Item not found in master list: ${item.name}`);
            return {
              id: uuidv4(),
              name: item.name,
              quantity: item.quantity || 1,
              weight: item.weight,
              essential: item.essential || false,
              category: item.category,
              explanation: item.explanation,
              icon: 'Backpack', // Default icon if not found
            };
          }
          
          return {
            id: uuidv4(),
            name: item.name,
            quantity: item.quantity || 1,
            weight: item.weight,
            essential: item.essential || false,
            category: item.category || masterItem.category,
            explanation: item.explanation,
            icon: masterItem.icon,
          };
        });

        return {
          items: enrichedItems,
          suggestedTripName: packingList.suggestedTripName,
          weather: packingList.weather,
          packingStrategy: packingList.packingStrategy,
          approximateWeight: packingList.approximateWeight
        };
      } else {
        throw new Error('Failed to extract JSON from response');
      }
    } catch (parseError) {
      console.error('Error parsing packing list JSON:', parseError, response);
      return {
        items: [],
        error: `Failed to parse packing list data: ${parseError instanceof Error ? parseError.message : String(parseError)}`
      };
    }
  } catch (error) {
    console.error('Error generating packing list:', error);
    return {
      items: [],
      error: `Failed to generate packing list: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

/**
 * Calculate trip duration in days
 */
function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Include both start and end days
} 