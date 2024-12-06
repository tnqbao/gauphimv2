import { Film } from '@/utils/types';
import { GetServerSideProps } from "next";
import { handleSlug } from "@/utils/helper";
import { movieApiInstance } from "@/utils/axios.config";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FilmDetail from "@/components/contents/film-detail";
import { useDispatch } from "react-redux";
import {addEpisode, addPosterUrl, setFilmName, setPlayUrl} from "@/utils/redux/slices/player";
import {changeEpisode} from "@/utils/redux/slices/navigate";

const Detail: React.FC<{ filmDetails: Film }> = ({ filmDetails }) => {
    const dispatch = useDispatch();
    dispatch(addEpisode(filmDetails.episodes));
    dispatch(addPosterUrl(filmDetails.poster_url));
    dispatch(setPlayUrl(filmDetails.episodes[0].link_m3u8));
    dispatch(changeEpisode(1))
    dispatch(setFilmName(filmDetails.name));
    return <FilmDetail filmDetails={filmDetails}  />;
};


export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
    const currentLocale = locale || "en";
    const slug = handleSlug(query.slug as string);

    try {
        const response = await movieApiInstance.get(`/v1/api/phim/${slug}`);
        const data = response.data.data;
        const episodes = Array.isArray(data.item.episodes[0]?.server_data)
            ? data.item.episodes[0].server_data.map(
                (episode: { name: string; slug: string; filename: string; link_embed: string; link_m3u8: string }) => ({
                    name: episode.name,
                    link_m3u8: episode.link_m3u8,
                })
            )
            : [];
        const filmDetails: Film = {
            origin_name: data.item.origin_name || "",
            name: data.item.name || "",
            content: data.item.content || "",
            thumb_url: data.item.thumb_url || "",
            poster_url: data.item.poster_url || "",
            trailer_url : data.item.trailer_url || "",
            quality: data.item.quality || "",
            episode_current: data.item.episode_current || "",
            episode_total: data.item.episode_total || "",
            actor: data.item.actor || [],
            director: data.item.director || "",
            episodes: episodes || [],
            category : data.item.category || [],
            breadcrumbs: data.breadcrumbs || [],
            update_time : data.item.modified.time || "",
            country: data.item.country[0].name || "",
            slug : data.item.slug || ""
        };

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"])),
                filmDetails,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"])),
                filmDetails: {
                    origin_name: "",
                    name: "",
                    content: "",
                    thumb_url: "",
                    poster_url: "",
                    trailer_url: "",
                    quality: "",
                    episode_current: "",
                    episode_total: "",
                    actor: [],
                    director: "",
                    episodes: [],
                    breadcrumbs: [],
                    update_time: "",
                    country: "",
                    category: [],
                    slug: "",
                },
                error: "Error fetching data",
            },
        };
    }
};


export default Detail;
