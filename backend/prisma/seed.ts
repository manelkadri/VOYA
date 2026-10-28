import { PrismaClient, PublishStatus, SubscriptionTier } from '@prisma/client';
import { destinations, experiences, stays } from '../../src/data/travelData';

const prisma = new PrismaClient();

async function main() {
  await prisma.subscriptionPlan.upsert({
    where: { code: SubscriptionTier.FREE },
    update: {},
    create: {
      code: SubscriptionTier.FREE,
      name: 'Free',
      description: 'Plan and save the essentials for your next journey.',
      priceMonthlyCents: 0,
      favoriteLimit: 10,
      tripLimit: 3,
      features: ['10 favorites', '3 saved trips', 'Standard reservation requests', 'Standard destination access'],
    },
  });
  await prisma.subscriptionPlan.upsert({
    where: { code: SubscriptionTier.PREMIUM },
    update: {},
    create: {
      code: SubscriptionTier.PREMIUM,
      name: 'Premium',
      description: 'Priority access and benefits for discerning travelers.',
      priceMonthlyCents: 4900,
      favoriteLimit: null,
      tripLimit: null,
      features: ['Unlimited favorites', 'Unlimited saved trips', 'Priority reservations', 'Exclusive destinations and experiences', 'Premium travel benefits'],
    },
  });

  for (const [index, item] of destinations.entries()) {
    await prisma.destination.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        slug: item.slug,
        name: item.name,
        country: item.country,
        region: item.region,
        category: item.category,
        description: item.description,
        longDescription: item.longDescription,
        heroImageUrl: item.image,
        gallery: item.gallery,
        priceFromCents: item.price * 100,
        rating: item.rating,
        season: item.season,
        duration: item.duration,
        coordinates: item.coordinates,
        highlights: item.highlights,
        itinerary: item.itinerary,
        featured: index < 4,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  const allDestinations = await prisma.destination.findMany({ select: { id: true, name: true, country: true } });
  for (const [index, item] of experiences.entries()) {
    const destination = allDestinations.find((candidate) => item.location.includes(candidate.name) || item.location.includes(candidate.country));
    await prisma.experience.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        destinationId: destination?.id,
        slug: item.slug,
        title: item.title,
        location: item.location,
        category: item.category,
        description: item.description,
        heroImageUrl: item.image,
        gallery: item.gallery,
        priceFromCents: item.price * 100,
        duration: item.duration,
        inclusions: item.included,
        featured: index < 4,
        premiumOnly: item.category === 'Exclusive Luxury Experiences',
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  for (const [index, item] of stays.entries()) {
    const destination = allDestinations.find((candidate) => candidate.name === item.destination);
    if (!destination) {
      console.warn(`Skipping ${item.slug}; destination ${item.destination} is not present.`);
      continue;
    }
    await prisma.hotel.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        destinationId: destination.id,
        slug: item.slug,
        name: item.name,
        category: item.type,
        description: item.description,
        address: item.location,
        heroImageUrl: item.image,
        gallery: item.gallery,
        priceFromCents: item.price * 100,
        rating: item.rating,
        amenities: item.amenities,
        rooms: item.rooms,
        featured: index < 4,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }
}

main()
  .then(() => console.info('VOYA seed complete.'))
  .finally(() => prisma.$disconnect());
