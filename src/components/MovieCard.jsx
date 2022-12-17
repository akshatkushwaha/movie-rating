import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const genre_ids = props.genre_ids;

  useEffect(() => {
    trimGeners(genre_ids);
  });

  const trimGeners = (genre_ids) => {
    if (genre_ids.length > 3) {
      return genre_ids.slice(0, 3);
    } else {
      return genre_ids;
    }
  };

  return (
    <>
      <div className="max-w-xs rounded overflow-hidden shadow-2xl m-4 transform transition duration-500 hover:scale-110">
        <Link reloadDocument to={`/movie/${props.id}`}>
          <div className="w-full rounded overflow-hidden h-96">
            <img
              className="w-full"
              src={"https://image.tmdb.org/t/p/w300" + props.poster_path}
              alt={props.title}
            />
          </div>
          <div className="bg-white py-2 px-4">
            <h1 className="text-xl font-bold text-gray-800 py-2">
              {props.title}
            </h1>
            <div className="">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {props.vote_average}
              </span>

              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {props.release_date}
              </span>
            </div>
          </div>
        </Link>
        <div className="px-4 p-4 flex flex-row overflow-hidden bg-white">
          {props.genre_ids.map((id) => (
            <Link reloadDocument key={id} to={`/genre/${id}`}>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {props.genreDB.find((genre) => genre.id === id).name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
