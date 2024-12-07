import VideoPlayer from "@/components/contents/video-player";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {useRouter} from "next/router";
import {Divider} from "antd";
import ChapterSelector from "@/components/contents/chapter-selector";
import Head from "next/head";

const Watch: React.FC = () => {
    const router = useRouter();
    const {ep, slug} = router.query as { ep: string; slug: string };
    const episodes = useSelector((state: RootState) => state.player.episodes);
    const poster_url = useSelector((state: RootState) => state.player.poster_url);
    const name = useSelector((state: RootState) => state.player.name);
    const epIndex = ep ? parseInt(ep as string, 10) : 0;
    const play_url =
        episodes[epIndex]?.link_m3u8 || episodes[0]?.link_m3u8 || "";
    const pageUrl = `https://gauphim.daudoo.com/watch/${slug}?ep=${epIndex}`;
    return (
        <div>
            <Head>
                <title>{`Tập ${(epIndex == 0) ? "Dài" : epIndex} | ${name}`}</title>
                <meta name="keywords" content={`${name} tập ${epIndex}`}/>
                <meta property="og:title" content={`Tập ${(epIndex == 0) ? "Dài" : epIndex} | ${name}`}/>
                <meta property="og:description" content={`Phim ${name} tập ${(epIndex == 0) ? "Dài" : epIndex}`}/>
                <meta property="og:url" content={pageUrl}/>
                <meta property="og:type" content="website"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <main>
                <VideoPlayer link_m3u8={play_url} poster_url={poster_url}/>
                <Divider/>
                <ChapterSelector slug={slug}/>
            </main>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["common"])),
        },
    };
};

export default Watch;
