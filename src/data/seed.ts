import type { AboutData, Collection, Drawing } from '../types';

// Use root-relative paths; place img/ and style/ in public/ for Vite
const img = (name: string) => `/img/${name}`;
const style = (name: string) => `/style/${name}`;

export const seedAbout: AboutData = {
  designerName: 'Zeneth',
  introduction:
    'Zeneth is a fashion designer at the intersection of gothic tradition and street rebellion. Based between shadow and neon, the work explores identity, freedom, and the raw energy of underground culture.',
  philosophy:
    'Fashion as ritual. Every piece is a statement against the mundane—sharp lines meet soft decay, structure meets chaos. We draw from gothic architecture, punk defiance, and the fearless mark-making of graffiti to create wearables that are both armour and art.',
  images: [img('img1.png'), img('img2.png'), img('img3.png')],
};

export const seedCollections: Collection[] = [
  {
    id: 'hk-gothic-rebellion',
    title: 'HK Gothic Rebellion',
    slug: 'hk-gothic-rebellion',
    coverImage: style('style1.png'),
    summary:
      'A collection rooted in the sharpness of punk, the gloom of gothic, and the assertive expression of Hong Kong street graffiti. Black and purple dominate; bat wings and bold typography echo freedom and rebellion.',
    order: 0,
    styles: [
      {
        id: 'style-1',
        title: 'Shadow Crown',
        mainPhoto: style('style1.png'),
        featurePhoto: style('style1.png'),
        description:
          'High-necked silhouettes and structured shoulders frame the face like a crown of shadows. Sharp cuts and minimal ornamentation let the silhouette speak—authority without excess.',
        order: 0,
      },
      {
        id: 'style-2',
        title: 'Night Wing',
        mainPhoto: style('style2.png'),
        featurePhoto: style('style2.png'),
        description:
          'Black and neon purple merge in this look. A pair of dramatic bat-wing details spread like dark night wings, symbolising freedom from shackles. The graffiti-inspired "Night Wing" typography echoes the name and imprints the wildness of street art into the design.',
        order: 1,
      },
      {
        id: 'style-3',
        title: 'Razor Lace',
        mainPhoto: style('style3.png'),
        featurePhoto: style('style3.png'),
        description:
          'Lace and leather collide—delicate patterns cut with razor-sharp lines. A balance of vulnerability and defiance, suited for those who wear both with equal intent.',
        order: 2,
      },
      {
        id: 'style-4',
        title: 'Neon Veins',
        mainPhoto: style('style4.png'),
        featurePhoto: style('style4.png'),
        description:
          'Fluorescent accents trace the body like illuminated veins. Strategic strips of neon pink and cyan against black create a living, breathing map of rebellion.',
        order: 3,
      },
      {
        id: 'style-5',
        title: 'Concrete Bloom',
        mainPhoto: style('style5.png'),
        featurePhoto: style('style5.png'),
        description:
          'Floral motifs break through concrete and chain—beauty growing from the cracks of the urban. A tribute to resilience and the persistence of art in hostile spaces.',
        order: 4,
      },
      {
        id: 'style-6',
        title: 'Midnight Script',
        mainPhoto: style('style6.png'),
        featurePhoto: style('style6.png'),
        description:
          'Hand-drawn, graffiti-style script meets tailored form. Typography becomes texture; words become pattern. For those who wear their words on their sleeve.',
        order: 5,
      },
    ],
  },
];

export const seedDrawings: Drawing[] = [];
