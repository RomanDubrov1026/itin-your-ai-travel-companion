import type { Attraction, TransportOption, HotelOption, DayItinerary, GeneratedPlan, TripFormData } from './types';

// Barcelona Attractions Dataset
const barcelonaAttractions: Attraction[] = [
  {
    id: 'sagrada-familia',
    name: 'Sagrada Família',
    description: "Gaudí's iconic unfinished basilica",
    duration: 2.5,
    price: 95,
    area: 'Eixample',
    tags: ['architecture', 'museums'],
  },
  {
    id: 'park-guell',
    name: 'Park Güell',
    description: 'Colorful mosaic park by Gaudí',
    duration: 2,
    price: 45,
    area: 'Gràcia',
    tags: ['architecture', 'nature'],
  },
  {
    id: 'la-boqueria',
    name: 'La Boqueria Market',
    description: 'Famous food market on La Rambla',
    duration: 1.5,
    price: 0,
    area: 'Gothic Quarter',
    tags: ['food'],
  },
  {
    id: 'casa-batllo',
    name: 'Casa Batlló',
    description: "Gaudí's masterpiece on Passeig de Gràcia",
    duration: 1.5,
    price: 140,
    area: 'Eixample',
    tags: ['architecture'],
  },
  {
    id: 'gothic-quarter',
    name: 'Gothic Quarter Walk',
    description: 'Medieval streets and hidden squares',
    duration: 2,
    price: 0,
    area: 'Gothic Quarter',
    tags: ['architecture', 'relaxed'],
  },
  {
    id: 'barceloneta',
    name: 'Barceloneta Beach',
    description: 'City beach with seafood restaurants',
    duration: 3,
    price: 0,
    area: 'Barceloneta',
    tags: ['nature', 'relaxed', 'food'],
  },
  {
    id: 'picasso-museum',
    name: 'Picasso Museum',
    description: "Extensive collection of Picasso's early works",
    duration: 2,
    price: 55,
    area: 'El Born',
    tags: ['museums'],
  },
  {
    id: 'el-born',
    name: 'El Born District',
    description: 'Trendy bars, boutiques and tapas spots',
    duration: 2.5,
    price: 0,
    area: 'El Born',
    tags: ['food', 'nightlife'],
  },
  {
    id: 'montjuic',
    name: 'Montjuïc Hill',
    description: 'Castle, gardens and panoramic views',
    duration: 3,
    price: 30,
    area: 'Montjuïc',
    tags: ['nature', 'architecture'],
  },
  {
    id: 'flamenco-show',
    name: 'Flamenco Show',
    description: 'Traditional Spanish dance performance',
    duration: 1.5,
    price: 120,
    area: 'Gothic Quarter',
    tags: ['nightlife'],
  },
  {
    id: 'camp-nou',
    name: 'Camp Nou Tour',
    description: 'FC Barcelona stadium experience',
    duration: 2,
    price: 100,
    area: 'Les Corts',
    tags: ['museums'],
  },
  {
    id: 'tapas-tour',
    name: 'Tapas Food Tour',
    description: 'Guided culinary experience',
    duration: 3,
    price: 85,
    area: 'Various',
    tags: ['food'],
  },
  {
    id: 'bunkers',
    name: 'Bunkers del Carmel',
    description: 'Best sunset viewpoint in Barcelona',
    duration: 1.5,
    price: 0,
    area: 'El Carmel',
    tags: ['nature', 'relaxed'],
  },
  {
    id: 'miro-museum',
    name: 'Fundació Joan Miró',
    description: 'Modern art museum on Montjuïc',
    duration: 1.5,
    price: 55,
    area: 'Montjuïc',
    tags: ['museums'],
  },
  {
    id: 'gracia-neighborhood',
    name: 'Gràcia Neighborhood',
    description: 'Bohemian quarter with local vibes',
    duration: 2,
    price: 0,
    area: 'Gràcia',
    tags: ['relaxed', 'food'],
  },
];

