'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/**
 * Dialog/modal for renaming the trip.
 * @param {object} props - Component props.
 * @param {boolean} props.open - Whether the dialog is open.
 * @param {(open: boolean) => void} props.setOpen - Function to set dialog open state.
 * @param {string} props.tripName - Current trip name.
 * @param {(newName: string) => void} props.onRename - Callback to rename the trip.
 */
const RenameTripDialog = ({
  open,
  setOpen,
  tripName,
  onRename,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  tripName: string;
  onRename: (newName: string) => void;
}) => {
  const [name, setName] = useState(tripName);

  // Keep input in sync if tripName changes
  React.useEffect(() => {
    setName(tripName);
  }, [tripName]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    onRename(name.trim());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Trip</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="rename-trip-name">
              Trip Name
            </label>
            <input
              id="rename-trip-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameTripDialog;
