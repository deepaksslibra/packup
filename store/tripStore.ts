import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trip } from '@/features/trip/types';

/**
 * Zustand store for managing trips and the current trip being edited.
 */
export interface TripState {
  /** All saved trips */
  trips: Trip[];
  /** The ID of the currently edited trip, or null if none */
  currentTripId: string | null;
  /** Set the current trip by ID */
  setCurrentTrip: (id: string | null) => void;
  /** Add a new trip */
  addTrip: (trip: Trip) => void;
  /** Update an existing trip */
  updateTrip: (trip: Trip) => void;
  /** Remove a trip by ID */
  removeTrip: (id: string) => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [],
      currentTripId: null,
      setCurrentTrip: (id) => set({ currentTripId: id }),
      addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
      updateTrip: (trip) =>
        set((state) => ({
          trips: state.trips.map((t) => (t.id === trip.id ? trip : t)),
        })),
      removeTrip: (id) =>
        set((state) => ({
          trips: state.trips.filter((t) => t.id !== id),
          currentTripId: state.currentTripId === id ? null : state.currentTripId,
        })),
    }),
    { name: 'trip-storage' }
  )
);
