import React from "react";
import FilmCard from "./filmCard";
import { PageProps } from "@/utils/types";
import useWindowSize from "@/contexts/WindowSizeContext";
import Pagination from "@/components/pagination"
const Filmlist: React.FC<PageProps> = ({ items, cdnImageDomain, totalItems, totalItemsPerPage ,error }) => {
  const windowSize = useWindowSize();

  const getColumnCount = () => {
    const width = windowSize.width ?? 640; 
    return Math.ceil((width - 640) / 256 + 1);
  };

  const columnCount = getColumnCount();
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage} />
      <div className="flex flex-wrap justify-start mx-5 md:mx-32">
        {items.length > 0 ? (
          items.map((film, index) => (
            <div
            key={film._id}
            className="p-1"
            style={{
              flex: `0 0 ${100 / columnCount}%`,
              maxWidth: `${100 / columnCount}%`,
            }}
          > 
              <FilmCard key={index} film={film} cdnImageDomain={cdnImageDomain} />
            </div>
          ))
        ) : (
          <p>No films found for this category.</p>
        )}
      </div>
      <Pagination totalItems={totalItems} totalItemsPerPage={totalItemsPerPage} />
    </>
  );
};

export default Filmlist;