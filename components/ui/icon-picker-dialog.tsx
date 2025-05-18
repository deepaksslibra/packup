'use client';
import { useState } from 'react';
import { IconRenderer, useIconPicker } from './icon-picker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
type IconType = 'category' | 'item';

// Default icons based on type
const DEFAULT_ICONS = {
  category: 'BackpackIcon',
  item: 'PackageIcon',
};

export const IconPickerDialog = ({
  onSelect,
  initialValue,
  iconType = 'item',
}: {
  onSelect?: (icon: string, weight: IconWeight) => void;
  initialValue?: string;
  initialWeight?: IconWeight;
  iconType?: IconType;
}) => {
  // Use the appropriate default icon based on type if no initialValue is provided
  const defaultIcon = !initialValue ? DEFAULT_ICONS[iconType] : initialValue;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultIcon);
  const weight = 'duotone' as IconWeight;

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-w-[150px]">
          {selected ? (
            <>
              <IconRenderer className="size-4 mr-2" icon={selected} weight={weight} />
              Update
            </>
          ) : (
            'Select Icon'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[700px]">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>Choose the best suited duotone icon for your item</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <IconPicker
            onChange={(icon) => {
              setSelected(icon);
              onSelect?.(icon, weight);
              setOpen(false);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const IconPicker = ({
  onChange,
}: {
  onChange: (icon: string, weight: IconWeight) => void;
}) => {
  const { search, setSearch, icons } = useIconPicker();
  const weight = 'duotone' as IconWeight;

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search icons..."
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="h-[550px] overflow-y-scroll pr-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {icons.map(({ name, Component }) => {
            // Format the name for display: remove "Icon" suffix and add spaces between camel case
            const displayName = name
              .replace(/Icon$/, '')
              .replace(/([A-Z])/g, ' $1')
              .trim();

            return (
              <div
                key={name}
                className="border rounded-md hover:bg-accent cursor-pointer flex flex-col items-center p-3 text-center"
                onClick={() => onChange(name, weight)}
              >
                <Component className="size-8 mb-2" weight={weight} />
                <span className="text-[11px] text-muted-foreground">{displayName}</span>
              </div>
            );
          })}
        </div>
        {icons.length === 0 && (
          <div className="flex grow flex-col items-center justify-center gap-2 text-center py-8">
            <p>No icons found...</p>
            <Button onClick={() => setSearch('')} variant="ghost">
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
