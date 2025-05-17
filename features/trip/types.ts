/**
 * Represents a single packing item in a trip's packing list.
 * @property {string} id - Unique identifier for the item.
 * @property {string} name - Name of the item (e.g., "T-shirt").
 * @property {number} quantity - Quantity of the item to pack.
 * @property {string} category - Category of the item (e.g., "Clothing").
 * @property {boolean} essential - Whether the item is marked as essential.
 */
export interface PackingItem {
  id: string;
  name: string;
  quantity: number;
  category: string;
  essential: boolean;
}

/**
 * Represents a trip with a packing list.
 * @property {string} id - Unique identifier for the trip.
 * @property {string} name - Name of the trip (e.g., "Paris Trip - June 2025").
 * @property {string} createdAt - ISO string representing when the trip was created.
 * @property {PackingItem[]} items - List of packing items for the trip.
 */
export interface Trip {
  id: string;
  name: string;
  createdAt: string;
  items: PackingItem[];
}
