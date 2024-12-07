import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {PageProps} from "@/utils/types";
import {movieApiInstance} from "@/utils/axios.config";
import nextI18NextConfig from "../../next-i18next.config.js";
import Head from "next/head";
import MovieCarousel from "@/components/contents/film-carousel";
import FilmList from "@/components/contents/film-list";


const HomePage = ({
                      items,
                      cdnImageDomain,
                      totalItems,
                      totalItemsPerPage,
                      error,
                  }: PageProps) => {
    console.log(totalItems);
    console.log(totalItemsPerPage);
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Head>
                <title>{"Gấu Phim"}</title>
                <meta
                    name="description"
                    content={"Gấu Phim - Website xem phim miễn phí, chất lượng cao"}
                />
                <meta property="og:type" content={"website"}/>
            </Head>
            <main>
                <MovieCarousel items={items} cdnImageDomain={cdnImageDomain}/>
                <FilmList items={items} cdnImageDomain={cdnImageDomain} error={error}/>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = (async ({locale}) => {
    const currentLocale = locale || "en";
    try {
        const response = await movieApiInstance.get(`/v1/api/home`);
        const data = response.data.data;

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
                items: data.items,
                cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
                totalItems: data.params.pagination.totalItems,
                totalItemsPerPage: data.params.pagination.totalItemsPerPage
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);

        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["common"], nextI18NextConfig)),
                items: [],
                cdnImageDomain: "",
                totalItems: 0,
                totalItemsPerPage: 0,
                error: "Error fetching data",
            },
        };
    }
});
export default HomePage;
