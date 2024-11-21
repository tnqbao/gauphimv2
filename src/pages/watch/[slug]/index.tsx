import VideoPlayer from "@/components/contents/video-player";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { useRouter } from "next/router";

const Watch: React.FC = () => {
    const router = useRouter();
    const { ep } = router.query;
    const episodes = useSelector((state: RootState) => state.player.episodes);
    const poster_url = useSelector((state: RootState) => state.player.poster_url);
    const epIndex = ep ? parseInt(ep as string, 10) : 0;
    const play_url =
        episodes[epIndex]?.link_m3u8 || episodes[0]?.link_m3u8 || "";
    return (
        <div>
            <title>  </title>
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
