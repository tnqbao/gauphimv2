import React, { useState } from "react";
import { useRouter } from "next/router";
import { Menu, Dropdown } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";
import { handleSlug } from "@/utils/helper";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {changeCate} from "@/utils/redux/store/slices/navigate";

interface MoviesCategoriesProps {
  catesprop: string;
}

const MoviesCategories: React.FC<MoviesCategoriesProps> = ({ catesprop }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categoriesList = catesprop.split("/");
  const router = useRouter();
  // const { currentCate, changeCurrentCate } = useGlobal();
  const { category } = useSelector((state: RootState) => state.navigate);
  const dispatch  = useDispatch();
  const handleClick = (cate: string, parent: string) => {
    let formattedCategory = handleSlug(cate);
      formattedCategory = formattedCategory.toLowerCase().replace(/\s+/g, "-");
      dispatch(changeCate(cate))
        if (parent !== "") {
      formattedCategory = `${parent}/${formattedCategory}`;
    }
    router.push(`../${(formattedCategory === "trang-chu" || formattedCategory === "home") ? "" : formattedCategory}?page=1`);
        setIsMenuOpen(false);
  };
  

  const genreMenu = (
    <Menu>
      <Menu.Item onClick={() => handleClick("hanh-dong", "the-loai")}>Hành Động</Menu.Item>
      <Menu.Item onClick={() => handleClick("Hài", "the-loai")}>Hài</Menu.Item>
    </Menu>
  );

  const countryMenu = (
    <Menu>
      <Menu.Item onClick={() => handleClick("usa", "quoc-gia")}>USA</Menu.Item>
      <Menu.Item onClick={() => handleClick("uk", "quoc-gia")}>UK</Menu.Item>
    </Menu>
  );

  const renderCategoryButton = (cate: string, index: number) => {
    const isDropdown = cate === "Thể Loại" || cate === "Quốc Gia";
    const isActive = cate === category;

    return isDropdown ? (
      <Dropdown key={index} overlay={cate === "Thể Loại" ? genreMenu : countryMenu} trigger={['hover']}>
        <button className={`relative px-4 py-2 text-white hover:text-[#f5d418] rounded flex justify-between items-center group text-lg font-semibold`}>
          {cate} <DownOutlined />
          <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
        </button>
      </Dropdown>
    ) : (
      <button
        key={index}
        className={`relative px-4 py-2 hover:text-[#ffd255] rounded flex justify-between text-lg font-semibold items-center group ${isActive ? 'text-[#f5d418]' : 'text-white'}`}
        onClick={() => handleClick(cate, "")}
      >
        {cate}
        <span className={`absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${isActive ? 'w-full' : ''}`}></span>
      </button>
    );
  };

  const mainMenu = (
    <div className="flex flex-wrap gap-2 p-2 m-1 bg-slate-700 shadow-md rounded-md ">
      {categoriesList.map(renderCategoryButton)}
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <Dropdown
          overlay={mainMenu}
          trigger={['click']}
          visible={isMenuOpen}
          onVisibleChange={setIsMenuOpen}
          overlayClassName="w-full"
        >
          <button className="p-2 ml-1 my-2 bg-none text-white hover:text-[#ffc954]">
            <MenuOutlined />
          </button>
        </Dropdown>
      </div>
      <nav className="hidden md:flex justify-evenly items-center p-4 flex-wrap gap-2">
        {categoriesList.map(renderCategoryButton)}
      </nav>
    </>
  );
};

export default MoviesCategories;
