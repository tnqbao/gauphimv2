import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content, Footer } = Layout;

const Login = () => {
  const colorBgContainer = '#fff'; 
  const borderRadiusLG = '8px'; 
  return (
    <Layout>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} by Quocbao
      </Footer>
    </Layout>
  );
};

export default Login;