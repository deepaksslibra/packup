'use client';
import type { FC } from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { v4 as uuidv4 } from 'uuid';
import { Trip, PackingItem } from '@/features/trip/types';
import { templateItems, categoryIcons } from '@/features/trip/data/templateItems';

/**
 * Predefined Templates page for PackUp.
 * Lists popular trip templates for quick packing list generation.
 * @returns {JSX.Element} The templates selection screen.
 */
const templates = [
  {
    key: '2-day-city-break',
    label: '2-Day City Break',
    description:
      'A short urban getaway focused on sightseeing, culinary experiences, and cultural attractions in a single city.',
    icon: (
      <span className="text-2xl" role="img" aria-label="City">
        🏙️
      </span>
    ),
  },
  {
    key: '3-day-weekend-road-trip',
    label: '3-Day Weekend Road Trip',
    description:
      'A budget-friendly drive itinerary covering scenic routes, small towns, and national parks over a long weekend.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Car">
        🚗
      </span>
    ),
  },
  {
    key: '7-day-beach-vacation',
    label: '7-Day Beach Vacation',
    description:
      'A week-long stay at a coastal resort or beachfront rental, emphasizing relaxation and water activities.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Beach">
        🏖️
      </span>
    ),
  },
  {
    key: '3-day-hiking-adventure',
    label: '3-Day Hiking Adventure',
    description:
      'A multi-day trek through forest or mountain trails, staying in lodges or campsites.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Hiking">
        🥾
      </span>
    ),
  },
  {
    key: '2-day-business-trip',
    label: '2-Day Business Trip',
    description:
      'A short corporate itinerary for meetings or conferences, with options to extend stay for leisure activities.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Briefcase">
        💼
      </span>
    ),
  },
  {
    key: '5-day-cultural-tour',
    label: '5-Day Cultural Tour',
    description:
      'An immersive journey visiting museums, historic sites, and local workshops to engage with heritage and arts.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Museum">
        🏛️
      </span>
    ),
  },
  {
    key: '2-day-camping-getaway',
    label: '2-Day Camping Getaway',
    description:
      'An overnight campsite stay with hiking, campfire cooking, and stargazing for nature immersion.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Camping">
        ⛺
      </span>
    ),
  },
  {
    key: '4-day-wellness-retreat',
    label: '4-Day Wellness Retreat',
    description:
      'A short break at a spa resort or wellness center offering yoga, meditation, and spa treatments.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Spa">
        💆
      </span>
    ),
  },
  {
    key: '7-day-backpacking-expedition',
    label: '7-Day Backpacking Expedition',
    description:
      'A self-guided trek with hostel stays and local homestays, focusing on experiential travel through communities and nature.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Backpack">
        🎒
      </span>
    ),
  },
  {
    key: '7-day-cruise-vacation',
    label: '7-Day Cruise Vacation',
    description:
      'A week-long cruise covering multiple ports, combining leisure, entertainment, and shore excursions.',
    icon: (
      <span className="text-2xl" role="img" aria-label="Cruise">
        🚢
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
    // Generate items with unique IDs from the template
    const templateItemsList = templateItems[tpl.key] || [];
    const items: PackingItem[] = templateItemsList.map((item) => ({
      ...item,
      id: uuidv4(), // Generate a unique ID for each item
    }));

    // Create a map of category icons for this trip
    const tripCategoryIcons: Record<string, string> = {};

    // Collect all unique categories from the items
    const categories = new Set<string>();
    items.forEach((item) => {
      if (item.category) {
        categories.add(item.category);
      }
    });

    // Assign icons to each category
    categories.forEach((category) => {
      tripCategoryIcons[category] = categoryIcons[category] || 'box';
    });

    const newTrip: Trip = {
      id: uuidv4(),
      name: tpl.label,
      createdAt: new Date().toISOString(),
      items: items,
      categoryIcons: tripCategoryIcons,
    };

    addTrip(newTrip);
    router.push(`/trip/${newTrip.id}`);
  };

  return (
    <div className="flex bg-gray-50">
      {/* Left panel - fixed */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-center p-8 text-white h-screen sticky top-0">
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
      {/* Right panel - scrollable */}
      <div className="w-full md:w-1/2 flex flex-col p-8 overflow-y-auto max-h-screen">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-2 text-gray-800">Select a Template</h2>
          <p className="text-gray-500 mb-8">Pick a template to quickly generate a packing list.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
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
                      <div className="bg-blue-100 text-blue-600 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                        {tpl.icon}
                      </div>
                      <div>
                        <div className="font-instrument font-semibold text-gray-900 text-[20px]">
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
