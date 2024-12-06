import React from "react";
import FilmCard from "./film-card";
import { FilmListProps } from "@/utils/types";
import useWindowSize from "@/contexts/WindowSizeContext";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {loadMoreItem} from "@/utils/redux/slices/navigate";

const FilmList: React.FC<FilmListProps> = ({ items, cdnImageDomain, error }) => {
  const windowSize = useWindowSize();
  const { visibleItem } = useSelector((state: RootState) => state.navigate);
  const dispatch = useDispatch()

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
        <div className="flex flex-wrap justify-start mx-5 md:mx-32">
          {items.length > 0 ? (
              items.slice(0, visibleItem).map((film, index) => (
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

        {/* Nút để tải thêm */}
        {visibleItem < items.length && (
            <div className="flex justify-center my-5">
              <button
                  onClick={() => {dispatch(loadMoreItem())}}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Load More
              </button>
            </div>
        )}
      </>
  );
};

export default FilmList;
