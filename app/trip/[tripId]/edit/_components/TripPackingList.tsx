'use client';

import { useState, useMemo } from 'react';
import { useTripStore } from '@/store/tripStore';
import { PackingItem } from '@/features/trip/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, MoreHorizontal, FileIcon, Pencil, Trash2 } from 'lucide-react';
import { AddItemDialog } from './AddItemDialog';
import { EditItemDialog } from './EditItemDialog';
import { IconRenderer } from '@/components/ui/icon-picker';

// Mock data for development
const MOCK_TRIP_ID = 'mock-trip-1';

interface TripPackingListProps {
  tripId: string;
}

/**
 * TripPackingList component that displays packing items organized by category
 */
export function TripPackingList({ tripId }: TripPackingListProps) {
  const trips = useTripStore((state) => state.trips);
  const trip = trips.find((t) => t.id === tripId || t.id === MOCK_TRIP_ID);
  const [addToCategory, setAddToCategory] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<PackingItem | null>(null);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    if (!trip) return {};

    return trip.items.reduce<Record<string, PackingItem[]>>((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [trip]);

  if (!trip) {
    return (
      <div className="text-center py-8 text-gray-500">
        No trip data found. Please make sure the trip exists.
      </div>
    );
  }

  // If there are no items yet
  if (trip.items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items added yet. Use the &quot;Add Item&quot; button to start building your packing list.
      </div>
    );
  }

  const handleDeleteItem = (itemId: string) => {
    if (!trip) return;

    const updatedItems = trip.items.filter((item) => item.id !== itemId);
    useTripStore.getState().updateTrip({
      ...trip,
      items: updatedItems,
    });
  };

  const handleEditItem = (itemId: string) => {
    if (!trip) return;

    const item = trip.items.find((item) => item.id === itemId);
    if (item) {
      setItemToEdit(item);
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string): string => {
    if (trip.categoryIcons && trip.categoryIcons[category]) {
      return trip.categoryIcons[category];
    }

    // Default icons based on common categories
    if (category === 'Clothing') return 'Shirt';
    if (category === 'Toiletries') return 'Bath';
    if (category === 'Electronics') return 'Smartphone';
    if (category === 'Documents') return 'FileText';

    return 'Folder';
  };

  return (
    <div className="space-y-8">
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <div key={category} className="rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <span className="text-blue-500">
                <IconRenderer icon={getCategoryIcon(category)} className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-medium font-serif">{category}</h2>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="px-4 py-3 flex items-center hover:bg-gray-50 transition-colors relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-gray-500 mr-3">
                  <IconRenderer icon={item.icon || 'File'} className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.quantity > 1 && (
                      <span className="text-xs text-gray-500">({item.quantity})</span>
                    )}
                    {item.essential && (
                      <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
                        Essential
                      </span>
                    )}
                  </div>
                </div>
                {hoveredItem === item.id && (
                  <div className="absolute right-4 flex space-x-1">
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                      onClick={() => handleEditItem(item.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-red-100 text-red-500"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="p-3 border-t flex justify-end">
              <button
                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors text-sm font-medium"
                onClick={() => setAddToCategory(category)}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add to {category}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dialog for adding item to specific category */}
      {addToCategory && (
        <AddItemDialog
          isOpen={!!addToCategory}
          onClose={() => setAddToCategory(null)}
          tripId={tripId}
          defaultCategory={addToCategory}
        />
      )}

      {/* Dialog for editing an item */}
      {itemToEdit && (
        <EditItemDialog
          isOpen={!!itemToEdit}
          onClose={() => setItemToEdit(null)}
          tripId={tripId}
          item={itemToEdit}
        />
      )}
    </div>
  );
}
