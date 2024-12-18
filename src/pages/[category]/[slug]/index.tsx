import React from "react";
import FilmList from "@/components/contents/film-list";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {movieApiInstance} from "@/utils/axios.config";
import {PageProps} from "@/utils/types";
import {handleSlug} from "@/utils/helper";
import Pagination from "@/components/pagination";
import Head from "next/head";
import {useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";

const Slug: React.FC<PageProps> = ({items, cdnImageDomain, totalItems, totalItemsPerPage, error}) => {
    const pageCategory = useSelector((state: RootState) => state.navigate.category);
    const pageTitle = `${pageCategory} | Danh sách phim mới nhất`;
    const pageDescription = `Xem danh sách phim ${pageCategory} mới nhất. Cập nhật liên tục, hấp dẫn, chất lượng cao!`;
    const pageUrl = `https://gauphim.daudoo.com/${pageCategory}`;
    return (
        <div className="p-10">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription}/>
                <meta name="keywords"
                      content="danh sách phim, phim mới, phim chất lượng cao, đủ thể loại trên Gấu Phim"/>
                <meta property="og:title" content={pageTitle}/>
                <meta property="og:description" content={pageDescription}/>
                <meta property="og:url" content={pageUrl}/>
                <meta property="og:type" content="website"/>
                <meta property="og:image" content={`${cdnImageDomain}/one-piece-3d-gekisou-trap-coaster.jpg`}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {error && <p className="text-red-500">{error}</p>}
            <div className="pb-10">
                <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage}/>
            </div>
            <FilmList items={items} cdnImageDomain={cdnImageDomain} error={error}/>
            <div className="pt-10">
                <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage}/>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale, query}) => {
    const currentLocale = locale || "en";
    const page = query.page ? Number(query.page) : 1;
    const category = Array.isArray(query.category) ? handleSlug(query.category[0]) : handleSlug(query.category || "");
    const slug = Array.isArray(query.slug) ? handleSlug(query.slug[0]) : handleSlug(query.slug || "");
    try {
        const response = await movieApiInstance.get(`/v1/api/${category}/${slug}?page=${page}`);
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
