const slugMap: { [key: string]: string } = {
  "country" : "quoc-gia",
  "quoc-gia" : "quoc-gia",
  "the-loai" : "the-loai",
  "categories" : "the-loai",
  "trang-chu": "phim-moi",
  "home": "phim-moi",
  "phim-bo": "phim-bo",
  "series": "phim-bo",
  "phim-le": "phim-le",
  "movies": "phim-le",
  "hoat-hinh": "hoat-hinh",
  "animation": "hoat-hinh",
};

export const handleSlug = (str: string) => {
  str = str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return slugMap[str] || str;
};
