import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TripFormData, GeneratedPlan } from '@/lib/types';

interface TripStore {
  // Form data
  formData: TripFormData;
  setFormData: (data: Partial<TripFormData>) => void;
  
  // Generated plan
  generatedPlan: GeneratedPlan | null;
  setGeneratedPlan: (plan: GeneratedPlan | null) => void;
  
  // Toggle attraction inclusion
  toggleAttraction: (dayIndex: number, attractionId: string) => void;
  
  // Reset
  reset: () => void;
}

const initialFormData: TripFormData = {
  // Step 1 defaults (demo scenario)
  destination: 'Barcelona',
  origin: 'Kraków',
  startDate: null,
  endDate: null,
  flexibility: 'flexible',
  travelers: 2,
  
  // Step 2 defaults
  interests: ['food', 'architecture', 'relaxed'],
  pace: 'balanced',
  
  // Step 3 defaults
  budgetMin: 3000,
  budgetMax: 4000,
  accommodationType: 'any',
  hotelQuality: 'any',
  transportPreference: 'best-value',
};

export const useTripStore = create<TripStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      
      generatedPlan: null,
      
      setGeneratedPlan: (plan) => set({ generatedPlan: plan }),
      
      toggleAttraction: (dayIndex, attractionId) =>
        set((state) => {
          if (!state.generatedPlan) return state;
          
          const newItinerary = [...state.generatedPlan.itinerary];
          const day = newItinerary[dayIndex];
          if (!day) return state;
          
          const attrIndex = day.attractions.findIndex((a) => a.id === attractionId);
          if (attrIndex === -1) return state;
          
          day.attractions[attrIndex] = {
            ...day.attractions[attrIndex],
            included: !day.attractions[attrIndex].included,
          };
          
          // Recalculate totals
          const attractionsTotal = newItinerary
            .flatMap((d) => d.attractions)
            .filter((a) => a.included)
            .reduce((sum, a) => sum + a.price * state.generatedPlan!.travelers, 0);
          
          const newTotal =
            state.generatedPlan.totalBudget.transport +
            state.generatedPlan.totalBudget.accommodation +
            attractionsTotal +
            state.generatedPlan.totalBudget.food;
          
          return {
            generatedPlan: {
              ...state.generatedPlan,
              itinerary: newItinerary,
              totalBudget: {
                ...state.generatedPlan.totalBudget,
                attractions: attractionsTotal,
                total: newTotal,
              },
            },
          };
        }),
      
      reset: () =>
        set({
          formData: initialFormData,
          generatedPlan: null,
        }),
    }),
    {
      name: 'itin-trip-storage',
    }
  )
);
