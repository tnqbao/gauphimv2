import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Layout } from 'antd';
import nextI18NextConfig from '../../next-i18next.config.js';
import { movieApiInstance } from "@/utils/axiosConfig";

const { Content } = Layout;

interface HomePageProps {
  data: Record<string, unknown> | null;
  error?: string;
}

const HomePage: React.FC<HomePageProps> = ({ data, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Content>
        <h1>Welcome to the Home Page</h1>
        <h2>Data from API</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Content>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || 'en';
  try {
    const response = await movieApiInstance('/v1/api/home');
    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
        data: response.data as Record<string, unknown>,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        ...(await serverSideTranslations(currentLocale, ['common'], nextI18NextConfig)),
        data: null,
        error: 'Error fetching data',
      },
    };
  }
};

export default HomePage;
