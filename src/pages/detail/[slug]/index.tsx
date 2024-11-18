import { Film } from '@/utils/types';
import { GetServerSideProps } from "next";
import { handleSlug } from "@/utils/helper";
import { movieApiInstance } from "@/utils/axios.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FilmDetail from "@/components/contents/filmDetail";
import {useDispatch} from "react-redux";
import {addEpisode, addPosterUrl} from "@/utils/redux/store/slices/player";

const Detail: React.FC<Film> = ({
                                    origin_name ,
                                    name ,
                                    content ,
                                    actor,
                                    director,
                                    episodes,
                                    episode_total,
                                    episode_current,
                                    quality,
                                    poster_url,
                                    thumb_url,
                                }) => {
    const dispacth = useDispatch();
    dispacth(addEpisode(episodes));
    dispacth(addPosterUrl(poster_url));
    return (
        <FilmDetail
            origin_name={origin_name}
            name={name}
            content={content}
            actor={actor}
            director={director}
            episodes={episodes}
            episode_total={episode_total}
            episode_current={episode_current}
            quality={quality}
            poster_url={poster_url}
            thumb_url={thumb_url}
        />
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
    const currentLocale = locale || "en";
    const slug = handleSlug(query.slug as string);

    try {
        const response = await movieApiInstance.get(`/v1/api/phim/${slug}`);
        const data = response.data.data;
        const episodes = Array.isArray(data.item.episodes[0]?.server_data)
            ? data.item.episodes[0]?.server_data?.map((episode: { name: string, slug: string, filename: string, link_embed: string, link_m3u8: string }) => episode.link_m3u8)
            : [];
        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"])),
                origin_name: data.item.origin_name || "",
                name: data.item.name || "",
                content: data.item.content || "",
                thumb_url: data.item.thumb_url || "",
                poster_url: data.item.poster_url || "",
                quality: data.item.quality || "",
                episode_current: data.item.eposide_current || "",
                episode_total: data.item.eposide_total || "",
                actor: data.item.actor || "",
                director: data.item.director || "",
                episodes:  episodes || [],
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"])),
                origin_name: "",
                name: "",
                content: "",
                thumb_url: "",
                poster_url: "",
                quality: "",
                episode_current: "",
                episode_total: "",
                actor: "",
                director: "",
                episodes: "",
                error: "Error fetching data",
            },
        };
    }
};

export default Detail;
