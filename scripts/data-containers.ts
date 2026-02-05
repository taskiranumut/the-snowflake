const containerImagesUrl = process.env.SUPABASE_CONTAINER_IMAGES_URL!;

export const containers = [
  {
    name: '001',
    max_capacity: 2,
    regular_price: 525,
    discount: 0,
    image:
      containerImagesUrl +
      '0039c655-240e-4bfb-82e3-e85d24736ee7-container-1.webp',
    description:
      'Cozy retreat for couples with a fireplace and a hot tub on the deck, surrounded by serene forest scenery.',
  },
  {
    name: '002',
    max_capacity: 2,
    regular_price: 400,
    discount: 25,
    image:
      containerImagesUrl +
      '343a996d-0c1b-436c-be26-40bd24973a50-container-8.webp',
    description:
      'Intimate escape near a gentle stream, featuring warm wood interiors and a private deck with forest views.',
  },
  {
    name: '003',
    max_capacity: 4,
    regular_price: 650,
    discount: 0,
    image:
      containerImagesUrl +
      'ebf0137e-21e3-4451-bab1-39a3ec5fb5f1-container-3.webp',
    description:
      'Family-friendly container with modern amenities, nestled beside a cascading waterfall for a memorable stay.',
  },
  {
    name: '004',
    max_capacity: 4,
    regular_price: 600,
    discount: 50,
    image:
      containerImagesUrl +
      '1ba1e5c9-762f-4231-8f08-2bab2f278e57-container-2.webp',
    description:
      'Luxurious family container offering a fusion of comfort and nature by the river, with a spacious deck.',
  },
  {
    name: '005',
    max_capacity: 6,
    regular_price: 900,
    discount: 0,
    image:
      containerImagesUrl +
      '6e0b1420-d93c-4db1-9cd3-0d2d1c5fc031-container-6.webp',
    description:
      'Spacious retreat for groups, with a backdrop of towering trees and a hot tub for relaxation under the stars.',
  },
  {
    name: '006',
    max_capacity: 6,
    regular_price: 800,
    discount: 100,
    image:
      containerImagesUrl +
      'f31bb426-a0bb-4b37-892c-831630028d4a-container-5.webp',
    description:
      'Elegant container with panoramic forest views, ideal for larger groups seeking adventure and luxury.',
  },
  {
    name: '007',
    max_capacity: 8,
    regular_price: 1200,
    discount: 100,
    image:
      containerImagesUrl +
      'd1315730-d2e5-44be-8c9a-49e5b14f2971-container-7.webp',
    description:
      'Grand accommodation for up to 8 guests, featuring exquisite living spaces and direct access to nature trails.',
  },
  {
    name: '008',
    max_capacity: 10,
    regular_price: 2100,
    discount: 0,
    image:
      containerImagesUrl +
      '87fe0d4c-d20f-4eff-9740-de9dc438546d-container-4.webp',
    description:
      'Opulent sanctuary for large groups, with lavish interiors and a serene setting by a pristine lake.',
  },
];
