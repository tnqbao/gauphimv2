import React from "react";
import FilmList from "@/components/contents/film-list";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {movieApiInstance} from "@/utils/axios.config";
import {PageProps} from "@/utils/types";
import {handleSlug} from "@/utils/helper";
import Pagination from "@/components/pagination";

const Slug: React.FC<PageProps> = ({items, cdnImageDomain, totalItems, totalItemsPerPage, error}) => {
    return (
        <main>
            <div className="p-10">
                {error && <p className="text-red-500">{error}</p>}
                <div className="pb-10">
                    <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage}/>
                </div>
                <FilmList items={items} cdnImageDomain={cdnImageDomain} error={error}/>
                <div className="pt-10">
                    <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage}/>
                </div>
            </div>
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale, query}) => {
    const currentLocale = locale || "en";
    const page = query.page ? Number(query.page) : 1;
    const slug = Array.isArray(query.slug) ? handleSlug(query.slug[0]) : handleSlug(query.slug || "");
    try {
        const response = await movieApiInstance.get(`/v1/api/tim-kiem?keyword=${slug}?page=${page}`);
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

export default Slug;
