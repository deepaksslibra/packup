'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTripStore } from '@/store/tripStore';
import { PackingItem } from '@/features/trip/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { IconPicker } from '@/components/ui/icon-picker';
import { IconName } from 'lucide-react/dynamic';

interface EditItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  item: PackingItem;
}

export function EditItemDialog({ 
  isOpen, 
  onClose, 
  tripId,
  item 
}: EditItemDialogProps) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [essential, setEssential] = useState(item.essential);
  const [icon, setIcon] = useState<IconName>(item.icon as IconName || 'package');
  
  // Update state if the item prop changes
  useEffect(() => {
    setName(item.name);
    setCategory(item.category);
    setQuantity(item.quantity);
    setEssential(item.essential);
    setIcon(item.icon as IconName || 'package');
  }, [item]);
  
  const updateTrip = useTripStore(state => state.updateTrip);
  const trips = useTripStore(state => state.trips);
  const trip = trips.find(t => t.id === tripId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!trip) return;
    
    // Create updated item
    const updatedItem: PackingItem = {
      ...item,
      name,
      category,
      quantity,
      essential,
      icon
    };
    
    // Update the trip with the updated item
    updateTrip({
      ...trip,
      items: trip.items.map(i => i.id === item.id ? updatedItem : i)
    });
    
    onClose();
  };

  // Get unique categories from trip items for dropdown suggestions
  const existingCategories = trip 
    ? Array.from(new Set(trip.items.map(item => item.category)))
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="T-shirt, Toothbrush, etc."
                className="focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <Label>Icon</Label>
              <IconPicker 
                value={icon} 
                onValueChange={setIcon}
                triggerPlaceholder="Select icon"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              list="categories"
              value={category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
              placeholder="Clothing, Toiletries, etc."
              className="focus:ring-blue-500 focus:border-blue-500"
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
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(parseInt(e.target.value))}
              className="focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="essential" 
              checked={essential}
              onCheckedChange={(checked: boolean) => setEssential(checked)}
              className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            />
            <Label 
              htmlFor="essential" 
              className="text-sm font-normal cursor-pointer"
            >
              Mark as essential
            </Label>
          </div>
          
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 