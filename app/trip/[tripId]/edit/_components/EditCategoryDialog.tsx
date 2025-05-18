'use client';

import { useState, useEffect } from 'react';
import { useTripStore } from '@/store/tripStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconPickerDialog } from '@/components/ui/icon-picker-dialog';

interface EditCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  currentCategory: string;
  currentIcon: string;
}

export function EditCategoryDialog({
  isOpen,
  onClose,
  tripId,
  currentCategory,
  currentIcon,
}: EditCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState(currentCategory);
  const [icon, setIcon] = useState<string>(currentIcon);

  const updateTrip = useTripStore((state) => state.updateTrip);
  const trips = useTripStore((state) => state.trips);
  const trip = trips.find((t) => t.id === tripId);

  // Update state if the currentCategory or currentIcon props change
  useEffect(() => {
    setCategoryName(currentCategory);
    setIcon(currentIcon);
  }, [currentCategory, currentIcon]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trip || !categoryName.trim()) return;

    // Check if the new category name already exists (if user is changing the name)
    if (categoryName !== currentCategory) {
      const existingCategories = new Set(trip.items.map((item) => item.category));
      if (existingCategories.has(categoryName)) {
        // Category already exists, perhaps show an error message
        alert('This category name already exists. Please choose a different name.');
        return;
      }
    }

    // Update all items with the current category to the new category name
    const updatedItems = trip.items.map((item) => {
      if (item.category === currentCategory) {
        return { ...item, category: categoryName };
      }
      return item;
    });

    // Update the category icon
    const updatedCategoryIcons = { ...(trip.categoryIcons || {}) };

    // Remove the old category icon if the name changed
    if (currentCategory !== categoryName) {
      delete updatedCategoryIcons[currentCategory];
    }

    // Set the new category icon
    updatedCategoryIcons[categoryName] = icon;

    // Update the trip
    updateTrip({
      ...trip,
      items: updatedItems,
      categoryIcons: updatedCategoryIcons,
    });

    onClose();
  };

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategoryName(e.target.value)
                }
                placeholder="Clothing, Electronics, etc."
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <Label>Icon</Label>
              <IconPickerDialog
                onSelect={handleIconSelect}
                initialValue={icon}
                iconType="category"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
