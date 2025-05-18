'use client';

import { useState, useMemo } from 'react';
import { useTripStore } from '@/store/tripStore';
import { PackingItem } from '@/features/trip/types';
import { Button } from '@/components/ui/button';
import { PlusIcon, Pencil, Trash2 } from 'lucide-react';
import { Broom, Info } from '@phosphor-icons/react';
import { AddItemDialog } from './AddItemDialog';
import { EditItemDialog } from './EditItemDialog';
import { EditCategoryDialog } from './EditCategoryDialog';
import { IconRenderer } from '@/components/ui/icon-picker';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<PackingItem | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<{ name: string; icon: string } | null>(null);
  const [categoryToRemoveItems, setCategoryToRemoveItems] = useState<string | null>(null);

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

  // Calculate count of optional items in a category
  const getOptionalItemsCount = (category: string): number => {
    if (!trip) return 0;

    return trip.items.filter((item) => item.category === category && !item.essential).length;
  };

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

  // If items are being loaded, component won't be rendered as the parent component shows a loading state

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

  const handleEditCategory = (category: string) => {
    if (!trip) return;

    const icon = getCategoryIcon(category);
    setCategoryToEdit({ name: category, icon });
  };

  const handleOpenRemoveOptionalItemsDialog = (category: string) => {
    // Check if there are any optional items to remove
    if (getOptionalItemsCount(category) === 0) return;

    setCategoryToRemoveItems(category);
  };

  const handleConfirmRemoveOptionalItems = () => {
    if (!trip || !categoryToRemoveItems) return;

    // Filter out non-essential items from the specified category
    const updatedItems = trip.items.filter(
      (item) => item.category !== categoryToRemoveItems || item.essential === true
    );

    // Update the trip with the filtered items
    useTripStore.getState().updateTrip({
      ...trip,
      items: updatedItems,
    });

    // Close the dialog
    setCategoryToRemoveItems(null);
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
          <div
            className="flex items-center justify-between p-4 border-b relative"
            onMouseEnter={() => setHoveredCategory(category)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-3">
              <span className="text-blue-500">
                <IconRenderer icon={getCategoryIcon(category)} className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-medium">{category}</h2>
            </div>
            {hoveredCategory === category && (
              <div className="flex items-center space-x-2">
                <button
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => handleEditCategory(category)}
                  title="Edit category"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {getOptionalItemsCount(category) > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="text-gray-400 hover:text-amber-600 cursor-pointer relative"
                          onClick={() => handleOpenRemoveOptionalItemsDialog(category)}
                        >
                          <Broom className="h-4 w-4" size={16} weight="regular" />
                          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] w-3 h-3 flex items-center justify-center rounded-full">
                            {getOptionalItemsCount(category)}
                          </span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove optional items</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
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
                  <IconRenderer icon={item.icon || 'Backpack'} className="h-5 w-5" />
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
                    {item.explanation && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info
                              size={18}
                              weight="bold"
                              color="#9177C7"
                              className="ml-0.5 hover:opacity-80 transition-opacity"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            <p className="text-sm">{item.explanation}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                {hoveredItem === item.id && (
                  <div className="absolute right-4 flex space-x-1">
                    <button
                      className="p-1 rounded-md hover:bg-gray-200 text-gray-500 cursor-pointer"
                      onClick={() => handleEditItem(item.id)}
                      title="Edit item"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-red-100 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="p-3 border-t flex justify-end">
              <button
                className="flex items-center text-blue-500 hover:text-blue-700 transition-colors text-sm font-medium cursor-pointer"
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

      {/* Dialog for editing a category */}
      {categoryToEdit && (
        <EditCategoryDialog
          isOpen={!!categoryToEdit}
          onClose={() => setCategoryToEdit(null)}
          tripId={tripId}
          currentCategory={categoryToEdit.name}
          currentIcon={categoryToEdit.icon}
        />
      )}

      {/* Confirmation Dialog for removing optional items */}
      <Dialog open={!!categoryToRemoveItems} onOpenChange={() => setCategoryToRemoveItems(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Optional Items</DialogTitle>
            <DialogDescription>
              {categoryToRemoveItems && (
                <>
                  This will remove {getOptionalItemsCount(categoryToRemoveItems)} optional item
                  {getOptionalItemsCount(categoryToRemoveItems) !== 1 ? 's' : ''} from the &quot;
                  {categoryToRemoveItems}&quot; category. Essential items will remain.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryToRemoveItems(null)}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleConfirmRemoveOptionalItems}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
