
export interface PageProps {
  items: Item[];
  cdnImageDomain: string;
  totalItems : number;
  totalItemsPerPage : number;
  error?: string;
}

export interface FilmCardProps {
  film: Film;
  cdnImageDomain: string;
}

export interface PaginationProps {
  totalItems : number;
  totalItemsPerPage : number;
}

export interface SeoOnPage {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  og_image: string[];
}


export interface Film {
  name: string;
  slug: string;
  thumb_url: string;
  quality?: string;
  episode_current?: string;
}

export interface Item {
  _id: string;
  name: string;
  origin_name: string;
  thumb_url: string;
  slug: string;
}

export interface FilmListProps {
  items: Item[];
  cdnImageDomain: string; 
  error?: string;
}

export const country: { [key: string]: string } = {
  "country" : "quoc-gia",
  "quoc-gia" : "quoc-gia",
  "vietnam" : "vietnam",
  "viet-nam" : "vietnam",
  "": "phim-moi",
  "home": "phim-moi",
  "phim-bo": "phim-bo",
  "series": "phim-bo",
  "phim-le": "phim-le",
  "movies": "phim-le",
  "hoat-hinh": "hoat-hinh",
  "animation": "hoat-hinh",
};