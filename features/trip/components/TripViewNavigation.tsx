'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

/**
 * Navigation component to switch between edit and packing views
 */
export default function TripViewNavigation() {
  const params = useParams();
  const pathname = usePathname();
  const tripId = params.tripId as string;
  
  const isEditPage = pathname.includes('/edit');
  const isPackingPage = pathname.includes('/packing');

  return (
    <div className="flex space-x-2 mb-4">
      <Link href={`/trip/${tripId}/edit`} passHref>
        <Button 
          variant={isEditPage ? "default" : "outline"}
          className="w-24"
        >
          Edit
        </Button>
      </Link>
      <Link href={`/trip/${tripId}/packing`} passHref>
        <Button 
          variant={isPackingPage ? "default" : "outline"}
          className="w-24"
        >
          Packing
        </Button>
      </Link>
    </div>
  );
} 