// Transport Options
const transportOptions: TransportOption[] = [
  {
    id: 'flight-cheap',
    type: 'flight',
    carrier: 'Ryanair',
    departureTime: '06:15',
    arrivalTime: '09:30',
    duration: '3h 15m',
    price: 180,
    preference: 'cheapest',
  },
  {
    id: 'flight-fast',
    type: 'flight',
    carrier: 'LOT Polish Airlines',
    departureTime: '10:00',
    arrivalTime: '12:45',
    duration: '2h 45m',
    price: 420,
    preference: 'fastest',
  },
  {
    id: 'flight-value',
    type: 'flight',
    carrier: 'Vueling',
    departureTime: '08:30',
    arrivalTime: '11:30',
    duration: '3h',
    price: 280,
    preference: 'best-value',
  },
];

// Hotel Options
const hotelOptions: HotelOption[] = [
  {
    id: 'hotel-budget',
    name: 'Generator Barcelona',
    area: 'Gràcia',
    rating: 3,
    pricePerNight: 280,
    totalPrice: 0,
    amenities: ['WiFi', 'Bar', 'Terrace'],
  },
  {
    id: 'hotel-mid',
    name: 'Hotel Jazz',
    area: 'Eixample',
    rating: 4,
    pricePerNight: 450,
    totalPrice: 0,
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant'],
  },
  {
    id: 'hotel-luxury',
    name: 'Hotel Arts Barcelona',
    area: 'Barceloneta',
    rating: 5,
    pricePerNight: 1200,
    totalPrice: 0,
    amenities: ['WiFi', 'Pool', 'Spa', 'Beach Access', 'Restaurant'],
  },
  {
    id: 'apartment-1',
    name: 'Gothic Quarter Apartment',
    area: 'Gothic Quarter',
    rating: 4,
    pricePerNight: 380,
    totalPrice: 0,
    amenities: ['WiFi', 'Kitchen', 'Washer'],
  },
  {
    id: 'apartment-2',
    name: 'El Born Loft',
    area: 'El Born',
    rating: 4,
    pricePerNight: 420,
    totalPrice: 0,
    amenities: ['WiFi', 'Kitchen', 'Terrace', 'Washer'],
  },
];

// Service Functions
export function getAttractions(destination: string, interests: string[]): Attraction[] {
  if (destination.toLowerCase() !== 'barcelona') {
    // Return subset for other destinations (mock)
    return barcelonaAttractions.slice(0, 8);
  }

  if (interests.length === 0) {
    return barcelonaAttractions;
  }

  // Filter and prioritize by interests
  const filtered = barcelonaAttractions.filter((a) =>
    a.tags.some((tag) => interests.includes(tag))
  );

  return filtered.length > 0 ? filtered : barcelonaAttractions;
}

export function searchTransport(
  _origin: string,
  _destination: string,
  _dates: { start: Date; end: Date },
  _travelers: number,
  preference: string
): TransportOption[] {
  // Return sorted by preference
  const sorted = [...transportOptions].sort((a, b) => {
    if (a.preference === preference) return -1;
    if (b.preference === preference) return 1;
    return 0;
  });
  return sorted;
}

export function searchHotels(
  _destination: string,
  nights: number,
  budget: { min: number; max: number },
  quality: string,
  accommodationType: string
): HotelOption[] {
  let filtered = hotelOptions.map((h) => ({
    ...h,
    totalPrice: h.pricePerNight * nights,
  }));

  // Filter by type
  if (accommodationType === 'apartment') {
    filtered = filtered.filter((h) => h.name.includes('Apartment') || h.name.includes('Loft'));
  } else if (accommodationType === 'hotel') {
    filtered = filtered.filter((h) => h.name.includes('Hotel') || h.name.includes('Generator'));
  }

  // Filter by quality
  if (quality !== 'any') {
    const minRating = parseInt(quality);
    filtered = filtered.filter((h) => h.rating >= minRating);
  }

  // Filter by budget (nightly rate)
  filtered = filtered.filter(
    (h) => h.pricePerNight >= budget.min / nights && h.pricePerNight <= budget.max / nights
  );

  // If no matches, return all with calculated totals
  if (filtered.length === 0) {
    return hotelOptions.map((h) => ({ ...h, totalPrice: h.pricePerNight * nights }));
  }

  return filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
}

