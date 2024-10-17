import { FC, useState } from "react";
import { Carousel } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface MovieItem {
  _id: string;
  name: string;
  origin_name: string;
  slug: string;
}

interface MovieCarouselProps {
  items: MovieItem[];
  cdnImageDomain: string;
}

const MovieCarousel: FC<MovieCarouselProps> = ({ items, cdnImageDomain }) => {
  const router = useRouter();
  const { t } = useTranslation("common")
  const [currentBackground, setCurrentBackground] = useState<string>(
    `${cdnImageDomain}/uploads/movies/${items[0]?.slug}-poster.jpg`
  );

  const handleBeforeChange = (current: number, next: number) => {
    setCurrentBackground(
      `${cdnImageDomain}/uploads/movies/${items[next]?.slug}-poster.jpg`
    );
  };

  const handleClick = (slug: string) => {
    router.push(`/film/${slug}`);
  };

  return (
    <div
      className="relative mx-5 md:mx-20 my-5 rounded-lg "
      style={{
        backgroundImage: `url(${currentBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Carousel
        autoplay
        arrows
        className="w-full "
        dots={false}
        draggable
        beforeChange={handleBeforeChange}
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center cursor-pointer"
            onClick={() => handleClick(item.slug)}
          >
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent">
              <div className="absolute bottom-3 left-3 md:bottom-10 md:left-10 right-2 text-white font-semibold text-xl cursor-pointer">
              <h1 className="text-3xl font-bold">{(t('watch')==="Xem ngay") ? item.name : item.origin_name}</h1>
                <button className="mt-4 px-4 py-2 bg-black text-orange-400 rounded cursor-pointer">
                  {t('watch')}
                </button>
              </div>
            </div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
