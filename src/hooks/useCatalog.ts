'use client';

import { useEffect, useState } from 'react';
import type { Destination, Experience, Stay } from '@/data/travelData';
import { apiFetch } from '@/lib/api';

export type CatalogRecord<T> = T & { id: string; premiumOnly: boolean };

type DestinationApi = {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  category: string;
  description: string;
  longDescription: string;
  heroImageUrl?: string;
  gallery: string[];
  priceFromCents: number;
  rating?: string | number;
  season?: string;
  duration?: string;
  coordinates?: { x: number; y: number };
  highlights: string[];
  itinerary: string[];
  premiumOnly: boolean;
};
type ExperienceApi = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  description: string;
  heroImageUrl?: string;
  gallery: string[];
  priceFromCents: number;
  duration?: string;
  inclusions: string[];
  premiumOnly: boolean;
};
type HotelApi = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  heroImageUrl?: string;
  gallery: string[];
  priceFromCents: number;
  rating?: string | number;
  amenities: string[];
  rooms: string[];
  premiumOnly: boolean;
  destination: { name: string };
};

export function useDestinations() {
  const [items, setItems] = useState<CatalogRecord<Destination>[]>([]);
  useEffect(() => {
    apiFetch<DestinationApi[]>('/api/v1/destinations?pageSize=100')
      .then((rows) =>
        setItems(
          rows.map((item) => ({
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
            premiumOnly: item.premiumOnly,
          }))
        )
      )
      .catch(() => setItems([]));
  }, []);
  return items;
}

export function useExperiences() {
  const [items, setItems] = useState<CatalogRecord<Experience>[]>([]);
  useEffect(() => {
    apiFetch<ExperienceApi[]>('/api/v1/experiences?pageSize=100')
      .then((rows) =>
        setItems(
          rows.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            location: item.location,
            category: item.category,
            description: item.description,
            image: item.heroImageUrl ?? '/assets/images/image-fallback.svg',
            gallery: item.gallery ?? [],
            price: item.priceFromCents / 100,
            duration: item.duration ?? 'Tailor-made',
            included: item.inclusions ?? [],
            important: 'Final arrangements are confirmed by your VOYA concierge.',
            premiumOnly: item.premiumOnly,
          }))
        )
      )
      .catch(() => setItems([]));
  }, []);
  return items;
}

export function useHotels() {
  const [items, setItems] = useState<CatalogRecord<Stay>[]>([]);
  useEffect(() => {
    apiFetch<HotelApi[]>('/api/v1/hotels?pageSize=100')
      .then((rows) =>
        setItems(
          rows.map((item) => ({
            id: item.id,
            slug: item.slug,
            name: item.name,
            location: item.address ?? item.destination.name,
            destination: item.destination.name,
            type: item.category,
            description: item.description,
            image: item.heroImageUrl ?? '/assets/images/image-fallback.svg',
            gallery: item.gallery ?? [],
            price: item.priceFromCents / 100,
            rating: Number(item.rating ?? 0),
            amenities: item.amenities ?? [],
            rooms: item.rooms ?? [],
            premiumOnly: item.premiumOnly,
          }))
        )
      )
      .catch(() => setItems([]));
  }, []);
  return items;
}
