import {useState} from "react";
import {setPlayUrl} from "@/utils/redux/slices/player";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/utils/redux/store";
import {useRouter} from "next/router";


const ChapterSelector : React.FC<{slug : string}> = ({slug}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { episodes } = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleEpisodeChange = (slug: string, ep: string, serverIndex: number) => {
        dispatch(setPlayUrl(episodes[serverIndex].link_m3u8));
        router.push(`/watch/${slug}?ep=${ep}`);
    }
    return (
        <div className=" px-6 rounded-md py-4">
            {/*{Array.isArray(episodes) &&*/}
            {/*    episodes.map((episode, episodeIndex) => (*/}
                    <div  className="">
                        <h2>
                            <button
                                type="button"
                                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-[#dba902] rounded-md dark:border-gray-700 dark:text-gray-400 hover:bg-slate-700 dark:hover:bg-gray-800 gap-3"
                                onClick={() => setIsOpen(!isOpen)}
                            >

                                <p className="flex items-center ">
                                    <span className="text-lg font-semibold text-white">Chọn tập</span>
                                </p>
                                <svg
                                    className={`w-6 h-6 ${isOpen ? "rotate-180" : ""}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                        </h2>
                        <div
                            className={`p-1 border border-[#dba902] rounded-md dark:border-gray-700 ${
                                isOpen ? "" : "hidden"
                            }`}
                        >
                            <div
                                className="p-2 border border-[#dba902] rounded-md flex flex-wrap text-center justify-start">
                                {Array.isArray(episodes) &&
                                    episodes.map((episode, episodeIndex) => (
                                        <button
                                            key={episodeIndex}
                                            onClick={() =>
                                                handleEpisodeChange(slug, episode.name, episodeIndex)
                                            }
                                            className={` min-w-[7rem] flex mx-2 my-2 items-center justify-center rounded-md p-3 font-bold w-3 hover:bg-green-600 relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300  ${
                                                parseInt(episode.name) === episodeIndex + 1
                                                    ? "bg-[#dba902] border-2 border-black"
                                                    : "bg-amber-50"
                                            }`}
                                            // ${
                                            //     (viewedEpisodes[slug] &&
                                            //         viewedEpisodes[slug].includes(episode.name))
                                            //         ? "bg-green-900 text-white hover:bg-[#2c3f3b]"
                                            //         : "bg-[#dba902] text-black"
                                            // }
                                        >
                                            {episode.name}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                {/*    ))}*/}
        </div>
    );
}

export default ChapterSelector;