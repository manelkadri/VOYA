import type { Destination, Experience, Stay } from '@/data/travelData';
import { cookies } from 'next/headers';

const apiUrl = (process.env.NEXT_PUBLIC_VOYA_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');

async function get<T>(path: string): Promise<T | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join('; ');
    const response = await fetch(`${apiUrl}${path}`, {
      cache: 'no-store',
      headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    });
    if (!response.ok) return null;
    const body = await response.json();
    return body.success ? (body.data as T) : null;
  } catch {
    return null;
  }
}

type ApiRecord = Record<string, any>;

export async function destinationBySlug(
  slug: string
): Promise<(Destination & { id: string; hotels: Stay[]; experiences: Experience[] }) | null> {
  const item = await get<ApiRecord>(`/api/v1/destinations/${encodeURIComponent(slug)}`);
  if (!item) return null;
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    country: item.country,
    region: item.region,
    category: item.category,
    description: item.description,
    longDescription: item.longDescription,
    image: item.heroImageUrl ?? '/assets/images/image-fallback.svg',
    gallery: item.gallery ?? [],
    price: item.priceFromCents / 100,
    rating: Number(item.rating ?? 0),
    season: item.season ?? 'On request',
    duration: item.duration ?? 'Tailor-made',
    coordinates: item.coordinates ?? { x: 50, y: 50 },
    highlights: item.highlights ?? [],
    itinerary: item.itinerary ?? [],
    hotels: (item.hotels ?? []).map(mapHotel),
    experiences: (item.experiences ?? []).map(mapExperience),
  };
}

export async function experienceBySlug(
  slug: string
): Promise<(Experience & { id: string }) | null> {
  const item = await get<ApiRecord>(`/api/v1/experiences/${encodeURIComponent(slug)}`);
  return item ? { id: item.id, ...mapExperience(item) } : null;
}

export async function hotelBySlug(slug: string): Promise<(Stay & { id: string }) | null> {
  const item = await get<ApiRecord>(`/api/v1/hotels/${encodeURIComponent(slug)}`);
  return item ? { id: item.id, ...mapHotel(item) } : null;
}

function mapExperience(item: ApiRecord): Experience {
  return {
    slug: item.slug,
    title: item.title,
    location: item.location,
    category: item.category,
    duration: item.duration ?? 'Tailor-made',
    price: item.priceFromCents / 100,
    description: item.description,
    image: item.heroImageUrl ?? '/assets/images/image-fallback.svg',
    gallery: item.gallery ?? [],
    included: item.inclusions ?? [],
    important: 'Final access and arrangements are confirmed by your VOYA concierge.',
  };
}

function mapHotel(item: ApiRecord): Stay {
  return {
    slug: item.slug,
    name: item.name,
    location: item.address ?? item.destination?.name ?? '',
    destination: item.destination?.name ?? '',
    type: item.category,
    price: item.priceFromCents / 100,
    rating: Number(item.rating ?? 0),
    image: item.heroImageUrl ?? '/assets/images/image-fallback.svg',
    gallery: item.gallery ?? [],
    description: item.description,
    amenities: item.amenities ?? [],
    rooms: item.rooms ?? [],
  };
}
