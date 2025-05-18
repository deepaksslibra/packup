'use server';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, Tool } from '@google/generative-ai';
import { PACKING_MASTER_LIST } from '@/lib/packing-items';
import { v4 as uuidv4 } from 'uuid';
import { PackingItem } from '@/features/trip/types';

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
  luggageConstraints?: {
    maxTotalWeight?: number; // in kg
    luggageType?: string[]; // e.g. ["small backpack", "carry-on", "checked bag"]
    weightDistribution?: string; // any additional information about weight distribution
  };
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
export async function generatePackingList(tripDetails: TripDetails): Promise<PackingListResponse> {
  try {
    console.log('Generating packing list with trip details:', JSON.stringify(tripDetails, null, 2));

    // Check if API key is available
    if (!API_KEY) {
      return {
        items: [],
        error:
          'Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable.',
      };
    }

    // Create a flat list of all items from the master list with their categories
    const allItems = PACKING_MASTER_LIST.flatMap((category) =>
      category.items.map((item) => ({
        name: item.name,
        category: category.category,
        icon: item.icon || category.defaultIcon,
        essential: item.essential || false,
        tags: item.tags || [],
      }))
    );

    // Get the generative model with web search capability
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
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
${
  tripDetails.luggageConstraints
    ? `
Luggage Constraints:
${tripDetails.luggageConstraints.maxTotalWeight ? `- Maximum Total Weight: ${tripDetails.luggageConstraints.maxTotalWeight} kg` : ''}
${tripDetails.luggageConstraints.luggageType ? `- Luggage Type: ${tripDetails.luggageConstraints.luggageType.join(', ')}` : ''}
${tripDetails.luggageConstraints.weightDistribution ? `- Weight Distribution: ${tripDetails.luggageConstraints.weightDistribution}` : ''}
`
    : ''
}
`;

    // Create prompt for Gemini with stronger emphasis on weight limits
    const maxWeight = tripDetails.luggageConstraints?.maxTotalWeight
      ? tripDetails.luggageConstraints.maxTotalWeight
      : 5; // Default to 5kg if not specified

    // Define the optimized prompt version (new)
    const optimizedPackingPrompt = `
You are a smart packing assistant helping a traveler create a personalized, space-aware, and weight-optimized packing list using a master item list.

📌 OBJECTIVE:
Create a tailored list of items to pack for a specific trip, using only items from the provided master list, based on:
- Trip location, duration, activities, and weather
- User-defined total max weight limit (in grams)
- Available luggage types and their physical constraints

TRIP DETAILS:
${tripDetailsFormatted}

🧳 LUGGAGE BEHAVIOR:
Pack items based on luggage type:
${
  tripDetails.luggageConstraints?.luggageType
    ?.map((type) => {
      if (type.toLowerCase().includes('backpack'))
        return '- Hand Carry Backpack: Prioritize compact, lightweight, frequently accessed items (e.g. electronics, snacks, daily use). If this is the only luggage prioritise what items will fit';
      if (type.toLowerCase().includes('cabin'))
        return '- Cabin Bag: For stuff which will exceed a backpack but will be too less for a large check in bag';
      if (type.toLowerCase().includes('check-in') || type.toLowerCase().includes('large'))
        return '- Check-in Bag: For bulkier, heavier items (e.g. coats, shoes, extras).';
      return `- ${type}: General items`;
    })
    .join('\n') || '- Default luggage: General items'
}

⚖️ PACKING LOGIC
Use 85–95% of the user's weight allowance. (Example: if ${maxWeight * 1000}g allowed, target ${Math.round(maxWeight * 850)}–${Math.round(maxWeight * 950)}g)

NEVER exceed 100% of total allowed weight

If space or weight is tight:
- Prioritize essential, multi-use, weather-appropriate items
- Limit quantity and focus on high-utility gear
- If needed, only include 1–2 absolutely critical items

If space or weight allows:
- Add comfort items and backups
- Include regionally buyable items if convenient

🛍️ BUYABILITY RULE
Exclude items that are commonly available at the destination UNLESS:
- They are hard to find in that region OR
- There's enough leftover space/weight to include them comfortably

Here is the master list of items to choose from:
${allItems.map((item) => `- ${item.name} (Category: ${item.category})`).join('\n')}

✅ FOR EACH ITEM, RETURN:
{
  "name": "Item Name",
  "quantity": 2,
  "weight": 300, // in grams (per single item)
  "essential": true, // true = must-carry, false = optional/comfort
  "explanation": "Explain why this is included, addressing the traveler directly",
  "category": "Category from the master list"
}

✅ FINAL OUTPUT FORMAT:
{
  "items": [ /* array of selected items */ ],
  "approximateWeight": "${Math.round(maxWeight * 900)} grams", // STRICTLY calculated as sum of (quantity × weight) for all items
  "suggestedTripName": "Fun and fitting name for the trip",
  "weather": {
    "temperature": "Average temperature (°C)",
    "condition": "Clear / Rainy / Cold / Variable etc.",
    "forecast": "One-sentence summary of the trip's weather",
    "weatherTags": ["Cold", "Dry"]
  },
  "packingStrategy": "2–3 sentence summary explaining how you optimized item selection based on weather, activities, space, and weight. Mention excluded buyable items, prioritized essentials, and anything added due to leftover capacity."
}

🔒 HARD CONSTRAINTS:
- Use only items from the master list
- Total calculated weight (approximateWeight) must be mathematically accurate
- Buyable items should only be included if justified by availability, importance, or spare capacity
- Prioritize climate-specific protection if weather is extreme
- Only select what would logically fit in the luggage types given their constraints
- Use a personal tone in explanation, directly addressing the traveler
`;

    // Choose which prompt to use (set to true to use the optimized prompt)
    const useOptimizedPrompt = true;
    const packingPrompt = useOptimizedPrompt
      ? optimizedPackingPrompt
      : `
You are a smart packing assistant helping to create a personalized packing list that MAXIMIZES luggage capacity.
Search the internet for weather information and local conditions for this trip:

${tripDetailsFormatted}

CRITICAL WEIGHT TARGET: You MUST aim to utilize 85-95% of the available ${maxWeight} kg weight allowance.
- DO NOT return a list with less than 85% of the weight allowance utilized
- For larger weight allowances (>15kg): Include extra quantities, comfort items, and contingency supplies
- For medium weight allowances (8-15kg): Include reasonable quantities plus select comfort items
- For small weight allowances (<8kg): Focus on essentials but still aim for 85-95% capacity

CRITICAL SPACE CONSTRAINTS: You MUST consider the physical dimensions and space limitations of the selected luggage:
${tripDetails.luggageConstraints?.luggageType?.map((type) => `- ${type}`).join('\n') || '- Default luggage'}

Consider these luggage-specific constraints:
- Backpack: Prioritize compact, foldable items; avoid bulky/rigid objects; consider packing cubes for organization
- Small Cabin Luggage: Smaller overall volume but can accommodate some rigid items; limited height/width constraints
- Large Check-in Luggage: More volume for bulky items and higher quantities, but still finite space

This is EXTREMELY important: Your primary goal is to utilize the available weight effectively WHILE ensuring items will physically fit in the specified luggage types.

Based on this information, select items from the master packing list below that would be appropriate for this specific trip.
For each selected item, provide:
1. Whether it's essential or optional
2. Recommended quantity (use higher quantities where appropriate to maximize weight usage)
3. An estimated weight per item in grams
4. A personalized, direct explanation written in second person ("you") of why the traveler needs this item

Write explanations in a conversational, personalized tone, addressing the traveler directly, like:
- "You'll need these comfortable shoes as you'll be walking 5+ miles daily in Paris"
- "You should pack 3 of these since you're prone to catching colds in rainy weather"
- "Pack this for your hiking excursion at Mount Fuji, as temperatures drop significantly at higher elevations"

Consider weather conditions, trip duration, activities, local customs, and travel requirements. MAXIMIZE for the ${maxWeight} kg weight limit - aim for at least 85-95% of the available weight capacity. Choose larger quantities and additional comfort items to make efficient use of weight allowance WHILE ENSURING EVERYTHING FITS in the specified luggage.

Here is the master list of items to choose from:
${allItems.map((item) => `- ${item.name} (Category: ${item.category})`).join('\n')}

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
  "packingStrategy": "A concise paragraph (max 2-3 sentences) about the packing approach. Explain how you've MAXIMIZED the list to reach 85-95% of the ${maxWeight} kg weight limit while ensuring everything fits in the ${tripDetails.luggageConstraints?.luggageType?.join(', ') || 'luggage'}. Highlight items you've added for comfort or convenience due to the generous weight allowance."
}

First calculate how much weight you have to work with: ${maxWeight} kg = ${maxWeight * 1000} grams.
Your target is to include items totaling ${Math.round(maxWeight * 850)} - ${Math.round(maxWeight * 950)} grams.
If your first draft is too light, increase quantities or add more comfort items.
DOUBLE-CHECK your calculations before responding.
Only include items from the provided master list. Ensure the category matches exactly what was provided.
Do not include any explanatory text outside the JSON structure.
`;

    // Define the Google Search tool
    const googleSearchTool = {
      googleSearch: {},
    } as Tool;

    // Generate content using Gemini with Google Search grounding, with retry logic
    const fetchGeminiContentWithRetry = async (maxRetries = 2) => {
      let lastError;
      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: packingPrompt }] }],
            generationConfig: {
              temperature: 0.2, // Lower temperature for more factual responses
              maxOutputTokens: 8192, // Increased to allow for more comprehensive responses
            },
            tools: [googleSearchTool],
          });
          return result.response.text();
        } catch (err) {
          lastError = err;
          console.error(`Gemini API attempt ${attempt + 1} failed:`, err);
          if (attempt < maxRetries) {
            // Add a short delay before retrying
            await new Promise((res) => setTimeout(res, 500));
          }
        }
      }
      throw lastError;
    };

    const response = await fetchGeminiContentWithRetry(2);
    console.log('Raw response from Gemini:', response);

    try {
      // Parse the JSON response
      const jsonStartIndex = response.indexOf('{');
      const jsonEndIndex = response.lastIndexOf('}') + 1;

      if (jsonStartIndex >= 0 && jsonEndIndex > jsonStartIndex) {
        const jsonString = response.substring(jsonStartIndex, jsonEndIndex);

        // Attempt to repair potentially malformed JSON
        let repairedJsonString = jsonString;
        try {
          // Try parsing the JSON as-is first
          JSON.parse(jsonString);
        } catch (parseError: unknown) {
          console.log(
            'Initial JSON parsing failed, attempting to repair the JSON'
          );
          // Check for common issues and attempt to repair
          if (
            jsonString.includes('"explanation": "') &&
            parseError && typeof parseError === 'object' && 'message' in parseError &&
            typeof (parseError as { message?: string }).message === 'string' &&
            (parseError as { message: string }).message.includes('position')
          ) {
            // Find potentially incomplete explanation strings
            const regex = /"explanation": "([^"]*?)(?:(?:",)|(?:"\s*}))/g;
            repairedJsonString = jsonString.replace(regex, (match, p1) => {
              // If the explanation ends abruptly, fix it
              if (!match.endsWith('",') && !match.endsWith('"}')) {
                return `"explanation": "${p1}",`;
              }
              return match;
            });
            // Ensure arrays are properly terminated
            repairedJsonString = repairedJsonString.replace(/,\s*}\s*$/g, '}');
            repairedJsonString = repairedJsonString.replace(/,\s*]\s*$/g, ']');
            console.log('Attempted to repair JSON');
          }
        }
        // Try parsing the repaired JSON
        try {
          const packingList = JSON.parse(repairedJsonString);
          // Log the parsed packing list
          console.log(
            'Parsed packing list:',
            JSON.stringify(
              {
                itemCount: packingList.items?.length || 0,
                approximateWeight: packingList.approximateWeight,
                suggestedTripName: packingList.suggestedTripName,
              },
              null,
              2
            )
          );
          // Calculate total weight to verify it matches the response
          let totalWeightGrams = 0;
          packingList.items.forEach((item: { weight?: number; quantity?: number }) => {
            totalWeightGrams += (item.weight || 0) * (item.quantity || 1);
          });
          const totalWeightKg = totalWeightGrams / 1000;
          console.log(
            `Calculated total weight: ${totalWeightKg.toFixed(2)} kg (limit: ${maxWeight} kg)`
          );
          console.log(
            `Weight utilization: ${((totalWeightKg / maxWeight) * 100).toFixed(1)}% of allowance`
          );
          // Check if model's approximateWeight matches our calculation
          if (packingList.approximateWeight) {
            console.log(`Model reported weight: ${packingList.approximateWeight}`);
            console.log(`Actual calculated weight: ${totalWeightKg.toFixed(2)} kg`);
            // Override the model's approximateWeight with our accurate calculation
            packingList.approximateWeight = `${totalWeightKg.toFixed(2)} kg (${Math.round(
              totalWeightGrams
            )} grams, ${((totalWeightKg / maxWeight) * 100).toFixed(1)}% of ${maxWeight}kg limit)`;
          }
          // Verify weight limit compliance - just log a warning but don't trim anymore
          if (totalWeightKg > maxWeight) {
            console.warn(
              `WARNING: Generated packing list exceeds weight limit of ${maxWeight} kg with ${totalWeightKg.toFixed(2)} kg.`
            );
          }
          // Merge the returned items with the master list to ensure we have all the properties
          const enrichedItems: PackingItem[] = packingList.items.map(
            (item: {
              name: string;
              quantity?: number;
              weight: number;
              essential?: boolean;
              category?: string;
              explanation: string;
            }) => {
              const masterItem = allItems.find(
                (mi) => mi.name.toLowerCase() === item.name.toLowerCase()
              );
              // Validate and potentially correct the weight value
              const validatedWeight = validateItemWeight(
                item.name,
                item.category || '',
                item.weight
              );
              if (validatedWeight !== item.weight) {
                console.log(
                  `Corrected weight for "${item.name}" from ${item.weight}g to ${validatedWeight}g`
                );
              }
              if (!masterItem) {
                console.warn(`Item not found in master list: ${item.name}`);
                return {
                  id: uuidv4(),
                  name: item.name,
                  quantity: item.quantity || 1,
                  weight: validatedWeight,
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
                weight: validatedWeight,
                essential: item.essential || false,
                category: item.category || masterItem.category,
                explanation: item.explanation,
                icon: masterItem.icon,
              };
            }
          );
          return {
            items: enrichedItems,
            suggestedTripName: packingList.suggestedTripName,
            weather: packingList.weather,
            packingStrategy: packingList.packingStrategy,
            approximateWeight: packingList.approximateWeight,
          };
        } catch (parseError: unknown) {
          console.error('Error parsing packing list JSON:', parseError, response);
          return {
            items: [],
            error: `Failed to parse packing list data: ${parseError instanceof Error ? parseError.message : String(parseError)}`,
          };
        }
      } else {
        throw new Error('Failed to extract JSON from response');
      }
    } catch (error: unknown) {
      console.error('Error generating packing list:', error);
      return {
        items: [],
        error: `Failed to generate packing list: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  } catch (error) {
    console.error('Error generating packing list:', error);
    return {
      items: [],
      error: `Failed to generate packing list: ${error instanceof Error ? error.message : String(error)}`,
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

/**
 * Validates and normalizes item weights based on item type and category
 * @param itemName Name of the item
 * @param category Category of the item
 * @param weight Weight provided by the model in grams
 * @returns Validated weight in grams
 */
function validateItemWeight(itemName: string, category: string, weight: number): number {
  // If weight is missing, NaN, negative, or unreasonably low, provide a default
  if (!weight || isNaN(weight) || weight <= 0 || weight < 1) {
    // Basic defaults by category
    if (category.toLowerCase().includes('clothing')) return 200;
    if (category.toLowerCase().includes('electronic')) return 300;
    if (category.toLowerCase().includes('toiletries')) return 100;
    return 150; // Generic default
  }

  // Check for unreasonably high weights (likely errors)
  const nameLower = itemName.toLowerCase();

  // Clothing items usually don't exceed 1000g except for heavy outerwear
  if (category.toLowerCase().includes('clothing')) {
    if (
      (nameLower.includes('shirt') ||
        nameLower.includes('t-shirt') ||
        nameLower.includes('tshirt')) &&
      weight > 500
    ) {
      return 200; // T-shirts are typically around 150-250g
    }

    if (nameLower.includes('sock') && weight > 200) {
      return 80; // Socks are typically around 50-100g
    }

    if (nameLower.includes('underwear') && weight > 200) {
      return 100; // Underwear is typically around 50-100g
    }

    if (nameLower.includes('jacket') && weight > 2000 && !nameLower.includes('winter')) {
      return 800; // Regular jackets (not winter) are typically 600-1000g
    }
  }

  // Electronics
  if (category.toLowerCase().includes('electronic')) {
    if (nameLower.includes('charger') && !nameLower.includes('laptop') && weight > 300) {
      return 150; // Phone chargers are typically around 100-200g
    }

    if (nameLower.includes('adapter') && weight > 500) {
      return 200; // Travel adapters are typically around 150-250g
    }
  }

  // Toiletries
  if (category.toLowerCase().includes('toiletries')) {
    if (nameLower.includes('toothbrush') && weight > 100) {
      return 50; // Toothbrushes are typically around 20-50g
    }

    if (nameLower.includes('toothpaste') && weight > 200) {
      return 100; // Travel toothpaste is typically around 50-100g
    }
  }

  // Accessories
  if (nameLower.includes('wallet') && weight > 300) {
    return 150; // Wallets are typically around 100-200g
  }

  // Generic limits for extreme outliers (preventing million gram items)
  if (weight > 10000) {
    // 10kg
    return 5000; // Cap at 5kg for any single item
  }

  // If we got here, the weight is reasonable or we don't have specific rules for this item
  return weight;
}
