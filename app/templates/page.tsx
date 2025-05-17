'use client';
import type { FC } from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { v4 as uuidv4 } from 'uuid';
import { Trip } from '@/features/trip/types';

/**
 * Predefined Templates page for PackUp.
 * Lists popular trip templates for quick packing list generation.
 * @returns {JSX.Element} The templates selection screen.
 */
const templates = [
  {
    key: 'beach',
    label: 'Beach Vacation',
    description: 'Sun, sand, and sea essentials for your next beach getaway.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Beach">
        🏖️
      </span>
    ),
  },
  {
    key: 'business',
    label: 'Business Trip',
    description: 'Everything you need for a productive business journey.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Briefcase">
        💼
      </span>
    ),
  },
  {
    key: 'mountain',
    label: 'Mountain Adventure',
    description: 'Gear up for hiking, camping, and outdoor fun.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Mountain">
        🏔️
      </span>
    ),
  },
  {
    key: 'city',
    label: 'City Break',
    description: 'Urban essentials for exploring a new city.',
    icon: (
      <span className="text-2xl" role="img" aria-label="City">
        🌆
      </span>
    ),
  },
];

/**
 * Renders the Templates selection page with a split layout and interactive cards.
 * @returns {JSX.Element}
 */
const TemplatesPage: FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const addTrip = useTripStore((state) => state.addTrip);

  // Keyboard accessibility: select on Enter/Space
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    key: string,
    tpl: (typeof templates)[number]
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setSelected(key);
      handleTemplateSelect(tpl);
    }
  };

  const handleTemplateSelect = (tpl: (typeof templates)[number]) => {
    const newTrip: Trip = {
      id: uuidv4(),
      name: tpl.label,
      createdAt: new Date().toISOString(),
      items: [], // Pre-population can be added later
    };
    addTrip(newTrip);
    router.push(`/trip/${newTrip.id}`);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left panel */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8 text-white">
        <div className="flex flex-col gap-6 max-w-xs w-full">
          <h1 className="font-serif text-4xl font-bold leading-tight">Choose a trip template</h1>
          <p className="text-base opacity-90">
            Start with a popular trip type and customize your packing list in seconds.
          </p>
          <p className="text-sm opacity-80 mt-2">
            Templates are a fast way to get started—perfect for common travel scenarios.
          </p>
        </div>
      </div>
      {/* Right panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-2 text-gray-800">Select a Template</h2>
          <p className="text-gray-500 mb-8">Pick a template to quickly generate a packing list.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((tpl) => {
              const isSelected = selected === tpl.key;
              return (
                <Card
                  key={tpl.key}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Select ${tpl.label}`}
                  onClick={() => {
                    setSelected(tpl.key);
                    handleTemplateSelect(tpl);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, tpl.key, tpl)}
                  className={`bg-white border transition cursor-pointer outline-none
                    ${isSelected ? 'border-blue-600 ring-2 ring-blue-200 bg-blue-50' : 'border-gray-200'}
                    hover:shadow-lg hover:border-blue-400 focus:ring-2 focus:ring-blue-300
                  `}
                >
                  <CardContent className="flex flex-col items-start gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-3">{tpl.icon}</div>
                      <div>
                        <div className="font-instrument font-semibold text-lg text-gray-900">
                          {tpl.label}
                        </div>
                        <div className="text-sm text-gray-600 opacity-80">{tpl.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
