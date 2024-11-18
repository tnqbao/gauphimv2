import VideoPlayer from "@/components/contents/VideoPlayer";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

const Watch: React.FC = () => {
    const episodes = useSelector((state: RootState) => state.player.episodes);
    const poster_url = useSelector((state: RootState) => state.player.poster_url);
    const play_url = episodes.length > 0 ? episodes[0] : "";
    console.log(episodes[0]);
    return (
        <div>
            <VideoPlayer link_m3u8={play_url} poster_url={poster_url} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["common"])),
        },
    };
};

export default Watch;
