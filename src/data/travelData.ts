export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  price: number;
  rating: number;
  season: string;
  duration: string;
  coordinates: { x: number; y: number };
  highlights: string[];
  itinerary: string[];
};

export const destinations: Destination[] = [
  {
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    category: 'Romantic Escape',
    description: 'Caldera sunsets, whitewashed villages and private Aegean sailing.',
    longDescription:
      'A volcanic island of blue-domed villages, quiet vineyards and dazzling light. We shape Santorini around private terraces, unhurried mornings and the caldera at its most serene.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
      'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077',
    ],
    price: 4850,
    rating: 4.9,
    season: 'May – October',
    duration: '5–7 nights',
    coordinates: { x: 52, y: 35 },
    highlights: ['Private caldera sailing', 'Estate wine tasting', 'Akrotiri after hours'],
    itinerary: [
      'Arrive in Imerovigli',
      'Sail the caldera',
      'Village and vineyard day',
      'Aegean at leisure',
    ],
  },
  {
    slug: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Indian Ocean',
    category: 'Beach & Relaxation',
    description: 'Private-island calm, overwater villas and a world beneath the lagoon.',
    longDescription:
      'A constellation of coral atolls designed for complete escape. Travel by seaplane to an intimate island, dive with manta rays and let every day move at the rhythm of the tide.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    gallery: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
      'https://images.unsplash.com/photo-1540202404-a2f29016b523',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    price: 7200,
    rating: 4.9,
    season: 'November – April',
    duration: '6–8 nights',
    coordinates: { x: 67, y: 59 },
    highlights: ['Private sandbank dinner', 'Manta ray safari', 'Sunrise dolphin cruise'],
    itinerary: ['Seaplane arrival', 'Lagoon day', 'Reef expedition', 'Private-island ritual'],
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    category: 'Culture & Heritage',
    description: 'Secret gardens, artisan ateliers and storied riads inside the medina.',
    longDescription:
      'Marrakech is at once theatrical and intimate. Enter through carved cedar doors to hidden courtyards, meet master craftspeople and dine beneath the stars in the Agafay desert.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
    gallery: [
      'https://images.unsplash.com/photo-1671181087708-be3050f1974e',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70',
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43',
    ],
    price: 3100,
    rating: 4.8,
    season: 'March – May',
    duration: '4–6 nights',
    coordinates: { x: 44, y: 44 },
    highlights: ['Private souk guide', 'Atlas Mountains picnic', 'Riad hammam ritual'],
    itinerary: ['Medina arrival', 'Design and artisans', 'Atlas day', 'Agafay sunset'],
  },
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    category: 'Cultural Immersion',
    description: 'Temple gardens, seasonal kaiseki and the poetry of old Japan.',
    longDescription:
      'Kyoto rewards quiet attention. Walk temple grounds before opening, share tea with a master and discover a city where centuries-old ritual lives beside precise modern design.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    gallery: [
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      'https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f',
    ],
    price: 5900,
    rating: 4.9,
    season: 'March – May',
    duration: '6–9 nights',
    coordinates: { x: 84, y: 38 },
    highlights: ['Private temple access', 'Tea ceremony', 'Kaiseki with a local host'],
    itinerary: ['Higashiyama arrival', 'Temple dawn', 'Arashiyama and craft', 'Tea and cuisine'],
  },
  {
    slug: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    category: 'Wellness',
    description: 'Jungle sanctuaries, water temples and restorative island rituals.',
    longDescription:
      'Beyond the beaches, Bali is an island of ceremony and elemental beauty. Stay among rice terraces, visit sacred springs and reset with deeply rooted wellness traditions.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    gallery: [
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
      'https://images.unsplash.com/photo-1533669955142-6a73332af4db',
      'https://images.unsplash.com/photo-1520454974749-611b7248ffdb',
    ],
    price: 3800,
    rating: 4.8,
    season: 'April – October',
    duration: '7–10 nights',
    coordinates: { x: 79, y: 66 },
    highlights: ['Water blessing', 'Private chef table', 'Sunrise volcano walk'],
    itinerary: ['Ubud arrival', 'Temple and village', 'Wellness immersion', 'Coastal retreat'],
  },
  {
    slug: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    category: 'Adventure & Nature',
    description: 'Peak-to-peak rail journeys, pristine pistes and fireside elegance.',
    longDescription:
      'A landscape of precision and grandeur. Move effortlessly between iconic peaks, secluded chalets and Michelin-starred mountain tables by panoramic train and private guide.',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95',
    gallery: [
      'https://images.unsplash.com/photo-1531310197839-ccf54634509e',
      'https://images.unsplash.com/photo-1520962922320-2038eebab146',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb',
    ],
    price: 6400,
    rating: 4.9,
    season: 'December – March',
    duration: '5–7 nights',
    coordinates: { x: 50, y: 30 },
    highlights: ['Glacier train', 'Private ski guide', 'Mountain tasting menu'],
    itinerary: [
      'Lake-side arrival',
      'Panoramic rail',
      'Guided mountain day',
      'Spa and fireside dinner',
    ],
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    category: 'Exclusive Luxury',
    description: 'Boundary-pushing design, desert stillness and effortless service.',
    longDescription:
      'Dubai pairs contemporary ambition with desert heritage. Contrast architecture and world-class dining with a private conservation safari and a night under vast skies.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    gallery: [
      'https://images.unsplash.com/photo-1526495124232-a04e1849168c',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    ],
    price: 5200,
    rating: 4.8,
    season: 'November – March',
    duration: '4–6 nights',
    coordinates: { x: 63, y: 45 },
    highlights: ['Desert conservation safari', 'Private architecture tour', 'Chef’s table'],
    itinerary: ['Skyline arrival', 'Old and new Dubai', 'Desert reserve', 'Coast at leisure'],
  },
  {
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    category: 'Culinary Escape',
    description: 'Cliffside villages, hidden coves and long lunches above the Tyrrhenian.',
    longDescription:
      'The Amalfi Coast is best experienced slowly—from a wooden gozzo, a garden fragrant with lemons, or a table suspended above the sea. We arrange the hard-to-reach beautifully.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca',
    gallery: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1',
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0',
    ],
    price: 6100,
    rating: 4.9,
    season: 'May – September',
    duration: '6–8 nights',
    coordinates: { x: 52, y: 35 },
    highlights: ['Private gozzo charter', 'Lemon grove lunch', 'Path of the Gods'],
    itinerary: ['Positano arrival', 'Capri by boat', 'Ravello gardens', 'Coastal kitchen day'],
  },
];

