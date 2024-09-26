import FooterComp from '@/components/footer';
import HeaderComp from '@/components/header';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { Flex, Layout } from 'antd';

const {Content } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <Flex gap="middle" wrap>
    <Layout>
      <HeaderComp />
      <Content ><Component {...pageProps} /></Content>
      <FooterComp />
    </Layout>
    </Flex>
    </>
  );
}