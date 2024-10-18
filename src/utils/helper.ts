export const handleSlug = (str: string) => {
    str = str.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
    switch (str) {
      case "trang-chu"      : case "home"       : str = "phim-moi"        ; break;
      case "phim-bo"        : case "series"     : str = "phim-bo"         ; break;
      case "phim-le"        : case "movies"     : str = "phim-le"         ; break; 
      case "hoat-hinh"      : case "animation"  : str = "hoat-hinh"       ; break;
      case "ct-truyen-hinh" : case "shows"      : str = "tv-shows"        ; break;
      case "sap-chieu"      : case "coming-soon": str = "phim-sap-chieu"  ; break;
      case "vietsub"        :                     str = "phim-vietsub"    ; break;
      case "thuyet-minh"    :                     str = "phim-thuyet-minh"; break;   
      default:                                                              break;   
    }
    return str
  };
