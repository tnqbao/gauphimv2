import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Dropdown} from "antd";
import {DownOutlined, MenuOutlined} from "@ant-design/icons";
import {handleSlug} from "@/utils/helper";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {changeCate} from "@/utils/redux/slices/navigate";
import {useTranslation} from "react-i18next";
import {movieApiInstance} from "@/utils/axios.config";
import {CategoryType} from "@/utils/types";
import DropDownMenu from "@/components/dropdown-menu";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [listGenre, setListGenre] = useState<CategoryType[]>([]);
    const [listCountry, setListCountry] = useState<CategoryType[]>([]);
    const {t} = useTranslation("common");
    const categoriesList = t('categories').split("/") || [];
    const router = useRouter();
    const {category} = useSelector((state: RootState) => state.navigate);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const storedGenres = localStorage.getItem("listGenre");
                if (storedGenres) {
                    setListGenre(JSON.parse(storedGenres));
                } else {
                    const response = await movieApiInstance.get("/v1/api/the-loai");
                    let data = response.data.data.items;
                    if (Array.isArray(data)) {
                        data = data.filter(item => item.slug !== 'phim-18');
                    }
                    localStorage.setItem("listGenre", JSON.stringify(data));
                    setListGenre(data);
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchGenres();
        }
    }, []);

    useEffect(() => {
        const fetchCoutries = async () => {
            try {
                const storedCountry = localStorage.getItem("listCountry");
                if (storedCountry) {
                    setListCountry(JSON.parse(storedCountry));
                } else {
                    const response = await movieApiInstance.get("/v1/api/quoc-gia");
                    const data = response.data.data.items;
                    localStorage.setItem("listCountry", JSON.stringify(data));
                    setListCountry(data);
                }
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchCoutries();
        }
    }, []);

    const handleClick = (cate: string, parent: string) => {
        let formattedCategory = handleSlug(cate);
        formattedCategory = formattedCategory.toLowerCase().replace(/\s+/g, "-");
        dispatch(changeCate(cate));
        if (parent !== "") {
            formattedCategory = `${parent}/${formattedCategory}`;
        }
        router.push(`../${(formattedCategory === "trang-chu" || formattedCategory === "home") ? "" : formattedCategory}?page=1`);
        setIsMenuOpen(false);
    };

    const genreMenu = (
        <DropDownMenu items={listGenre} onClick={(slug: string) => handleClick(slug, "the-loai")} />
    );

    const countryMenu = (
        <DropDownMenu items={listCountry} onClick={(slug: string) => handleClick(slug, "quoc-gia")} />
    );



    const renderCategoryButton = (cate: string, index: number) => {
        const isDropdown = cate === "Thể Loại" || cate === "Quốc Gia";
        const isActive = cate === category;

        return isDropdown ? (
            <Dropdown
                key={index}
                overlay={cate === "Thể Loại" ? genreMenu : countryMenu}
                overlayStyle={{ width: "auto", textAlign: "center" }}
                trigger={['hover']}
                placement="bottomCenter"
            >
                <button
                    className={`relative px-4 py-2 text-white hover:text-[#f5d418] rounded flex justify-between items-center group text-lg font-semibold`}
                >
                    {cate} <DownOutlined />
                    <span
                        className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"
                    ></span>
                </button>
            </Dropdown>
        ) : (
            <button
                key={index}
                className={`relative px-4 py-2 hover:text-[#ffd255] rounded flex justify-between text-lg font-semibold items-center group ${
                    isActive ? "text-[#f5d418]" : "text-white"
                }`}
                onClick={() => handleClick(cate, "")}
            >
                {cate}
                <span
                    className={`absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${
                        isActive ? "w-full" : ""
                    }`}
                ></span>
            </button>
        );
    };

    const mainMenu = (
        <div className="flex flex-wrap gap-2 p-2 m-1 bg-slate-700 shadow-md rounded-md w-full">
            {categoriesList.map(renderCategoryButton)}
        </div>
    );

    return (
        <>
            <div className="md:hidden">
                <Dropdown
                    overlay={mainMenu}
                    trigger={["click"]}
                    visible={isMenuOpen}
                    onVisibleChange={setIsMenuOpen}
                    overlayClassName="w-full"
                >
                    <button className="p-2 my-2 bg-none text-white hover:text-[#ffc954]">
                        <MenuOutlined/>
                    </button>
                </Dropdown>
            </div>
            <nav className="hidden md:flex justify-evenly items-center p-4 flex-wrap gap-2 bg-black">
                {categoriesList.map(renderCategoryButton)}
            </nav>
        </>
    );
};

export default Navbar;
