'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

// Mock data for initial development
const MOCK_ITEMS = [
  { id: '1', name: 'T-Shirt', category: 'Clothing', quantity: 3, isPacked: true },
  { id: '2', name: 'Toothbrush', category: 'Toiletries', quantity: 1, isPacked: false },
  { id: '3', name: 'Charger', category: 'Electronics', quantity: 2, isPacked: true },
  { id: '4', name: 'Pants', category: 'Clothing', quantity: 2, isPacked: false },
  { id: '5', name: 'Sunglasses', category: 'Accessories', quantity: 1, isPacked: false },
];

// Interface for our items
interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  isPacked: boolean;
}

/**
 * Displays a list of items that can be marked as packed
 * @param {object} props - Component props
 * @param {string} props.tripId - The ID of the trip
 */
export default function PackingList({ tripId }: { tripId: string }) {
  const [items, setItems] = useState<PackingItem[]>(MOCK_ITEMS);

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  const togglePacked = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId 
        ? { ...item, isPacked: !item.isPacked } 
        : item
    ));
    // In a real implementation, this would update the store or call an API
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Packing List</h2>
      
      {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-md font-medium text-gray-600">{category}</h3>
          
          <div className="space-y-2">
            {categoryItems.map((item) => (
              <Card 
                key={item.id} 
                className={`p-4 flex items-center ${item.isPacked ? 'bg-gray-50' : ''}`}
              >
                <label className="flex items-center w-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isPacked}
                    onChange={() => togglePacked(item.id)}
                    className="h-5 w-5 rounded border-gray-300 mr-3"
                  />
                  <div className={item.isPacked ? 'line-through text-gray-500' : ''}>
                    <span className="font-medium">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-sm text-gray-500 ml-2">
                        × {item.quantity}
                      </span>
                    )}
                  </div>
                </label>
              </Card>
            ))}
          </div>
        </div>
      ))}
      
      {items.length === 0 && (
        <Card className="p-6 text-center text-gray-500">
          No items to pack. Go to the Edit view to add items to your trip.
        </Card>
      )}
    </div>
  );
} 