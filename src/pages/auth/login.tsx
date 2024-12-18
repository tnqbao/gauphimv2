import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Login from "@/components/auth/login";
import Head from "next/head";
import {useTranslation} from "react-i18next";


const LoginPage: React.FC = () => {
    const {t} = useTranslation("login");
    return (
        <>
            <Head>
                <title> {t('title')}</title>
                <meta
                    name="description"
                    content={"Đăng nhập tài khoản trên Gấu Phim"}
                />
                <meta property="og:type" content={"website"}/>
                <meta property={"og:title"} content={t('title')}/>
                <meta property={"og:description"} content={"Đăng kí tài khoản trên Gấu Phim"}/>
                <meta property={"og:image"} content={"https://i.imgur.com/sACJNuE.png"}/>
                <meta property={"og:url"} content={"https://gauphim.daudoo.com/auth/login"}/>
            </Head>
            <Login/>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({locale}) => {
        const currentLocale = locale || "en";
        return {
            props: {
                ...(await serverSideTranslations(currentLocale, ["login", "common"])),
            },
        };
    }
;

export default LoginPage;
