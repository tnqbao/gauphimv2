import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input, Image } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  externalToken?: string;
};

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await axios.post("https://api.daudoo.com/api/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      console.log("Response data:", data);
      localStorage.setItem("token", data.token);

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
            Welcome back!
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: false }}
            onFinish={onFinish}
            autoComplete="off"
            className="flex flex-col justify-evenly w-full h-full"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" className="text-center">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item className="text-center">
              <Button type="primary" size="large" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

            <Form.Item className="text-right">
              <a href="../user/register">No account? Create one.</a>
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

export default Login;
