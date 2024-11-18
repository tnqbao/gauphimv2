import React from "react";
import Filmlist from "@/components/contents/filmList";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { movieApiInstance } from "@/utils/axios.config";
import { PageProps } from "@/utils/types";
import { handleSlug } from "@/utils/helper";
import Pagination from "@/components/pagination";

const Category: React.FC<PageProps> = ({ items, cdnImageDomain, totalItems, totalItemsPerPage, error }) => {
  return (
    <div className="p-10">
      {error && <p className="text-red-500">{error}</p>}
      <div className="pb-10">
        <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage} />
      </div>
      <Filmlist items={items} cdnImageDomain={cdnImageDomain} error={error} />
      <div className="pt-10">
        <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const currentLocale = locale || "en";
  const page = query.page ? Number(query.page) : 1;
  const category = Array.isArray(query.category) ? handleSlug(query.category[0]) : handleSlug(query.category || "");
  try {
    const response = await movieApiInstance.get(`/v1/api/danh-sach/${category}?page=${page}`);
    const data = response.data.data;

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"])),
        items: data.items,
        cdnImageDomain: data.APP_DOMAIN_CDN_IMAGE,
        totalItems: data.params.pagination.totalItems,
        totalItemsPerPage: data.params.pagination.totalItemsPerPage,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ["common"])),
        items: [],
        cdnImageDomain: "",
        totalItems: 0,
        totalItemsPerPage: 0,
        error: "Error fetching data",
      },
    };
  }
};

export default Category;
