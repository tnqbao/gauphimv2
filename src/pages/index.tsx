import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';

const { Content } = Layout;

const HomePage = () => {
  return (
    <Layout>
      <Content>
        <h1>Welcome to the Home Page</h1>
      </Content>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
    },
  };
};

export default HomePage;
