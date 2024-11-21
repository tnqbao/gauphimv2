import {Film} from "@/utils/types";
import {useState} from "react";
import {useRouter} from "next/router";
import {Button, Divider, Image} from "antd";
import {RootState} from "@/utils/redux/store";
import {useSelector} from "react-redux";
import ChapterSelector from "@/components/contents/chapter-selector";

const FilmDetail: React.FC<{ filmDetails: Film }> = ({filmDetails}) => {
    const [hideContent, setHideContent] = useState(true);
    const episodes = useSelector((state: RootState) => state.player.episodes);
    const router = useRouter();
    return (
        <div>
            <title>{filmDetails.name}</title>
                        <div className="max-w-[1400px] mx-auto px-4 md:px-8 bg-repeat bg-containe">
                <div className="progress hidden" style={{width: "0%"}}>
                    <i></i>
                </div>
                <div className="lg:pt-20 relative overflow-hidden">
                    <div className="absolute bg-cover h-full hidden lg:block w-7/12 top-0 right-0">
                        <div className="flex h-[115%] w-full absolute top-3/4 -left-[20%] -translate-y-2/3">
                            <Image
                            src={`https://img.ophim.live/uploads/movies/${filmDetails.poster_url}`}
                            className={"h-full aspect-video m-auto flex-shrink-0 w-full object-cover blur-sm"}
                            alt={filmDetails.name}
                            loading={"lazy"}
                            preview={false}
                            />
                        </div>
                        <div
                            className="absolute aspect-video md:backdrop-blur-sm h-[120%] backdrop-p z-0 top-2/3 -left-[20%] -translate-y-2/3"></div>
                        <div className="absolute  w-1/2 h-[120%] -left-3/4 -top-[10%]"></div>
                        <div className="left-layer w-[150%] h-[120%] -left-[30%] -top-[10%]"></div>
                    </div>

                    <div className="bg-cover h-full w-full mb-4 sm:absolute sm:max-w-[280px] sm:aspect-2/3 sm:right-28">
                        <Image
                        src={`https://img.ophim.live/uploads/movies/${filmDetails.thumb_url}`}
                        className={"w-full shadow-md"}
                        alt={filmDetails.name}
                        preview={false}
                        />
                    </div>
                    <div className="relative w-full md:w-5/12 top-0 right-0">
                        <h1 className="font-bold text-xl md:text-3xl mb-2 text-[#dba902]">
                            {filmDetails.name}
                        </h1>
                        <h2 className="font-thin text-lg md:text-2xl text-foreground/40 mb-5 text-slate-50">
                            {filmDetails.origin_name}
                        </h2>
                        <div className="space-y-2 flex flex-col flex-wrap">
                            <p className="w-fit space-x-2 mt-2 flex flex-wrap gap-1">
                                {filmDetails.breadcrumbs && filmDetails.breadcrumbs.length > 0
                                    ? filmDetails.breadcrumbs
                                        .slice(0, filmDetails.breadcrumbs.length - 1)
                                        .map((bred) => (
                                            <button
                                                key={bred.position}
                                                className="bg-gray-600/30 text-white w-fit py-1 px-3 text-xs rounded-2xl"
                                            >
                                                <span className="is-dark">{bred.name}</span>
                                            </button>
                                        ))
                                    : ""}
                            </p>
                            <ul className="">
                                <li className="space-x-2">
                  <span className="text-foreground/50 text-[#dba902] text-lg">
                    Quốc gia:&nbsp;
                  </span>
                                    <span className="px-1 border-solid text-slate-100">
                                  {filmDetails.country}
                                </span>
                                </li>
                                <li className="space-x-1 ">
                  <span className="text-foreground/50 text-[#dba902] text-lg">
                    Thể loại:&nbsp;
                  </span>
                                    <span className="px-1 border-solid text-slate-100">
                    {filmDetails.breadcrumbs[0]?.name}
                  </span>
                                </li>
                                <li className="space-x-2">
                  <span className="text-foreground/50 text-[#dba902] text-lg">
                    Số tập:&nbsp;
                  </span>
                                    <span className="px-1 border-solid text-slate-100">
                    {filmDetails.episode_total}
                  </span>
                                </li>
                                <li className="pb-1 line-clamp-3">
                  <span className="text-foreground/50 border-solid text-[#dba902] text-lg">
                    Diễn viên chính: &nbsp;
                  </span>
                                    <span className="border-solid text-slate-100">
                        <span>
                                {filmDetails.actor.length > 0 ? filmDetails.actor.map((actor, index) => ( index === filmDetails.actor.length - 1 ? actor : actor + ", ")) : "Đang cập nhật"}
                          </span>

                  </span>
                                </li>
                            </ul>
                            <div className="space-x-3 flex w-full flex-wrap mt-3 border-r-slate-50 rounded-sm ">
                                <div className="with-title mt-8 dark:!border-white">
                                    <p className=" text-lg title !-mt-10  text-[#dba902]">
                                        Miêu tả: &nbsp;
                                    </p>
                                    <button
                                        className="m-0 p-0 focus:outline-none text-[#a79047] drop-shadow-2xl"
                                        onClick={() => setHideContent(!hideContent)}
                                    >
                                        {hideContent ? "Hiển Thị Thêm" : "Ẩn Bớt"}
                                    </button>
                                    <p className=" text-slate-100">
                                        {hideContent
                                            ? filmDetails.content.startsWith("<p>")
                                            : filmDetails.content.startsWith("<p>")
                                                ? filmDetails.content.split("<p>")[1].split("</p>")[0]
                                                : filmDetails.content}
                                    </p>

                                </div>
                                <br/>
                                <Divider />
                                <Button
                                    className="bg-[#dba902] py-3 rounded-lg w-2/3 h-full font-bold my-2 hover:bg-[#186e5c] relative after:absolute after:bottom-0 after:left-0 after:bg-slate-700 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
                                    onClick={() => {
                                        router.push(`../watch/${filmDetails.slug}?ep=${episodes[0].name}`);
                                    }}

                                >
                                    Xem ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Divider />
            <ChapterSelector slug={filmDetails.slug}/>
            <Divider />
            <b></b>
        </div>

    );
}

export default FilmDetail;