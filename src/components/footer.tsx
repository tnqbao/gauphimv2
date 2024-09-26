import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const FooterComp: React.FC = () => {
  return (
    <Footer className="bg-[#121111] flex flex-wrap shadow-md justify-between items-center px-4 py-3 h-auto">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};

export default FooterComp;
