import React from "react";
import { useRouter } from "next/router";
import { Card, Image, Tag } from "antd";
import { FilmCardProps } from "@/utils/types";



const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const router = useRouter();

  const handleFilmClick = () => {
    router.push(`/detail/${film.slug}`);
  };

  const nameLength = film.name.length;
  const displayName =
    nameLength > 30
      ? `${film.name.substring(0, 45)}...`
      : nameLength <= 14
      ? `${film.name}       `
      : film.name;

  return (
    <div className="relative p-2 border border-gray-800 rounded-lg cursor-pointer m-2 hover:shadow-lg object-fill text-transparent hover:backdrop-brightness-200 transition-transform duration-300 transform hover:scale-105 md:h-[350px]">

      <Card
        onClick={handleFilmClick}
        className="relative w-full h-full rounded-lg overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        <Image
          alt={film.name}
          src={`https://img.ophim.live/uploads/movies/${film.thumb_url}`}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          preview={false}
        />

        {film.quality && (
          <Tag color="#ffffff" style={{ position: "absolute", top: 10, left: 10, backgroundColor: "red" }}>
            {film.quality}
          </Tag>
        )}
        {film.episode_current && (
          <Tag
            color="#ffffff"
            style={{ position: "absolute", top: 10, right: 10, backgroundColor: "green" }}
          >
            {film.episode_current}
          </Tag>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent">
          <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-base">
            {displayName}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FilmCard;
