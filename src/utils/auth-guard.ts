import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import cookie from 'cookie';
export const withAuth = (gssp: GetServerSideProps) => {
    return async (context: GetServerSidePropsContext) => {
        const { req } = context;
        const cookies = req.headers && req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
        const token = cookies.jwt;

        if (!token) {
            return {
                redirect: {
                    destination: '../auth/login',
                    permanent: false,
                },
            };
        }
        return gssp(context);
    };
};