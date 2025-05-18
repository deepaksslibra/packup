'use client';

import { useState } from 'react';
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

interface AddCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
}

export function AddCategoryDialog({ isOpen, onClose, tripId }: AddCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState('');
  const [icon, setIcon] = useState<string>('BackpackIcon');

  const updateTrip = useTripStore((state) => state.updateTrip);
  const trips = useTripStore((state) => state.trips);
  const trip = trips.find((t) => t.id === tripId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trip || !categoryName.trim()) return;

    // Check if the category already exists
    const existingCategories = new Set(trip.items.map((item) => item.category));

    if (existingCategories.has(categoryName)) {
      // Category already exists, perhaps show an error message
      return;
    }

    // Create a placeholder item for the new category
    const newItem = {
      id: crypto.randomUUID(),
      name: `New ${categoryName} Item`,
      category: categoryName,
      quantity: 1,
      essential: false,
      icon: 'PackageIcon',
    };

    // Update the trip with the new category and its icon
    updateTrip({
      ...trip,
      items: [...trip.items, newItem],
      categoryIcons: {
        ...(trip.categoryIcons || {}),
        [categoryName]: icon,
      },
    });

    // Reset form and close dialog
    setCategoryName('');
    setIcon('BackpackIcon');
    onClose();
  };

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
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
            <Button type="submit">Add Category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
