import React from "react";
import { useRouter } from "next/router";
import { FilmCardProps } from "@/utils/types";
import Image from "next/image";

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
        <div
            className="relative p-2 border border-gray-800 rounded-lg cursor-pointer hover:shadow-lg m-2 hover:contrast-100 object-fill text-transparent hover:backdrop-brightness-200 duration-300 transition-transform transform hover:scale-105"
            onClick={handleFilmClick}
            style={{ height: "400px" }}
        >
            <div className="relative w-full h-full">
                <Image
                    src={`https://img.ophim.live/uploads/movies/${film.thumb_url}`}
                    alt={film.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="rounded-md"
                    loading="lazy"
                />
                {film.quality && (
                    <span className="absolute top-2 left-2 bg-red-600 text-black text-xs font-bold px-2 py-1 rounded">
            {film.quality}
          </span>
                )}
                {film.episode_current && (
                    <span className="absolute top-2 right-2 bg-green-600 text-black text-xs font-bold px-2 py-1 rounded">
            {film.episode_current}
          </span>
                )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent">
                <div className="absolute bottom-2 left-2 right-2 text-white font-semibold text-xl">
                    {displayName}
                </div>
            </div>
        </div>
    );
};

export default FilmCard;
