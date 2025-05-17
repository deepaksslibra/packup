'use client';

import React, { useState, type JSX } from 'react';
import { PackingItem } from '@/features/trip/types';
import { Button } from '@/components/ui/button';
import { useTripStore } from '@/store/tripStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

/**
 * Renders a single packing item row with edit/remove controls.
 * @param {object} props - Component props.
 * @param {PackingItem} props.item - The packing item to render.
 * @returns {JSX.Element | null} The item row UI.
 */
const ItemRow = ({ item }: { item: PackingItem }): JSX.Element | null => {
  const trip = useTripStore((state) => state.trips.find((t) => t.id === state.currentTripId));
  const updateTrip = useTripStore((state) => state.updateTrip);
  const [editOpen, setEditOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editCategory, setEditCategory] = useState(item.category);
  const [editEssential, setEditEssential] = useState(item.essential);

  if (!trip) return null;

  // Remove item from trip
  const handleRemove = () => {
    const updatedTrip = {
      ...trip,
      items: trip.items.filter((i) => i.id !== item.id),
    };
    updateTrip(updatedTrip);
  };

  // Increment quantity
  const handleIncrement = () => {
    const updatedItems = trip.items.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    updateTrip({ ...trip, items: updatedItems });
  };

  // Handle edit form submit
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editName.trim() || !editCategory.trim()) return;
    const updatedItems = trip.items.map((i) =>
      i.id === item.id
        ? {
            ...i,
            name: editName.trim(),
            quantity: editQuantity,
            category: editCategory.trim(),
            essential: editEssential,
          }
        : i
    );
    updateTrip({ ...trip, items: updatedItems });
    setEditOpen(false);
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <span className="truncate font-medium">{item.name}</span>
        <span className="bg-gray-100 text-gray-700 rounded-full px-2 py-0.5 text-xs ml-2">
          {item.quantity}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Button
          size="icon"
          variant="ghost"
          onClick={handleIncrement}
          aria-label="Increment quantity"
          title="Increase quantity"
        >
          +
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setEditOpen(true)}
          aria-label="Edit item"
          title="Edit"
        >
          <span className="sr-only">Edit</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M16.862 5.487l1.65-1.65a2.121 2.121 0 1 1 3 3l-1.65 1.65m-3-3l-9.193 9.193a2 2 0 0 0-.497.82l-1.01 3.03a.5.5 0 0 0 .632.632l3.03-1.01a2 2 0 0 0 .82-.497l9.193-9.193m-3-3 3 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={handleRemove}
          aria-label="Remove item"
          title="Remove"
        >
          <span className="sr-only">Remove</span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </Button>
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleEditSubmit}>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`edit-item-name-${item.id}`}
              >
                Item Name
              </label>
              <input
                id={`edit-item-name-${item.id}`}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`edit-item-quantity-${item.id}`}
              >
                Quantity
              </label>
              <input
                id={`edit-item-quantity-${item.id}`}
                type="number"
                min={1}
                value={editQuantity}
                onChange={(e) => setEditQuantity(Number(e.target.value))}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`edit-item-category-${item.id}`}
              >
                Category
              </label>
              <input
                id={`edit-item-category-${item.id}`}
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                required
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id={`edit-item-essential-${item.id}`}
                type="checkbox"
                checked={editEssential}
                onChange={(e) => setEditEssential(e.target.checked)}
              />
              <label htmlFor={`edit-item-essential-${item.id}`} className="text-sm">
                Essential
              </label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ItemRow;
