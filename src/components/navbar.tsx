import React, { useState } from "react";
import { useRouter } from "next/router";
import { Menu, Dropdown } from "antd";
import { MenuOutlined, DownOutlined } from "@ant-design/icons";

interface MoviesCategoriesProps {
  catesprop: string;
}

const MoviesCategories: React.FC<MoviesCategoriesProps> = ({ catesprop }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categoriesList = catesprop.split("/");
  const router = useRouter();

  const handleClick = (cate: string) => {
    const formattedCategory = cate
      .toLowerCase()
      .replace(/\s+/g, "-");
    router.push(`../${(formattedCategory==="trang-chủ" || formattedCategory==="home") ? "" : formattedCategory}?page=1`);
    setIsMenuOpen(false);
  };

  const genreMenu = (
    <Menu>
      <Menu.Item onClick={() => handleClick("action")}>Action</Menu.Item>
      <Menu.Item onClick={() => handleClick("comedy")}>Comedy</Menu.Item>
    </Menu>
  );

  const countryMenu = (
    <Menu>
      <Menu.Item onClick={() => handleClick("usa")}>USA</Menu.Item>
      <Menu.Item onClick={() => handleClick("uk")}>UK</Menu.Item>
    </Menu>
  );

  const mainMenu = (
    <div className="flex flex-wrap gap-2 p-2 m-1 bg-slate-700 shadow-md rounded-md">
      {categoriesList.map((cate, index) => {
        if (cate === "Thể Loại") {
          return (
            <Dropdown key={index} overlay={genreMenu} trigger={['click']}>
              <button className="relative text-left px-4 py-2 text-white hover:text-[#2c3f3b] w-full flex justify-between items-center group">
                {cate} <DownOutlined />
                <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            </Dropdown>
          );
        } else if (cate === "Quốc Gia") {
          return (
            <Dropdown key={index} overlay={countryMenu} trigger={['click']}>
              <button className="relative text-left px-4 py-2 text-white hover:text-[#2c3f3b] w-full flex justify-between items-center group">
                {cate} <DownOutlined />
                <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            </Dropdown>
          );
        } else {
          return (
            <button
              key={index}
              className="relative px-4 py-2 text-white hover:text-[#f5d418] w-full flex justify-between items-center group"
              onClick={() => handleClick(cate)}
            >
              {cate}
              <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
            </button>
          );
        }
      })}
    </div>
  );

  return (
    <>
      <div className="sm:hidden">
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
        {categoriesList.map((cate, index) => {
          if (cate === "Thể Loại") {
            return (
              <Dropdown key={index} overlay={genreMenu} trigger={['hover']}>
                <button className="relative px-4 py-2 text-white hover:text-[#f5d418] rounded flex justify-between items-center group">
                  {cate} <DownOutlined />
                  <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                </button>
              </Dropdown>
            );
          } else if (cate === "Quốc Gia") {
            return (
              <Dropdown key={index} overlay={countryMenu} trigger={['hover']}>
                <button className="relative px-4 py-2 text-white hover:text-[#f5d418] rounded flex justify-between items-center group">
                  {cate} <DownOutlined />
                  <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
                </button>
              </Dropdown>
            );
          } else {
            return (
              <button
                key={index}
                className="relative px-4 py-2 text-white hover:text-[#ffd255] rounded flex justify-between items-center group"
                onClick={() => handleClick(cate)}
              >
                {cate}
                <span className="absolute bottom-0 left-0 bg-slate-700 h-0.5 w-0 group-hover:w-full transition-all duration-300"></span>
              </button>
            );
          }
        })}
      </nav>
    </>
  );
};

export default MoviesCategories;