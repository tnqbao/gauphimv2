import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "../../next-i18next.config.js";
import Head from "next/head";
import { movieApiInstance } from "@/utils/axiosConfig";
import MovieCarousel from "@/components/contents/movieCarousel";

interface SeoOnPage {
  titleHead: string;
  descriptionHead: string;
  og_type: string;
  og_image: string[];
}

interface Item {
  _id: string;
  name: string;
  origin_name : string;
  thumb_url: string;
  slug: string;
}

interface HomePageProps {
  seoOnPage: SeoOnPage;
  items: Item[];
  cdnImageDomain: string;
  error?: string;
}

const HomePage = ({
  seoOnPage,
  items,
  cdnImageDomain,
  error,
}: HomePageProps) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Head>
        <title>{seoOnPage?.titleHead || "Default Title"}</title>
        <meta
          name="description"
          content={seoOnPage?.descriptionHead || "Default Description"}
        />
        <meta property="og:type" content={seoOnPage?.og_type || "website"} />
        <meta
          property="og:image"
          content={seoOnPage?.og_image[0] || "/default-image.jpg"}
        />
      </Head>
      <MovieCarousel items={items} cdnImageDomain={cdnImageDomain} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || "en";

  try {
    const response = await movieApiInstance.get("/v1/api/home");
    const data = response.data.data;

    return {
      props: {
        ...(await serverSideTranslations(
          currentLocale,
          ["common"],
          nextI18NextConfig
        )),
        seoOnPage: data.seoOnPage,
        items: data.items,
        cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        ...(await serverSideTranslations(
          currentLocale,
          ["common"],
          nextI18NextConfig
        )),
        seoOnPage: null,
        items: [],
        cdnImageDomain: "",
        error: "Error fetching data",
      },
    };
  }
};

export default HomePage;
