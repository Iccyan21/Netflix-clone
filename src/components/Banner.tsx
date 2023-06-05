
import React, { useState, useEffect } from "react";

import axios from "../axios";
import { requests } from "../request";
import "./Banner.scss";

//映画のデータを取得するためにuseStateでmovieを扱い、useEffectでAPI取得、更新まではRowコンポーネントと同じです。
//setMovieでは数あるmoviesの中からランダムに1つをmovieに格納しています。

type movieProps = {
    title?: string;
    name?: string;
    orignal_name?: string;
    backdrop_path?: string;
    overview?: string;
};
  
export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>({});
    useEffect(() => {
      async function fetchData() {
        const request = await axios.get(requests.feachNetflixOriginals);
        console.log(request.data.result);
  
        //apiからランダムで値を取得している
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
        return request;
      }
      fetchData();
    }, []);
    console.log(movie);
  
    // descriptionの切り捨てよう関数
    function truncate(str: any, n: number) {
      // undefinedを弾く
      if (str !== undefined) {
        return str.length > n ? str?.substr(0, n - 1) + "..." : str;
      }
    }


    return (
        <header
        className="Banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}
        >
        <div className="Banner-contents">
            <h1 className="banner-title">
            {movie?.title || movie?.name || movie?.orignal_name}
            </h1>
            <div className="Banner-buttons">
            <button className="Banner-button">Play</button>
            <button className="Banner-button">My List</button>
            </div>

            <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
        </div>

        <div className="Banner-fadeBottom" />
        </header>
    );

};