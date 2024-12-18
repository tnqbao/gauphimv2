import React from "react";
import FilmCard from "./film-card";
import { FilmListProps } from "@/utils/types";
import useWindowSize from "@/contexts/WindowSizeContext";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {loadMoreItem} from "@/utils/redux/slices/navigate";
import {ReloadOutlined} from "@ant-design/icons";

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
        <div className="flex flex-wrap justify-start mx-5 md:mx-32 rounded-sm border-2 border-amber-400">
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

        {visibleItem < items.length && (
            <div className="flex justify-center my-5">
              <button
                  onClick={() => {dispatch(loadMoreItem())}}
                  className=" bg-[#dba902]/50 px-4 py-2 align-text-top w-full md:w-auto font-semibold text-white hover:bg-[#dba902] hover:text-white hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] transition duration-300 text-base sm:text-base text-nowrap"
              >
                Load More <ReloadOutlined />
              </button>
            </div>
        )}
      </>
  );
};

export default FilmList;
