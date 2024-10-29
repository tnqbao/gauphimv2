import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageProps } from "@/utils/types";
import { movieApiInstance } from "@/utils/axiosConfig";
import nextI18NextConfig from "../../next-i18next.config.js";
import Head from "next/head";
import MovieCarousel from "@/components/contents/filmCarousel";
import Filmlist from "@/components/contents/filmList";


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
    <div>
      <Head>
        <title>{  "Gấu Phim"}</title>
        <meta
          name="description"
          content={ "Website xem phim miễn phí, chất lượng cao"}
        />
        <meta property="og:type" content={"website"} />
      </Head>
      <MovieCarousel items={items} cdnImageDomain={cdnImageDomain} />
      <Filmlist items={items} cdnImageDomain={cdnImageDomain} error={error} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || "en";
  try {
    const response = await movieApiInstance.get(`/v1/api/home`);
    const data = response.data.data;

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"],nextI18NextConfig)),
        items: data.items,
        cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
        totalItems : data.params.pagination.totalItems,
        totalItemsPerPage: data.params.pagination.totalItemsPerPage
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"],nextI18NextConfig)),
        items: [],
        cdnImageDomain: "",
        totalItems : 0,
        totalItemsPerPage: 0,
        error: "Error fetching data",
      },
    };
  }
};
export default HomePage;
