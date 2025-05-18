'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';

// Mock data for initial development
const MOCK_ITEMS = [
  { id: '1', name: 'T-Shirt', category: 'Clothing', quantity: 3 },
  { id: '2', name: 'Toothbrush', category: 'Toiletries', quantity: 1 },
  { id: '3', name: 'Charger', category: 'Electronics', quantity: 2 },
];

/**
 * Displays a list of trip items with edit and delete functionality
 * @param {object} props - Component props
 * @param {string} props.tripId - The ID of the trip
 */
export default function ItemListEditor({ tripId }: { tripId: string }) {
  const [items, setItems] = useState(MOCK_ITEMS);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // In a real implementation, this would use the trip store or an API call
  const fetchItems = async () => {
    // For now, use mock data
    return MOCK_ITEMS;
  };

  const handleEdit = (itemId: string) => {
    // This would typically open the form in edit mode or navigate to an edit route
    console.log('Editing item:', itemId);
  };

  const handleDeleteClick = (itemId: string) => {
    setItemToDelete(itemId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      // Remove the item
      setItems(items.filter((item) => item.id !== itemToDelete));
      // In a real implementation, this would update the store or call an API

      // Close dialog and reset
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Trip Items</h2>
      </div>

      {items.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No items added yet. Use the form above to add items to your trip.
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.category} • Quantity: {item.quantity}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                variant="outline"
                className="text-red-500 hover:bg-red-50"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
