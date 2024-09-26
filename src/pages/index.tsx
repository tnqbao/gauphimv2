import React from 'react';
import { Layout, theme } from 'antd';
const {Content } = Layout;

const App: React.FC = () => {
  const {
    token: {},
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: '0 48px' }}>
          
      </Content>
      
    </Layout>
  );
};

export default App;
