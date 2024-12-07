import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Button, Checkbox, Form, Image, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "@/utils/redux/slices/auth";

type DataType = {
    username?: string;
    password?: string;
    keepMeLogin?: string;
};

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { t } = useTranslation("login");
    const dispatch = useDispatch();

    const handleFormError = () => {
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
    };

    const onFinish = async (values: DataType): Promise<void> => {
        try {
            const dataRequest = {
                ...values,
                keepMeLogin: values.keepMeLogin?.toString() ?? "false",
            };

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataRequest),
            });

            if (response.status !== 200) {
                throw new Error("Invalid login credentials");
            }

            const data = await response.json();
            dispatch(setUser(data.user));
            dispatch(setAuth(true));

            if (values.keepMeLogin === "true") {
                localStorage.setItem("fullname", data.user.fullname);
            } else {
                sessionStorage.setItem("fullname", data.user.fullname);
            }

            await router.push("../");
        } catch {
            handleFormError();
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

                        <div className="flex justify-between items-center">
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
                        </div>

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
                        src="https://i.imgur.com/YvZjVti.png"
                        alt="Login illustration"
                        preview={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
