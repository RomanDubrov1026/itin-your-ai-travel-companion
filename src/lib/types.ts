// Trip Planning Types

export interface TripFormData {
  // Step 1: Destination
  destination: string;
  origin: string;
  startDate: Date | null;
  endDate: Date | null;
  flexibility: 'strict' | 'flexible';
  travelers: number;

  // Step 2: Interests
  interests: string[];
  pace: 'chill' | 'balanced' | 'intensive';

  // Step 3: Budget
  budgetMin: number;
  budgetMax: number;
  accommodationType: 'apartment' | 'hotel' | 'any';
  hotelQuality: '3' | '4' | '5' | 'any';
  transportPreference: 'cheapest' | 'fastest' | 'best-value';
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  duration: number; // in hours
  price: number; // in PLN
  area: string;
  tags: string[];
  imageUrl?: string;
}

export interface TransportOption {
  id: string;
  type: 'flight' | 'bus' | 'train';
  carrier: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number; // per person in PLN
  preference: 'cheapest' | 'fastest' | 'best-value';
}

export interface HotelOption {
  id: string;
  name: string;
  area: string;
  rating: number; // 1-5 stars
  pricePerNight: number; // in PLN
  totalPrice: number;
  amenities: string[];
  imageUrl?: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  attractions: (Attraction & { included: boolean })[];
}

export interface GeneratedPlan {
  destination: string;
  origin: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  transport: TransportOption;
  hotel: HotelOption;
  itinerary: DayItinerary[];
  totalBudget: {
    transport: number;
    accommodation: number;
    attractions: number;
    food: number;
    total: number;
  };
}

export const DESTINATIONS = [
  'Barcelona',
  'Rome',
  'Paris',
  'Lisbon',
  'Prague',
  'Amsterdam',
  'Vienna',
  'Berlin',
] as const;

export const ORIGINS = [
  'Kraków',
  'Warsaw',
  'Berlin',
  'Vienna',
  'Prague',
] as const;

export const INTERESTS = [
  { id: 'food', label: 'Jedzenie', icon: '🍽️' },
  { id: 'architecture', label: 'Architektura', icon: '🏛️' },
  { id: 'museums', label: 'Muzea', icon: '🎨' },
  { id: 'relaxed', label: 'Spokojne tempo', icon: '🧘' },
  { id: 'nightlife', label: 'Nightlife', icon: '🎉' },
  { id: 'nature', label: 'Natura', icon: '🌿' },
] as const;
