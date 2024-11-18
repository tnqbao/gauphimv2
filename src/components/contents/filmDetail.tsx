import {Film} from "@/utils/types";

const FilmDetail : React.FC<Film> = ({ origin_name, name, content, actor, director , episodes , episode_total , episode_current , quality , poster_url , thumb_url} : Film) => {

    return (
        <div className={"text-white"}>
            <p> { origin_name} </p>
            <p> {name}</p>
            <p> {content}</p>
            <p> {actor}</p>
            <p> {director}</p>
            {/*<p> {eposides[0]?.link_m3u8}</p>*/}
            <p> {episode_total}</p>
            <p> {episode_current}</p>
            <p> {quality}</p>
            <img src={poster_url} alt={name} />
            <img src={thumb_url} alt={name} />
        </div>
    );
}

export  default  FilmDetail;