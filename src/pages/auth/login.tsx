import {GetServerSideProps} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Login from "@/components/auth/login";
import Head from "next/head";


const LoginPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Login />
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