export type Experience = {
  slug: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  gallery: string[];
  included: string[];
  important: string;
};

export const experiences: Experience[] = [
  {
    slug: 'aegean-private-yacht',
    title: 'Sail the Hidden Cyclades',
    location: 'Cyclades, Greece',
    category: 'Private Yacht Experiences',
    duration: '4 days',
    price: 12800,
    description:
      'A crewed teak-deck yacht journey through quiet coves, small harbours and islands beyond the usual route.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8',
    gallery: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a',
      'https://images.unsplash.com/photo-1615210466215-44e337bf95ac',
    ],
    included: ['Private yacht and crew', 'All meals aboard', 'Island transfers', 'Water equipment'],
    important: 'Best from May to October. Route adapts to sea conditions.',
  },
  {
    slug: 'amalfi-for-two',
    title: 'Amalfi After Hours',
    location: 'Amalfi Coast, Italy',
    category: 'Romantic Escapes',
    duration: '3 days',
    price: 5400,
    description:
      'Sunset sails, a private garden dinner and the coast at its quietest, arranged entirely for two.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca',
    gallery: [
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1',
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0',
    ],
    included: ['Private transfers', 'Sunset boat', 'Garden dinner', 'Local host'],
    important: 'Dietary preferences are welcomed with advance notice.',
  },
  {
    slug: 'bali-wellness',
    title: 'The Island Reset',
    location: 'Ubud, Bali',
    category: 'Wellness & Spa',
    duration: '5 days',
    price: 4200,
    description:
      'A restorative rhythm of water blessings, plant-led cuisine, bodywork and jungle silence.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    gallery: [
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
    ],
    included: ['Private villa', 'Daily treatments', 'Guided rituals', 'Plant-led dining'],
    important: 'All practices are optional and tailored to individual comfort.',
  },
  {
    slug: 'patagonia-expedition',
    title: 'Patagonia in Private',
    location: 'Torres del Paine, Chile',
    category: 'Adventure & Nature',
    duration: '7 days',
    price: 8900,
    description:
      'Glacier trails, puma country and remote lodges with a specialist naturalist at every turn.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    gallery: [
      'https://images.unsplash.com/photo-1531761535209-180857e963b9',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    ],
    included: ['Expert naturalist', 'Private vehicle', 'Luxury lodge', 'All field meals'],
    important: 'A moderate fitness level is recommended; alternative routes are available.',
  },
  {
    slug: 'kyoto-living-craft',
    title: 'Kyoto: The Living Craft',
    location: 'Kyoto, Japan',
    category: 'Cultural Immersion',
    duration: '3 days',
    price: 3600,
    description:
      'Meet ceramicists, textile artists and tea masters preserving Kyoto’s most exacting traditions.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    gallery: [
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
    ],
    included: ['Private cultural guide', 'Three studio visits', 'Tea ceremony', 'Kaiseki lunch'],
    important: 'Studio visits depend on artisans’ working schedules.',
  },
  {
    slug: 'marrakech-table',
    title: 'A Table Through Marrakech',
    location: 'Marrakech, Morocco',
    category: 'Culinary Experiences',
    duration: '2 days',
    price: 1850,
    description:
      'Market mornings, a family kitchen and a desert table illuminate the city through flavour.',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70',
    gallery: [
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
      'https://images.unsplash.com/photo-1671181087708-be3050f1974e',
    ],
    included: ['Private food guide', 'Market tasting', 'Cooking session', 'Desert dinner'],
    important: 'Menus can be adapted for most dietary requirements.',
  },
  {
    slug: 'rome-after-dark',
    title: 'Rome Behind Closed Doors',
    location: 'Rome, Italy',
    category: 'Private Guided Tours',
    duration: '1 evening',
    price: 950,
    description:
      'A historian-led passage through a noble palazzo, hidden church and candlelit Roman supper.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    gallery: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140',
      'https://images.unsplash.com/photo-1555992828-ca4dbe41d294',
    ],
    included: ['Private historian', 'Exclusive entries', 'Driver', 'Three-course supper'],
    important: 'Conservative dress is required for church access.',
  },
  {
    slug: 'antarctica-white-silence',
    title: 'The White Silence',
    location: 'Antarctic Peninsula',
    category: 'Exclusive Luxury Experiences',
    duration: '11 days',
    price: 24800,
    description:
      'A small-ship polar journey with private aviation, expert-led landings and an extraordinary sense of scale.',
    image: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60',
    gallery: [
      'https://images.unsplash.com/photo-1462888210965-cdf193fb74de',
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73',
    ],
    included: ['Suite accommodation', 'All expeditions', 'Polar specialists', 'Charter flight'],
    important: 'Sailing and landings remain weather dependent.',
  },
];

