import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PageProps } from "@/utils/types";
import { movieApiInstance } from "@/utils/axiosConfig";
import nextI18NextConfig from "../../next-i18next.config.js";
import Head from "next/head";
import MovieCarousel from "@/components/contents/movieCarousel";
import Filmlist from "@/components/contents/filmList";


const HomePage = ({
  items,
  cdnImageDomain,
  totalItems,
  totalItemsPerPage,
  error,
}: PageProps) => {
 
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>{  "Default Title"}</title>
        <meta
          name="description"
          content={ "Default Description"}
        />
        <meta property="og:type" content={"website"} />
        <meta
          property="og:image"
          content={"/default-image.jpg"}
        />
      </Head>
      <MovieCarousel items={items} cdnImageDomain={cdnImageDomain} />
      <Filmlist items={items} totalItems={totalItems} totalItemsPerPage={totalItemsPerPage} cdnImageDomain={cdnImageDomain} error={error} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const currentLocale = locale || "en";
  const page = query.page ? Number(query.page) : 1;
  try {
    const response = await movieApiInstance.get(`/v1/api/home/?page=${page}`);
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
