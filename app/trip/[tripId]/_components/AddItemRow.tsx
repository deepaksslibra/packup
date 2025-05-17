import React, { useState } from 'react';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

/**
 * AddItemRow renders a button to add a new item to a category, opening a dialog with a form.
 * @param {object} props - Component props.
 * @param {string} props.category - The category to add the item to.
 */
const AddItemRow = ({ category }: { category: string }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [essential, setEssential] = useState(false);
  const trip = useTripStore((state) => state.trips.find((t) => t.id === state.currentTripId));
  const updateTrip = useTripStore((state) => state.updateTrip);

  if (!trip) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      quantity,
      category,
      essential,
    };
    updateTrip({ ...trip, items: [...trip.items, newItem] });
    setName('');
    setQuantity(1);
    setEssential(false);
    setOpen(false);
  };

  return (
    <>
      <Button variant="ghost" className="w-full mt-2" onClick={() => setOpen(true)}>
        + Add Item
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Item to {category}</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="add-item-name">Item Name</label>
              <input id="add-item-name" value={name} onChange={e => setName(e.target.value)} required className="w-full border rounded px-2 py-1" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="add-item-quantity">Quantity</label>
              <input id="add-item-quantity" type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} required className="w-full border rounded px-2 py-1" />
            </div>
            <div className="flex items-center gap-2">
              <input id="add-item-essential" type="checkbox" checked={essential} onChange={e => setEssential(e.target.checked)} />
              <label htmlFor="add-item-essential" className="text-sm">Essential</label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemRow; 