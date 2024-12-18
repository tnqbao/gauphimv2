import {Menu} from "antd";
import {CategoryType} from "@/utils/types";

const DropDownMenu: React.FC<{ items: CategoryType[], onClick: (slug: string) => void }> = ({ items, onClick }) => (
    <Menu mode="vertical" className="flex flex-wrap justify-between w-full gap-1 fixed top-0 left-0 bg-slate-700 shadow-lg rounded-md">
        {items.map((item, index) => (
            <Menu.Item key={index} onClick={() => onClick(item.slug)} className="flex w-1/4 sm:w-1/5 text-center text-nowrap p-5">
                <p className={"w-full md:text-sm"}>{item.name}</p>
            </Menu.Item>
        ))}
    </Menu>
);

export default DropDownMenu;