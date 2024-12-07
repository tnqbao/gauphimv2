import React from "react";
import {Avatar, Dropdown, Layout, MenuProps, Space} from 'antd';
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import SearchBar from "@/components/search-bar";
import {useSelector} from "react-redux";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {RootState} from "@/utils/redux/store";;

const HeaderComp: React.FC = () => {
    const router = useRouter();
    const {t} = useTranslation("common");
    const {user} = useSelector((state: RootState) => state.auth);
    const isAuthenticated = (localStorage.getItem("fullname") != null || sessionStorage.getItem("fullname") != null);
    const {Header} = Layout;
    const handleButtonClick = async (page: string) => {
        await router.push(`/auth/${page}`);
    };

    const handleLogout = async () => {
        try {
            const resp = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (resp.status === 200) {
                localStorage.clear();
                sessionStorage.clear();
                await router.push("../auth/login");
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const items: MenuProps['items'] = [
        {
            label: <div onClick={() => {
                router.push("../profile")
            }}>Profile</div>,
            key: '0',
            icon: React.createElement(UserOutlined)
        },
        {
            type: 'divider',
        },
        {
            label: <div onClick={handleLogout}>Logout</div>,
            key: '1',
            icon: React.createElement(LogoutOutlined),
            danger: true,
        },
    ];

    return (
        <Header
            className={"bg-black/80 flex flex-wrap shadow-sm items-center px-4 py-3 h-1/6 gap-2 justify-evenly flex-col sm:flex-row"}>
            <div
                className="flex items-center bg-[url('https://i.imgur.com/aMY5YTJ.png')] sm:bg-[url('https://i.imgur.com/aMY5YTJ.png')] bg-cover bg-center h-10 w-full sm:h-16 sm:w-16  rounded-md hover:cursor-pointer"
                onClick={() => {
                    router.push("../")
                }}></div>
            <div className=" flex w-1/2 ">
                <SearchBar/>
            </div>
            <div
                className="flex space-x-2 justify-center sm:justify-end  w-full sm:w-auto mt-2 sm:mt-0 hover:cursor-pointer">
                {isAuthenticated ? (
                    <Dropdown menu={{items}} trigger={['click']}>
                        <Space>
                            <div className="flex items-center ">
                                <Avatar
                                    size={30}
                                    style={{backgroundColor: "#f56a00", verticalAlign: "middle"}}
                                >
                                    {user.fullname?.toString().charAt(0).toUpperCase()}
                                </Avatar>
                                <span className="text-white ml-2">{`${t("welcome_user")} ${user.fullname}`}</span>
                            </div>
                        </Space>
                    </Dropdown>

                ) : (
                    <div className={"flex"}>
                        <button
                            className="px-4 py-2 text-base align-text-top w-full md:w-auto font-semibold text-white hover:bg-[#dba902] hover:text-white hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] transition duration-300"
                            onClick={() => handleButtonClick("login")}
                            suppressHydrationWarning={true}
                        >
                            {t("login")}
                        </button>
                        <button
                            className="px-4 py-2 text-base w-full md:w-auto text-white hover:bg-[#dba902] hover:text-white !important hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] transition duration-300"
                            onClick={() => handleButtonClick("register")}
                            suppressHydrationWarning={true}
                        >
                            {t("register")}
                        </button>

                    </div>
                )}
            </div>
        </Header>
    );
};

export default HeaderComp;