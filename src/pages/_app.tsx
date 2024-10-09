import { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import { AppProps, AppContext } from 'next/app';
import { Layout } from 'antd';
import i18n from '../../i18n'; 
import HeaderComp from '@/components/header';
import FooterComp from '@/components/footer';
import '@/styles/globals.css';

const { Content } = Layout;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const browserLanguage = navigator.language || 'en';
    if (i18n.language !== browserLanguage) {
      i18n.changeLanguage(browserLanguage);
    }
  }, []);
  return (
    <Layout>
      <HeaderComp />
      <Content>
        <Component {...pageProps} />
      </Content>
      <FooterComp />
    </Layout>
  );
}

App.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const language = ctx.req ? ctx.req.headers['accept-language'] : navigator.language;
  if (i18n.language !== language) {
    await i18n.changeLanguage(language);
  }
  
  return {};
};

export default appWithTranslation(App);