export function buildItinerary(
  attractions: Attraction[],
  tripLengthDays: number,
  pace: 'chill' | 'balanced' | 'intensive'
): DayItinerary[] {
  const maxHoursPerDay = pace === 'chill' ? 4 : pace === 'balanced' ? 6 : 8;
  const itinerary: DayItinerary[] = [];

  // Group by area for efficient routing
  const byArea = attractions.reduce((acc, attr) => {
    if (!acc[attr.area]) acc[attr.area] = [];
    acc[attr.area].push(attr);
    return acc;
  }, {} as Record<string, Attraction[]>);

  const areas = Object.keys(byArea);
  let attractionIndex = 0;
  const flatAttractions = areas.flatMap((area) => byArea[area]);

  for (let day = 1; day <= tripLengthDays; day++) {
    let hoursUsed = 0;
    const dayAttractions: (Attraction & { included: boolean })[] = [];
    const dayTitles: string[] = [];

    while (hoursUsed < maxHoursPerDay && attractionIndex < flatAttractions.length) {
      const attr = flatAttractions[attractionIndex];
      if (hoursUsed + attr.duration <= maxHoursPerDay + 1) {
        dayAttractions.push({ ...attr, included: true });
        hoursUsed += attr.duration;
        if (!dayTitles.includes(attr.area)) {
          dayTitles.push(attr.area);
        }
      }
      attractionIndex++;
    }

    itinerary.push({
      day,
      title: `Dzień ${day}: ${dayTitles.slice(0, 2).join(' & ') || 'Odpoczynek'}`,
      attractions: dayAttractions,
    });
  }

  return itinerary;
}

export function estimateTotal(
  transport: TransportOption,
  hotel: HotelOption,
  itinerary: DayItinerary[],
  travelers: number,
  nights: number
): GeneratedPlan['totalBudget'] {
  const transportTotal = transport.price * travelers * 2; // round trip
  const accommodationTotal = hotel.pricePerNight * nights;
  const attractionsTotal = itinerary
    .flatMap((d) => d.attractions)
    .filter((a) => a.included)
    .reduce((sum, a) => sum + a.price * travelers, 0);
  const foodEstimate = 120 * travelers * (nights + 1); // 120 PLN per person per day

  return {
    transport: transportTotal,
    accommodation: accommodationTotal,
    attractions: attractionsTotal,
    food: foodEstimate,
    total: transportTotal + accommodationTotal + attractionsTotal + foodEstimate,
  };
}

export function generatePlan(formData: TripFormData): GeneratedPlan {
  const startDate = formData.startDate || new Date();
  const endDate = formData.endDate || new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);
  const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const attractions = getAttractions(formData.destination, formData.interests);
  const transports = searchTransport(
    formData.origin,
    formData.destination,
    { start: startDate, end: endDate },
    formData.travelers,
    formData.transportPreference
  );
  const hotels = searchHotels(
    formData.destination,
    nights,
    { min: formData.budgetMin, max: formData.budgetMax },
    formData.hotelQuality,
    formData.accommodationType
  );

  const selectedTransport = transports[0];
  const selectedHotel = hotels[0];
  const itinerary = buildItinerary(attractions, nights + 1, formData.pace);
  const totalBudget = estimateTotal(selectedTransport, selectedHotel, itinerary, formData.travelers, nights);

  return {
    destination: formData.destination,
    origin: formData.origin,
    startDate,
    endDate,
    travelers: formData.travelers,
    transport: selectedTransport,
    hotel: { ...selectedHotel, totalPrice: selectedHotel.pricePerNight * nights },
    itinerary,
    totalBudget,
  };
}
