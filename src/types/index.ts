export interface AboutData {
  designerName: string;
  introduction: string;
  philosophy: string;
  images: string[];
}

export interface Style {
  id: string;
  title: string;
  mainPhoto: string;
  featurePhoto: string;
  description: string;
  order: number;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  summary: string;
  order: number;
  styles: Style[];
}

export interface Drawing {
  id: string;
  image: string;
  title: string;
  description: string;
  order: number;
}
