export type DestinationCard = {
  id: string;
  name: string;
  country: string;
  category: string;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
  nights: string;
  bestSeason: string;
  peakNow: boolean;
  fromPrice: number;
};

export const destinations: DestinationCard[] = [
  {
    id: 'dest-santorini',
    name: 'Santorini',
    country: 'Greece',
    category: 'Island Escape',
    image: 'https://images.unsplash.com/photo-1618478751717-b2fc9412fd11',
    alt: 'White-washed cliffside resort with blue domes above the Aegean at sunset in Santorini',
    rating: 4.9,
    reviews: 312,
    nights: '5–7 nights',
    bestSeason: 'May – Oct',
    peakNow: true,
    fromPrice: 4850,
  },
  {
    id: 'dest-maldives',
    name: 'Maldives',
    country: 'Maldives',
    category: 'Overwater Retreat',
    image: 'https://images.unsplash.com/photo-1561182340-29445681a5d2',
    alt: 'Overwater villas with thatched roofs over turquoise lagoon in the Maldives',
    rating: 4.9,
    reviews: 458,
    nights: '6–8 nights',
    bestSeason: 'Nov – Apr',
    peakNow: false,
    fromPrice: 7200,
  },
  {
    id: 'dest-marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    category: 'Cultural Discovery',
    image: 'https://images.unsplash.com/photo-1468076977594-de735be3dfa9',
    alt: 'Terracotta rooftops and ornate riad courtyard in Marrakech, Morocco',
    rating: 4.8,
    reviews: 276,
    nights: '4–6 nights',
    bestSeason: 'Mar – May, Oct – Nov',
    peakNow: true,
    fromPrice: 3100,
  },
  {
    id: 'dest-swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    category: 'Alpine Sanctuary',
    image: 'https://images.unsplash.com/photo-1734378016824-ee656e856c44',
    alt: 'Snow-dusted Swiss Alps peaks above a quiet mountain village at dawn',
    rating: 4.9,
    reviews: 204,
    nights: '5–7 nights',
    bestSeason: 'Dec – Mar, Jun – Sep',
    peakNow: false,
    fromPrice: 6400,
  },
];

export type ExperienceTile = {
  id: string;
  slug?: string;
  title: string;
  blurb: string;
  image: string;
  alt: string;
  count: string;
  from: string;
  icon: 'Heart' | 'Leaf' | 'Ship' | 'Landmark';
};

export const experiences: ExperienceTile[] = [
  {
    id: 'exp-romantic',
    title: 'Romantic Escapes',
    blurb: 'Candlelit cliffside dinners, private sunset sails and suites made for two.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_49160104a-1789048523427.png',
    alt: 'Couple dining at a candlelit table overlooking the sea at dusk',
    count: '38 journeys',
    from: 'From $5,400',
    icon: 'Heart',
  },
  {
    id: 'exp-wellness',
    title: 'Wellness Retreats',
    blurb: 'Silent mornings, thermal rituals and healers in the world’s quietest corners.',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_132edc4a8-1772445380897.png',
    alt: 'Serene spa treatment room with stones and orchids beside a window',
    count: '24 journeys',
    from: 'From $4,200',
    icon: 'Leaf',
  },
  {
    id: 'exp-yacht',
    title: 'Private Yacht Experiences',
    blurb: 'Captained charters through the Cyclades, Amalfi and the Indian Ocean.',
    image: 'https://images.unsplash.com/photo-1615210466215-44e337bf95ac',
    alt: 'Luxury white yacht anchored in a calm turquoise bay',
    count: '17 journeys',
    from: 'From $12,800',
    icon: 'Ship',
  },
  {
    id: 'exp-culture',
    title: 'Cultural Discovery',
    blurb: 'After-hours museum access, master artisans and tables only locals know.',
    image: 'https://images.unsplash.com/photo-1669475929451-d16ba936ec83',
    alt: 'Ancient Kyoto temple with wooden pagoda surrounded by autumn foliage',
    count: '31 journeys',
    from: 'From $3,600',
    icon: 'Landmark',
  },
];

export type JournalArticle = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  alt: string;
};

export const articles: JournalArticle[] = [
  {
    id: 'article-santorini-beyond-oia',
    category: 'Destination Guide',
    title: 'Santorini beyond Oia: where to find the quiet side of the caldera',
    excerpt:
      'Skip the sunset crowds. Our editors map the hidden villages, family-run wineries and private terraces worth the detour.',
    author: 'Elena Marchetti',
    date: 'Oct 18, 2026',
    readTime: '8 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_183140805-1783965720752.png',
    alt: 'Quiet whitewashed lane in a Santorini village at golden hour',
  },
  {
    id: 'article-slow-luxury',
    category: 'Inspiration',
    title: 'The case for slow luxury: fewer stops, deeper stays',
    excerpt:
      'Why our most requested itineraries now cover one region in ten days instead of three countries in seven.',
    author: 'Julien Armand',
    date: 'Oct 9, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1724293716080-ba40529f11cc',
    alt: 'Infinity pool at a luxury resort overlooking the ocean at sunrise',
  },
  {
    id: 'article-marrakech-riads',
    category: 'Culture & Lifestyle',
    title: 'Inside a Marrakech riad: tea, tilework and the art of arrival',
    excerpt:
      'A morning with the craftspeople who restore the medina’s most beautiful courtyard houses, one zellige tile at a time.',
    author: 'Amira Benali',
    date: 'Sep 29, 2026',
    readTime: '7 min read',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ef717048-1786026750485.png',
    alt: 'Moroccan riad courtyard with a tiled fountain and arched doorways',
  },
];

export type ProofStat = {
  id: string;
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  decimals: number;
};

export const proofStats: ProofStat[] = [
  {
    id: 'stat-journeys',
    value: 4280,
    suffix: '+',
    prefix: '',
    label: 'Journeys crafted since 2014',
    decimals: 0,
  },
  {
    id: 'stat-countries',
    value: 67,
    suffix: '',
    prefix: '',
    label: 'Countries with trusted local partners',
    decimals: 0,
  },
  {
    id: 'stat-repeat',
    value: 78,
    suffix: '%',
    prefix: '',
    label: 'Travelers who book with VOYA again',
    decimals: 0,
  },
  {
    id: 'stat-response',
    value: 2,
    suffix: ' hrs',
    prefix: '< ',
    label: 'Average concierge response time',
    decimals: 0,
  },
];

export type NavLink = { id: string; label: string; href: string };

export const navLinks: NavLink[] = [
  { id: 'nav-destinations', label: 'Destinations', href: '/destinations' },
  { id: 'nav-experiences', label: 'Experiences', href: '/experiences' },
  { id: 'nav-stays', label: 'Stays', href: '/stays' },
  { id: 'nav-journal', label: 'Journal', href: '/journal' },
  { id: 'nav-concierge', label: 'Concierge', href: '/concierge' },
];

export const experienceTypes = [
  'Any experience',
  'Romantic Escape',
  'Wellness Retreat',
  'Private Yacht',
  'Cultural Discovery',
  'Adventure & Nature',
];

export const searchDestinationOptions = [
  'Santorini, Greece',
  'Maldives',
  'Marrakech, Morocco',
  'Swiss Alps, Switzerland',
  'Kyoto, Japan',
  'Bali, Indonesia',
];
