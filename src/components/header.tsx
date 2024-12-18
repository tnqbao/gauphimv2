import React from "react";
import {Avatar, Dropdown, Layout, MenuProps, Space} from 'antd';
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import SearchBar from "@/components/search-bar";
import {useDispatch, useSelector} from "react-redux";
import {PoweroffOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {RootState} from "@/utils/redux/store";
import {setAuth} from "@/utils/redux/slices/auth";

const HeaderComp: React.FC = () => {
    const router = useRouter();
    const [searchOpen, setSearchOpen] = React.useState(false);
    const {t} = useTranslation("common");
    const {user, keepMeLogin, isAuthenticated} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const {Header} = Layout;

    if (keepMeLogin === "false" && sessionStorage.getItem("fullname") == null) {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(setAuth(false));

    }
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
            label: <div className={"flex w-full"} onClick={() => {
                router.push("../me")
            }}>Profile</div>,
            key: '0',
            icon: React.createElement(UserOutlined)
        },
        {
            type: 'divider',
        },
        {
            label: <div className={"flex w-full"} onClick={() => {handleLogout()}}>Logout</div>,
            key: '1',
            icon: React.createElement(PoweroffOutlined),
            danger: true,
        },
    ];

    return (
        <Header
            className="md:sticky md:top-0 md:z-10 bg-[#000000]/95 flex flex-wrap shadow-sm items-center px-4 py-3 h-1/6 gap-2 justify-evenly flex-col md:flex-row"
        >
            <div
                className="flex items-center bg-[url('https://i.imgur.com/bq3FdAE.png')] sm:bg-[url('https://i.imgur.com/aMY5YTJ.png')] bg-cover bg-center h-16 w-2/3 sm:h-16 sm:w-16  rounded-md hover:cursor-pointer duration-300 transition-transform transform"
                onClick={() => {
                    router.push("../")
                }}/>
            <div className=" md:flex w-1/2 hidden justify-center items-center">
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
                            className="px-4 py-2 align-text-top w-full md:w-auto font-semibold text-white hover:bg-[#dba902] hover:text-white hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] transition duration-300 text-base sm:text-base text-nowrap"
                            onClick={() => handleButtonClick("login")}
                            suppressHydrationWarning={true}
                        >
                            {t("login")}
                        </button>
                        <button
                            className="px-4 py-2 text-base align-text-top w-full md:w-auto font-semibold text-white hover:bg-[#dba902] hover:text-white hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] transition duration-300"
                            onClick={() => handleButtonClick("register")}
                            suppressHydrationWarning={true}
                        >
                            {t("register")}
                        </button>
                    </div>
                )}
            </div>
            <div className={"flex gap-4 items-center justify-between md:hidden"}>
                <button className={"flex text-white text-lg"} onClick={() => setSearchOpen(!searchOpen)}>
                    <SearchOutlined/>
                </button>
            </div>

            {
                searchOpen ?
                    <div className={`w-2/3 md:hidden`}>
                        <SearchBar/>
                    </div> : null
            }
        </Header>
    )
        ;
};


export default HeaderComp;