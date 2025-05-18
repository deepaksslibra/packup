'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Form component for adding new items or editing existing items
 * @param {object} props - Component props
 * @param {string} props.tripId - The ID of the trip being edited
 * @param {object} [props.item] - Optional item being edited, if not provided, will be in "add" mode
 */
export default function EditItemForm({ 
  tripId, 
  item 
}: { 
  tripId: string;
  item?: { id: string; name: string; category: string; quantity: number }
}) {
  const isEditMode = !!item;
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState(item?.category || '');
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual submit logic to add/edit items using store or API
    console.log('Item submitted:', { name, category, quantity, tripId });
    
    // Reset form if in add mode
    if (!isEditMode) {
      setName('');
      setCategory('');
      setQuantity(1);
    }
  };

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-medium">{isEditMode ? 'Edit Item' : 'Add New Item'}</h2>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Item Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">
            {isEditMode ? 'Update Item' : 'Add Item'}
          </Button>
        </div>
      </form>
    </Card>
  );
} 