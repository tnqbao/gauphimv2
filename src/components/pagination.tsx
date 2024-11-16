import { useGlobal } from "@/contexts/GlobalContext";
import { PaginationProps } from "@/utils/types";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  totalItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / totalItemsPerPage) || 1;
  const { changePage, page } = useGlobal();

  const getPageNumbers = () => {
    const pages = [];
    const maxPageNumbers = 5; 
    let startPage = Math.max(1, page - 2); 
    let endPage = Math.min(totalPages, page + 2); 

    if (page <= 3) {
      startPage = 1;
      endPage = Math.min(totalPages, maxPageNumbers);
    }

    if (page > totalPages - 3) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - (maxPageNumbers - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) pages.unshift("...");
    if (endPage < totalPages) pages.push("...");

    return pages;
  };

  return (
    <>
      <div className="flex justify-center border-solid-[#dba902]">
        <button
          className="flex-1 border-solid cursor-pointer m-6 rounded-md bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => changePage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Trang Trước
        </button>
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            disabled={pageNumber === "..."}
            onClick={() => {
              if (pageNumber !== "...") {
                changePage(pageNumber as number); 
              }
            }}
            className={
              "flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 " +
              (pageNumber === page
                ? "bg-[#dba902] text-black"
                : "bg-gray-800 text-white hidden md:block")
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          className="flex-1 border-solid cursor-pointer p-3.5 m-6 rounded-md bg-gray-800 text-white relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          onClick={() => changePage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
        >
          Trang Sau
        </button>
      </div>
    </>
  );
};

export default Pagination;