export type Stay = {
  slug: string;
  name: string;
  location: string;
  destination: string;
  type: string;
  price: number;
  rating: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  rooms: string[];
};

export const stays: Stay[] = [
  {
    slug: 'aether-house',
    name: 'Aether House',
    location: 'Imerovigli, Santorini',
    destination: 'Santorini',
    type: 'Boutique Hotels',
    price: 940,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
    ],
    description:
      'A carved-stone retreat suspended above the caldera, with twelve suites and a quietly exceptional table.',
    amenities: ['Infinity pool', 'Private terraces', 'Airport transfer', 'Spa rituals'],
    rooms: ['Caldera Suite', 'Horizon Pool Suite', 'Aether Residence'],
  },
  {
    slug: 'soneva-lagoon',
    name: 'Soneva Lagoon House',
    location: 'Noonu Atoll, Maldives',
    destination: 'Maldives',
    type: 'Overwater Bungalows',
    price: 1850,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd',
    gallery: [
      'https://images.unsplash.com/photo-1540202404-a2f29016b523',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
    ],
    description:
      'Barefoot seclusion with overwater residences, an exceptional reef and a sky observatory above the palms.',
    amenities: ['House reef', 'Private pool', 'Butler service', 'Seaplane transfer'],
    rooms: ['Lagoon Villa', 'Two-Bedroom Retreat', 'Private Reserve'],
  },
  {
    slug: 'dar-zellij',
    name: 'Dar Zellij Privé',
    location: 'Medina, Marrakech',
    destination: 'Marrakech',
    type: 'Private Villas',
    price: 720,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1671181087708-be3050f1974e',
    gallery: [
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70',
    ],
    description:
      'A restored riad reserved in its entirety, centred on a tiled courtyard and fragrant orange trees.',
    amenities: ['Private cook', 'Rooftop terrace', 'Hammam', 'Courtyard pool'],
    rooms: ['Courtyard Room', 'Atlas Suite', 'Whole Riad'],
  },
  {
    slug: 'cedar-kyoto',
    name: 'Cedar Kyoto',
    location: 'Higashiyama, Kyoto',
    destination: 'Kyoto',
    type: 'Luxury Hotels',
    price: 1120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1545048702-79362596cdc9',
    gallery: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
    ],
    description:
      'A contemporary ryokan where cedar, stone and garden views bring a measured calm to the city.',
    amenities: ['Onsen', 'Kaiseki dining', 'Garden', 'Tea room'],
    rooms: ['Garden Room', 'Cedar Suite', 'Machiya Residence'],
  },
  {
    slug: 'silvretta-chalet',
    name: 'Chalet Silvretta',
    location: 'St. Moritz, Switzerland',
    destination: 'Swiss Alps',
    type: 'Mountain Chalets',
    price: 2100,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
    gallery: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      'https://images.unsplash.com/photo-1527668752968-14dc70a27c95',
    ],
    description:
      'A private alpine house of warm oak, open fires and uninterrupted views across the Engadin.',
    amenities: ['Ski-in access', 'Private chef', 'Sauna', 'Chauffeur'],
    rooms: ['Four-bedroom Chalet', 'Six-bedroom Chalet', 'Full Estate'],
  },
  {
    slug: 'cala-verde',
    name: 'Cala Verde',
    location: 'Uluwatu, Bali',
    destination: 'Bali',
    type: 'Beach Resorts',
    price: 680,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
    gallery: [
      'https://images.unsplash.com/photo-1520454974749-611b7248ffdb',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
    ],
    description:
      'Low-slung pavilions, a wild private beach and a thoughtful wellness programme on Bali’s southern cliffs.',
    amenities: ['Private beach', 'Ocean pool', 'Wellness pavilion', 'Surf guide'],
    rooms: ['Garden Pavilion', 'Ocean Villa', 'Three-Bedroom House'],
  },
];

