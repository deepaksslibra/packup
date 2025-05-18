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
import {
  Buildings,
  Car,
  UmbrellaSimple,
  Mountains,
  Briefcase,
  Bank,
  Tent,
  PersonSimpleTaiChi,
  Backpack,
  Sailboat,
  ArrowLeft,
} from '@phosphor-icons/react';

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
    icon: <Buildings size={32} weight="duotone" color="#6366f1" />,
  },
  {
    key: '3-day-weekend-road-trip',
    label: '3-Day Weekend Road Trip',
    description:
      'A budget-friendly drive itinerary covering scenic routes, small towns, and national parks over a long weekend.',
    icon: <Car size={32} weight="duotone" color="#f97316" />,
  },
  {
    key: '7-day-beach-vacation',
    label: '7-Day Beach Vacation',
    description:
      'A week-long stay at a coastal resort or beachfront rental, emphasizing relaxation and water activities.',
    icon: <UmbrellaSimple size={32} weight="duotone" color="#0ea5e9" />,
  },
  {
    key: '3-day-hiking-adventure',
    label: '3-Day Hiking Adventure',
    description:
      'A multi-day trek through forest or mountain trails, staying in lodges or campsites.',
    icon: <Mountains size={32} weight="duotone" color="#16a34a" />,
  },
  {
    key: '2-day-business-trip',
    label: '2-Day Business Trip',
    description:
      'A short corporate itinerary for meetings or conferences, with options to extend stay for leisure activities.',
    icon: <Briefcase size={32} weight="duotone" color="#4b5563" />,
  },
  {
    key: '5-day-cultural-tour',
    label: '5-Day Cultural Tour',
    description:
      'An immersive journey visiting museums, historic sites, and local workshops to engage with heritage and arts.',
    icon: <Bank size={32} weight="duotone" color="#a855f7" />,
  },
  {
    key: '2-day-camping-getaway',
    label: '2-Day Camping Getaway',
    description:
      'An overnight campsite stay with hiking, campfire cooking, and stargazing for nature immersion.',
    icon: <Tent size={32} weight="duotone" color="#ca8a04" />,
  },
  {
    key: '4-day-wellness-retreat',
    label: '4-Day Wellness Retreat',
    description:
      'A short break at a spa resort or wellness center offering yoga, meditation, and spa treatments.',
    icon: <PersonSimpleTaiChi size={32} weight="duotone" color="#ec4899" />,
  },
  {
    key: '7-day-backpacking-expedition',
    label: '7-Day Backpacking Expedition',
    description:
      'A self-guided trek with hostel stays and local homestays, focusing on experiential travel through communities and nature.',
    icon: <Backpack size={32} weight="duotone" color="#84cc16" />,
  },
  {
    key: '7-day-cruise-vacation',
    label: '7-Day Cruise Vacation',
    description:
      'A week-long cruise covering multiple ports, combining leisure, entertainment, and shore excursions.',
    icon: <Sailboat size={32} weight="duotone" color="#0284c7" />,
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
    <div className="flex flex-col md:flex-row bg-gray-50">
      {/* Left panel - fixed on desktop, non-fixed on mobile */}
      <div className="w-full md:w-1/2 bg-blue-600 flex flex-col justify-center items-start md:items-center py-6 px-5 md:p-8 text-white md:h-screen md:sticky md:top-0">
        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-xs">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/onboarding')}
            className="text-white hover:bg-blue-700 self-start mb-2"
            aria-label="Go back to onboarding"
          >
            <ArrowLeft size={24} weight="bold" />
          </Button>
          <h1 className="font-serif text-2xl md:text-4xl font-bold leading-tight">
            Choose a trip template
          </h1>
          <p className="text-sm md:text-base opacity-90">
            Start with a popular trip type and customize your packing list in seconds.
          </p>
          <p className="text-xs md:text-sm opacity-80 mt-2 hidden md:block">
            Templates are a fast way to get started—perfect for common travel scenarios.
          </p>
        </div>
      </div>
      {/* Right panel - scrollable */}
      <div className="w-full md:w-1/2 flex flex-col p-5 md:p-8 overflow-y-auto md:max-h-screen">
        <div className="w-full max-w-2xl mx-auto">
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-2 text-gray-800">
            Select a Template
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-8">
            Pick a template to quickly generate a packing list.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-8">
            {templates.map((tpl) => {
              const isSelected = selected === tpl.key;
              let bgColor = 'bg-white';
              let hoverBgColor = 'hover:bg-gray-50';
              let iconBgColor = 'bg-blue-100';

              // Set colors based on template type
              switch (tpl.key) {
                case '2-day-city-break':
                  iconBgColor = 'bg-indigo-100';
                  if (isSelected) bgColor = 'bg-indigo-50';
                  hoverBgColor = 'hover:bg-indigo-50';
                  break;
                case '3-day-weekend-road-trip':
                  iconBgColor = 'bg-orange-100';
                  if (isSelected) bgColor = 'bg-orange-50';
                  hoverBgColor = 'hover:bg-orange-50';
                  break;
                case '7-day-beach-vacation':
                  iconBgColor = 'bg-sky-100';
                  if (isSelected) bgColor = 'bg-sky-50';
                  hoverBgColor = 'hover:bg-sky-50';
                  break;
                case '3-day-hiking-adventure':
                  iconBgColor = 'bg-green-100';
                  if (isSelected) bgColor = 'bg-green-50';
                  hoverBgColor = 'hover:bg-green-50';
                  break;
                case '2-day-business-trip':
                  iconBgColor = 'bg-gray-100';
                  if (isSelected) bgColor = 'bg-gray-50';
                  hoverBgColor = 'hover:bg-gray-50';
                  break;
                case '5-day-cultural-tour':
                  iconBgColor = 'bg-purple-100';
                  if (isSelected) bgColor = 'bg-purple-50';
                  hoverBgColor = 'hover:bg-purple-50';
                  break;
                case '2-day-camping-getaway':
                  iconBgColor = 'bg-amber-100';
                  if (isSelected) bgColor = 'bg-amber-50';
                  hoverBgColor = 'hover:bg-amber-50';
                  break;
                case '4-day-wellness-retreat':
                  iconBgColor = 'bg-pink-100';
                  if (isSelected) bgColor = 'bg-pink-50';
                  hoverBgColor = 'hover:bg-pink-50';
                  break;
                case '7-day-backpacking-expedition':
                  iconBgColor = 'bg-lime-100';
                  if (isSelected) bgColor = 'bg-lime-50';
                  hoverBgColor = 'hover:bg-lime-50';
                  break;
                case '7-day-cruise-vacation':
                  iconBgColor = 'bg-blue-100';
                  if (isSelected) bgColor = 'bg-blue-50';
                  hoverBgColor = 'hover:bg-blue-50';
                  break;
                default:
                  if (isSelected) bgColor = 'bg-blue-50';
                  break;
              }

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
                  className={`${bgColor} border transition cursor-pointer outline-none
                    ${isSelected ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200'}
                    ${hoverBgColor} hover:shadow-lg hover:border-blue-400 focus:ring-2 focus:ring-blue-300
                  `}
                >
                  <CardContent className="flex flex-col items-start gap-3 md:gap-4 p-4 md:p-6">
                    <div className="flex items-start md:items-center gap-3">
                      <div
                        className={`${iconBgColor} rounded-full p-2 md:p-3 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0`}
                      >
                        {tpl.icon}
                      </div>
                      <div>
                        <div className="font-satoshi font-semibold text-gray-900 text-base md:text-[20px]">
                          {tpl.label}
                        </div>
                        <div className="text-xs md:text-sm text-gray-600 opacity-80">
                          {tpl.description}
                        </div>
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
