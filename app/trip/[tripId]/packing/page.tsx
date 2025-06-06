'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTripStore } from '@/store/tripStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PackingItem } from '@/features/trip/types';
import { cn } from '@/lib/utils';
import { IconRenderer } from '@/components/ui/icon-picker';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';

/**
 * Packing page for a trip
 */
export default function TripPackingPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const contentRef = useRef<HTMLDivElement>(null);

  // Get trip details from store
  const trips = useTripStore((state) => state.trips);
  const updateTrip = useTripStore((state) => state.updateTrip);
  const trip = trips.find((t) => t.id === tripId);

  // Filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'essential' | 'remaining'>('all');
  const [isClient, setIsClient] = useState(false);
  // Track collapsed categories
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Ensure client-side rendering for localStorage data
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If trip not found, redirect to trips page
  useEffect(() => {
    if (isClient && !trip) {
      router.push('/trips');
    }
  }, [trip, router, isClient]);

  if (!isClient || !trip) {
    return <div className="p-4 md:p-12 flex justify-center">Loading trip...</div>;
  }

  // Packing stats
  const totalItems = trip.items.length;
  const packedItems = trip.items.filter((item) => item.packed).length;
  const packingPercentage = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  // Toggle packed status of an item
  const toggleItemPacked = (itemId: string) => {
    const updatedTrip = {
      ...trip,
      items: trip.items.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      ),
    };
    updateTrip(updatedTrip);
  };

  // Filter items based on active filter
  const filteredItems = trip.items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'essential') return item.essential;
    if (activeFilter === 'remaining') return !item.packed;
    return true;
  });

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, PackingItem[]>
  );

  // Default icon per category if not specified in trip.categoryIcons
  const getDefaultCategoryIcon = (category: string) => {
    // Default icons based on common categories
    if (category === 'Clothing') return 'TShirtIcon';
    if (category === 'Toiletries') return 'DropIcon';
    if (category === 'Electronics') return 'LightningIcon';
    if (category === 'Documents') return 'FileTextIcon';
    if (category === 'Accessories') return 'SunglassesIcon';
    if (category === 'First Aid') return 'FirstAidKitIcon';
    if (category === 'Gear') return 'BackpackIcon';

    return 'FolderIcon';
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    if (trip.categoryIcons && trip.categoryIcons[category]) {
      return trip.categoryIcons[category];
    }
    return getDefaultCategoryIcon(category);
  };

  // Get item icon or default to Backpack icon
  const getItemIcon = (item: PackingItem) => {
    return item.icon || 'BackpackIcon';
  };

  // Toggle category collapse state
  const toggleCategoryCollapse = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const generatePDF = async () => {
    if (!trip) return;

    try {
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Set margins and column width
      const margin = 20;
      const columnWidth = (pageWidth - margin * 3) / 2; // Width of each column
      const maxY = pageHeight - margin; // Maximum Y position before new page

      // Fixed starting positions to ensure alignment
      const headerY = 20;
      const contentStartY = 48; // Increased from 40 to add more space after title
      let leftColumnY = contentStartY;
      let rightColumnY = contentStartY;
      const leftX = margin;
      const rightX = margin * 2 + columnWidth;

      // Draw star (for essential items)
      const drawStar = (x: number, y: number, size: number = 1.8): void => {
        pdf.setDrawColor(200, 150, 0); // Dark yellow outline
        pdf.setFillColor(255, 215, 0); // Gold fill

        // Calculate star points
        const points = [];
        const outerRadius = size;
        const innerRadius = size / 2;

        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          // Fix orientation - start at top point
          const angle = Math.PI * (i / 5 - 0.5);
          const pointX = x + radius * Math.sin(angle);
          const pointY = y + radius * Math.cos(angle);
          points.push({ x: pointX, y: pointY });
        }

        // Draw the star
        pdf.setLineWidth(0.2);
        pdf.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          pdf.lineTo(points[i].x, points[i].y);
        }
        pdf.lineTo(points[0].x, points[0].y);
        pdf.fillStroke();
      };

      // Header section - text only
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.text('PackUp', margin, headerY + 5);

      // Add trip name with increased spacing
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.text(`${trip.name} - Packing List`, margin, headerY + 15);

      // Group items by category
      const groupedItems: Record<string, PackingItem[]> = {};
      trip.items.forEach((item) => {
        if (!groupedItems[item.category]) {
          groupedItems[item.category] = [];
        }
        groupedItems[item.category].push(item);
      });

      // Split categories into two columns - evenly distribute them
      const categories = Object.entries(groupedItems);
      const leftColumnCategories = categories.slice(0, Math.ceil(categories.length / 2));
      const rightColumnCategories = categories.slice(Math.ceil(categories.length / 2));

      // Process left column categories
      leftColumnCategories.forEach(([category, items]) => {
        // Category header
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text(category, leftX, leftColumnY);
        leftColumnY += 8;

        // Process items in this category
        items.forEach((item) => {
          // Check for page overflow
          if (leftColumnY > maxY - 10) {
            // Move to new page
            pdf.addPage();
            leftColumnY = 20;
            rightColumnY = 20;
          }

          // Draw checkbox
          pdf.setDrawColor(150, 150, 150);
          pdf.rect(leftX, leftColumnY - 4, 5, 5);

          // Item name
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          let itemText = item.name;
          if (item.quantity > 1) {
            itemText += ` (${item.quantity})`;
          }

          // Add item text
          pdf.text(itemText, leftX + 10, leftColumnY);

          // Add star if essential (smaller size)
          if (item.essential) {
            const textWidth = pdf.getTextWidth(itemText);
            drawStar(leftX + 13 + textWidth, leftColumnY - 1.5, 1.8);
          }

          leftColumnY += 8;
        });

        leftColumnY += 8; // Increased spacing between categories (was 5)
      });

      // Process right column categories
      rightColumnCategories.forEach(([category, items]) => {
        // Category header
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12);
        pdf.text(category, rightX, rightColumnY);
        rightColumnY += 8;

        // Process items in this category
        items.forEach((item) => {
          // Check for page overflow
          if (rightColumnY > maxY - 10) {
            // Move to new page
            pdf.addPage();
            leftColumnY = 20;
            rightColumnY = 20;
          }

          // Draw checkbox
          pdf.setDrawColor(150, 150, 150);
          pdf.rect(rightX, rightColumnY - 4, 5, 5);

          // Item name
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          let itemText = item.name;
          if (item.quantity > 1) {
            itemText += ` (${item.quantity})`;
          }

          // Add item text
          pdf.text(itemText, rightX + 10, rightColumnY);

          // Add star if essential (smaller size)
          if (item.essential) {
            const textWidth = pdf.getTextWidth(itemText);
            drawStar(rightX + 13 + textWidth, rightColumnY - 1.5, 1.8);
          }

          rightColumnY += 8;
        });

        rightColumnY += 8; // Increased spacing between categories (was 5)
      });

      // Save PDF
      pdf.save(`${trip.name}_packing_list.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      {/* Navbar with bottom border */}
      <div className="border-b border-gray-200 mb-4 md:mb-6 px-3 md:px-6 py-3 md:py-4">
        <div className="flex justify-between items-center max-w-[100%] md:max-w-[95%] mx-auto">
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-10 md:w-10"
              onClick={() => router.push('/trips')}
            >
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <h1 className="text-base md:text-xl font-semibold font-serif truncate max-w-[180px] md:max-w-none">
              {trip.name}
            </h1>
          </div>
          <div>
            <Button
              variant="outline"
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm h-8 md:h-9 px-2 md:px-3"
              onClick={generatePDF}
            >
              <Printer className="h-3.5 w-3.5 md:h-4 md:w-4" />
              Print List
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-3xl mx-auto px-3 md:px-4 py-3 md:py-4" ref={contentRef}>
        {/* Packing Progress */}
        <div className="mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-1 md:mb-2">
            <h2 className="text-base md:text-lg font-medium">Packing Progress</h2>
            <span className="text-xs md:text-sm font-medium">{packingPercentage}% packed</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${packingPercentage}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex mb-4 md:mb-6 border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            onClick={() => setActiveFilter('all')}
            className={cn(
              'text-xs md:text-sm rounded-none h-10 flex-1 border-0',
              activeFilter === 'all'
                ? 'bg-blue-600 hover:bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-50'
            )}
          >
            All Items
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveFilter('essential')}
            className={cn(
              'text-xs md:text-sm rounded-none h-10 flex-1 border-x border-gray-200',
              activeFilter === 'essential'
                ? 'bg-blue-600 hover:bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-50'
            )}
          >
            Essential Only
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveFilter('remaining')}
            className={cn(
              'text-xs md:text-sm rounded-none h-10 flex-1 border-0',
              activeFilter === 'remaining'
                ? 'bg-blue-600 hover:bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-50'
            )}
          >
            Still to Pack
          </Button>
        </div>

        {/* Packing List */}
        <div className="space-y-5 md:space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div
              key={category}
              className="space-y-2 md:space-y-3 bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden"
            >
              <div
                className="p-3 md:p-4 flex items-center justify-between cursor-pointer border-b border-gray-100"
                onClick={() => toggleCategoryCollapse(category)}
              >
                <h3 className="text-base md:text-lg font-medium flex items-center gap-1.5 md:gap-2 text-blue-600">
                  <button className="text-gray-400 focus:outline-none">
                    {collapsedCategories[category] ? (
                      <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <ChevronUp className="h-4 w-4 md:h-5 md:w-5" />
                    )}
                  </button>
                  <IconRenderer
                    icon={getCategoryIcon(category)}
                    className="size-4 md:size-5 text-blue-600"
                  />
                  {category}
                </h3>
                <div className="text-xs text-gray-500">
                  {items.filter((item) => item.packed).length}/{items.length}
                </div>
              </div>

              {!collapsedCategories[category] && (
                <div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="py-2 md:py-3 px-3 md:px-4 border-b border-gray-100 last:border-0 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={item.id}
                          checked={!!item.packed}
                          onChange={() => toggleItemPacked(item.id)}
                          className="h-5 w-5 md:h-5 md:w-5 rounded border-gray-300 mr-3"
                        />
                        <label
                          htmlFor={item.id}
                          className={cn(
                            'text-sm md:text-base cursor-pointer flex items-center',
                            item.packed ? 'line-through text-gray-400' : 'text-gray-800'
                          )}
                        >
                          <IconRenderer
                            icon={getItemIcon(item)}
                            className="size-4 md:size-4 text-gray-600 mr-2"
                          />
                          <span>
                            {item.name} {item.quantity > 1 ? `(${item.quantity})` : ''}
                          </span>
                        </label>
                      </div>
                      {item.essential && (
                        <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200 whitespace-nowrap ml-1">
                          Essential
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {Object.keys(groupedItems).length === 0 && (
            <Card className="p-4 md:p-6 text-center text-gray-500 text-sm md:text-base">
              No items match your current filter.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
