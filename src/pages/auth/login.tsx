import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Form, Input, Image, Flex} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { userApiInstance } from "@/utils/axiosConfig";
import { useCookies } from 'react-cookie'; 


type FieldType = {
  username?: string;
  password?: string;
  keepMeLogin?: string;
};

const Login: React.FC = () => {
  const [cookies] = useCookies(['auth_token']);
  const [form] = Form.useForm();
  const router = useRouter();
  const { t } = useTranslation("login");
  const onFinish = async (values: FieldType) => {
    const typeWithStringField = {
      ...values,
      keepMeLogin: values.keepMeLogin?.toString() ?? "false",
    };
    try {
      const response = await userApiInstance.post(
        "/api/auth/login",
        typeWithStringField
      );
      if (response.status === 200) {
        alert(cookies.auth_token)
        router.push("../");
      }
    } catch {
      form.setFields([
        {
          name: "username",
          errors: [t("invalidInput")],
        },
        {
          name: "password",
          errors: [t("invalidInput")],
        },
      ]);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full md:my-10">
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h1 className="text-center text-2xl font-bold mb-6 w-full">
            {t("title")}
          </h1>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
            labelCol={{ span: 24 }}
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              name="username"
              label={t("username")}
              rules={[{ required: true, message: t("pleaseInputUsername") }]}
            >
              <Input prefix={<UserOutlined />} placeholder={t("username")} />
            </Form.Item>
            <Form.Item
              name="password"
              label={t("password")}
              rules={[{ required: true, message: t("pleaseInputPassword") }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder={t("password")}
              />
            </Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item
                name="keepMeLogin"
                valuePropName="checked"
                className="text-center"
              >
                <Checkbox>{t("keepMeLoggedIn")}</Checkbox>
              </Form.Item>
              <Form.Item>
                <a href="#">{t("forgotPassword")}</a>
              </Form.Item>
            </Flex>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                {t("submitButton")}
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../auth/register"> {t("notRegistered")}</a>
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
  const currentLocale = locale || "en";
  return {
    props: {
      ...(await serverSideTranslations(currentLocale, ["login", "common"])),
    },
  };
};

export default Login;
