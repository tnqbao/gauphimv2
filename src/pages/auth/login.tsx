import React from "react";
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, Image } from "antd";
import { useTranslation } from 'react-i18next';
import axiosInstance from "@/utils/axiosConfig";

type FieldType = {
  username?: string;
  password?: string;
  keepMeLogin?: string;
};

const Login: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('login');
  const onFinish = async (values: FieldType) => {
    const typeWithStringField = {
      ...values,
      keepMeLogin: values.keepMeLogin?.toString() || "false"  
    };
    try {
      const response = await axiosInstance.post('/api/auth/login', typeWithStringField);
      const data = response.data;
      console.log("Response data:", data);
      alert("Login success: " + data.token);
      router.push("../");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h2 className="text-center text-2xl font-bold mb-6 w-full">
            {t('title')}
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 24 }}
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              label={t('username')}
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t('password')}
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="keepMeLogin" valuePropName="checked" className="text-center">
              <Checkbox>{t('keepMeLoggedIn')}</Checkbox>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t('submitButton')}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/register"> {t('notRegistered')}</a>
            </Form.Item>
          </Form>
        </div>

        <div className="hidden md:block border-l mx-2"></div>

        <div className="hidden md:flex flex-1 justify-center items-center">
          <Image
            className="max-w-full h-auto"
            src="https://i.imgur.com/I9Qjk2t.png"
            alt="Login illustration"
          />
        </div>
      </div>
    </div>
  );
};



export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const currentLocale = locale || 'en';
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ['login', 'common'])),
    },
  };
};

export default Login;
