import React from "react";
import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {useTranslation} from "react-i18next";
import Register from "@/components/auth/register";


const RegisterPage: React.FC = () => {
    const { t } = useTranslation("register");
    return (
        <>
            <Head>
                <title> {t('title')}</title>
                <meta
                    name="description"
                    content={"Đăng kí tài khoản trên Gấu Phim"}
                />
                <meta property="og:type" content={"website"}/>
                <meta property={"og:title"} content={t('title')}/>
                <meta property={"og:description"} content={"Đăng kí tài khoản trên Gấu Phim"}/>
                <meta property={"og:image"} content={"https://i.imgur.com/sACJNuE.png"} />
                <meta property={"og:url"} content={"https://gauphim.daudoo.com/auth/register"} />
            </Head>
            <body>
                <Register />
            </body>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
    const currentLocale = locale || "en";
    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ["register", "common"])),
        },
    };
};

export default RegisterPage;
