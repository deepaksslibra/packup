/**
 * Represents a single packing item in a trip's packing list.
 * @property {string} id - Unique identifier for the item.
 * @property {string} name - Name of the item (e.g., "T-shirt").
 * @property {number} quantity - Quantity of the item to pack.
 * @property {string} category - Category of the item (e.g., "Clothing").
 * @property {boolean} essential - Whether the item is marked as essential.
 * @property {string} icon - Lucide icon name for the item.
 * @property {boolean} packed - Whether the item has been packed.
 * @property {string} explanation - AI-generated explanation for why this item is recommended.
 * @property {number} weight - Estimated weight of a single item in grams.
 */
export interface PackingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  essential: boolean;
  icon?: string;
  packed?: boolean;
  explanation?: string;
  weight?: number;
}

/**
 * Trip details for AI packing list generation
 */
export interface TripDetailsForAI {
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
 * Weather information for a trip
 */
export interface TripWeather {
  temperature: string;
  condition: string;
  forecast: string;
  weatherTags?: string[];
}

/**
 * Represents a trip with a packing list.
 * @property {string} id - Unique identifier for the trip.
 * @property {string} name - Name of the trip (e.g., "Paris Trip - June 2025").
 * @property {string} createdAt - ISO string representing when the trip was created.
 * @property {string} location - Location of the trip (e.g., "Paris, France").
 * @property {string} startDate - Start date of the trip in ISO format.
 * @property {string} endDate - End date of the trip in ISO format.
 * @property {PackingItem[]} items - List of packing items for the trip.
 * @property {Object.<string, string>} categoryIcons - Map of category names to icon names.
 * @property {boolean} isLoadingItems - Whether items are currently being loaded.
 * @property {TripDetailsForAI} aiTripDetails - Details for AI packing list generation.
 * @property {TripWeather} weather - Weather information for the trip.
 * @property {string} packingStrategy - Overall strategy for selecting the packing items.
 * @property {string} approximateWeight - Total approximate weight of all items.
 */
export interface Trip {
  id: string;
  name: string;
  createdAt: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  items: PackingItem[];
  categoryIcons?: { [category: string]: string };
  isLoadingItems?: boolean;
  aiTripDetails?: TripDetailsForAI;
  weather?: TripWeather;
  packingStrategy?: string;
  approximateWeight?: string;
}
