import {useState} from "react";
import {useRouter} from "next/router";

const SearchIcon = ({ className } : {className : string}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
    </svg>
);

const SearchBar : React.FC = () => {
    // const [searchOpen, setSearchOpen] = useState(false);
    const searchOpen = true;
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    return (
        <>
            <div
                className={`flex items-center justify-center p-2 basis-2/3 md:basis-3/4 ${
                    searchOpen ? "flex" : "hidden"
                } md:flex`}
            >
                <input
                    id="search-input"
                    className="w-full p-2 md:p-4 rounded-md border-2 border-gray-300 outline-none focus:border-gray-500 text-xl"
                    type="search"
                    placeholder="Tìm Kiếm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                />
                <button
                    className="ml-2 p-2 md:p-4 bg-[#dba902] text-black rounded-lg font-bold hover:bg-[#b68d02] transition ease-in-out"
                    onClick={() => {router.push(`../search?slug=${searchTerm}&page=1`);}}
                >
                    <SearchIcon className="w-6 h-6 text-black cursor-pointer"/>
                </button>
            </div>
            <div
                id="toggleSearchButton"
                className={`toggle-search-button p-2 ${
                    searchOpen ? "hidden" : "block"
                } md:hidden`}
            >
                <SearchIcon className="w-6 h-6 text-white cursor-pointer"/>
            </div>
        </>
    );
};

export default SearchBar;