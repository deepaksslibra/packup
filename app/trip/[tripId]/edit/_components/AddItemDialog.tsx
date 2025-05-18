'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTripStore } from '@/store/tripStore';
import { PackingItem } from '@/features/trip/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { IconPickerDialog } from '@/components/ui/icon-picker-dialog';

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  defaultCategory?: string;
}

export function AddItemDialog({ isOpen, onClose, tripId, defaultCategory }: AddItemDialogProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState(defaultCategory || '');
  const [quantity, setQuantity] = useState(1);
  const [essential, setEssential] = useState(false);
  const [icon, setIcon] = useState<string>('PackageIcon');

  const updateTrip = useTripStore((state) => state.updateTrip);
  const trips = useTripStore((state) => state.trips);
  const trip = trips.find((t) => t.id === tripId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trip) return;

    // Create a new item
    const newItem: PackingItem = {
      id: crypto.randomUUID(),
      name,
      category,
      quantity,
      essential,
      icon,
    };

    // Update the trip with the new item
    updateTrip({
      ...trip,
      items: [...trip.items, newItem],
    });

    // Reset form and close dialog
    setName('');
    setCategory(defaultCategory || '');
    setQuantity(1);
    setEssential(false);
    setIcon('PackageIcon');
    onClose();
  };

  // Get unique categories from trip items for dropdown suggestions
  const existingCategories = trip
    ? Array.from(new Set(trip.items.map((item) => item.category)))
    : [];

  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">Add New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 pt-2 md:pt-4">
          <div className="grid grid-cols-[1fr_auto] gap-3 md:gap-4">
            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base">Item Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="T-shirt, Toothbrush, etc."
                className="focus:ring-blue-500 focus:border-blue-500 h-9 md:h-10 text-sm md:text-base"
                required
              />
            </div>
            <div className="space-y-1.5 md:space-y-2 flex flex-col">
              <Label className="text-sm md:text-base">Icon</Label>
              <IconPickerDialog onSelect={handleIconSelect} initialValue={icon} iconType="item" />
            </div>
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="category" className="text-sm md:text-base">Category</Label>
            <Input
              id="category"
              list="categories"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="Clothing, Toiletries, etc."
              className="focus:ring-blue-500 focus:border-blue-500 h-9 md:h-10 text-sm md:text-base"
              required
            />
            {existingCategories.length > 0 && (
              <datalist id="categories">
                {existingCategories.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            )}
          </div>

          <div className="space-y-1.5 md:space-y-2">
            <Label htmlFor="quantity" className="text-sm md:text-base">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(parseInt(e.target.value))
              }
              className="focus:ring-blue-500 focus:border-blue-500 h-9 md:h-10 text-sm md:text-base"
              required
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <Checkbox
              id="essential"
              checked={essential}
              onCheckedChange={(checked: boolean) => setEssential(checked)}
              className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 h-4 w-4 md:h-5 md:w-5"
            />
            <Label htmlFor="essential" className="text-xs md:text-sm font-normal cursor-pointer">
              Mark as essential
            </Label>
          </div>

          <DialogFooter className="pt-2 md:pt-4 flex-col-reverse sm:flex-row gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto text-sm md:text-base h-9 md:h-10">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full sm:w-auto text-sm md:text-base h-9 md:h-10">
              Add Item
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
