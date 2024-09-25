import React from "react";
import { useRouter } from "next/router";
import { Button, Checkbox, Form, Input } from "antd";

const Login: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);
      localStorage.setItem("token", data.token);
      alert("Login success: " + data.token);

      // Redirect to home after successful login
      router.push("../");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white p-2 border rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex flex-wrap flex-1 p-4 items-center justify-center">
          <h2 className="text-center text-2xl font-bold mb-6 w-full">Welcome back!</h2>
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
          <img
            src="https://i.imgur.com/aMY5YTJ.png"
            alt="Login illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