export type Article = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  secondaryImage: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

export const articles: Article[] = [
  {
    slug: 'santorini-beyond-oia',
    category: 'Destination Guides',
    title: 'Santorini beyond Oia: the quiet side of the caldera',
    excerpt:
      'The villages, vineyards and private terraces that reward stepping away from the familiar view.',
    date: 'October 18, 2026',
    readTime: '8 min read',
    author: 'Elena Marchetti',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    secondaryImage: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a',
    intro: 'Santorini’s beauty is no secret. Its quieter pleasures still can be.',
    sections: [
      {
        heading: 'Begin before the island wakes',
        body: 'At first light, Pyrgos belongs to church bells, bakers and the occasional cat. The lanes climb without spectacle, revealing blue water in fragments between old stone walls.',
      },
      {
        heading: 'Follow the volcanic soil',
        body: 'The island’s basket-trained vines sit close to the earth, protected from the wind. A private tasting turns the landscape into something you can understand through texture, salt and smoke.',
      },
    ],
  },
  {
    slug: 'slow-luxury',
    category: 'Luxury Travel',
    title: 'The case for slow luxury',
    excerpt: 'Why fewer stops and deeper stays are shaping the journeys we remember.',
    date: 'October 9, 2026',
    readTime: '6 min read',
    author: 'Julien Armand',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    intro: 'The rarest travel luxury may simply be enough time to notice where you are.',
    sections: [
      {
        heading: 'The value of staying',
        body: 'A third morning changes a place. The route to breakfast becomes familiar, names replace introductions and a destination begins to feel less like scenery.',
      },
      {
        heading: 'Depth over distance',
        body: 'Removing a flight often adds an entire day. That recovered time becomes a long lunch, an unplanned swim or a conversation that no itinerary could manufacture.',
      },
    ],
  },
  {
    slug: 'marrakech-riads',
    category: 'Culture & Heritage',
    title: 'Inside the living craft of a Marrakech riad',
    excerpt: 'Tea, tilework and the patient art of restoring the medina’s courtyard homes.',
    date: 'September 29, 2026',
    readTime: '7 min read',
    author: 'Amira Benali',
    image: 'https://images.unsplash.com/photo-1671181087708-be3050f1974e',
    secondaryImage: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
    intro: 'Behind an unmarked wall, an entire vocabulary of pattern and proportion survives.',
    sections: [
      {
        heading: 'A house turned inward',
        body: 'The riad reveals nothing to the street. Its beauty is saved for the central courtyard, where water, shade and geometry make a private climate.',
      },
      {
        heading: 'Made by many hands',
        body: 'Plaster, cedar and zellij each demand a different mastery. Restoration is less about perfection than allowing those materials to speak together again.',
      },
    ],
  },
  {
    slug: 'kyoto-dawn',
    category: 'Hidden Gems',
    title: 'Kyoto at dawn',
    excerpt: 'Four quiet hours among temple gardens, market stalls and cedar-scented lanes.',
    date: 'September 17, 2026',
    readTime: '5 min read',
    author: 'Naomi Ishikawa',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36',
    secondaryImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
    intro: 'Before the shutters rise, Kyoto’s smallest sounds become the city’s clearest guide.',
    sections: [
      {
        heading: 'The first gate',
        body: 'Arrive as moss is still silver with dew. Without a crowd, a temple garden is not an image but a sequence of pauses.',
      },
      {
        heading: 'Breakfast at the market',
        body: 'By eight, knives touch boards and stock begins to steam. The best breakfast is assembled slowly, one counter at a time.',
      },
    ],
  },
  {
    slug: 'island-wellness',
    category: 'Wellness',
    title: 'Wellness rooted in place',
    excerpt: 'Island rituals that offer more than a beautiful setting.',
    date: 'September 4, 2026',
    readTime: '7 min read',
    author: 'Mara Ellis',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef',
    secondaryImage: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8',
    intro: 'The most lasting reset begins by listening to the culture around it.',
    sections: [
      {
        heading: 'Beyond the treatment room',
        body: 'Water, plants, food and community are not spa concepts here. They are daily practices, adapted with care for visitors rather than staged for them.',
      },
      {
        heading: 'A gentler itinerary',
        body: 'A restorative journey needs space. We build in mornings with no agenda and let energy, not a checklist, decide the shape of the day.',
      },
    ],
  },
  {
    slug: 'amalfi-table',
    category: 'Food & Dining',
    title: 'The Amalfi table, from garden to sea',
    excerpt: 'Lemons, anchovies and the cooks who turn a steep coastline into a cuisine.',
    date: 'August 22, 2026',
    readTime: '9 min read',
    author: 'Luca Ferri',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca',
    secondaryImage: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1',
    intro: 'Here, dinner begins on a terrace hundreds of steps above the harbour.',
    sections: [
      {
        heading: 'A vertical pantry',
        body: 'Terraces make agriculture possible on impossible slopes. Lemons grow enormous in the filtered shade of chestnut pergolas.',
      },
      {
        heading: 'The long lunch',
        body: 'Courses arrive according to what came from the water that morning. The point is not abundance but attention.',
      },
    ],
  },
  {
    slug: 'desert-night',
    category: 'Travel Inspiration',
    title: 'One night under an open desert sky',
    excerpt: 'On silence, starlight and the journeys that recalibrate our sense of scale.',
    date: 'August 8, 2026',
    readTime: '4 min read',
    author: 'Sofia Laurent',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    secondaryImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
    intro: 'Some landscapes do their best work after the light disappears.',
    sections: [
      {
        heading: 'The long horizon',
        body: 'Distance simplifies everything. With no architecture to frame it, sunset becomes less an event than a gradual change in temperature and sound.',
      },
      {
        heading: 'After dark',
        body: 'Dinner is served by firelight. Later, the absence of ambient light makes the sky feel almost architectural.',
      },
    ],
  },
  {
    slug: 'art-of-arrival',
    category: 'Luxury Travel',
    title: 'The lost art of arrival',
    excerpt: 'Why the first hour of a journey deserves as much thought as the last.',
    date: 'July 28, 2026',
    readTime: '6 min read',
    author: 'Elena Marchetti',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
    secondaryImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1',
    intro: 'A beautiful journey should begin before the hotel door opens.',
    sections: [
      {
        heading: 'Remove the friction',
        body: 'The best welcome is often invisible: a driver who knows the route, a room already prepared and no form to complete when you are tired.',
      },
      {
        heading: 'Create a threshold',
        body: 'A first walk, a particular drink or a view revealed at the right moment can gently mark the transition from transit to presence.',
      },
    ],
  },
];
