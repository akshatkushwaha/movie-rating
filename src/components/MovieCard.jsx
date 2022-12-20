import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const genre_ids = props.genre_ids;

  useEffect(() => {
    trimGeners(genre_ids);
  });

  const trimGeners = (genre_ids) => {
    if (genre_ids?.length > 3) {
      return genre_ids.slice(0, 3);
    } else {
      return genre_ids;
    }
  };

  return (
    <>
      <div className="rounded overflow-hidden shadow-base-200 shadow-2xl m-4 transform transition duration-500 hover:scale-110 bg-base-100">
        <Link reloadDocument to={`/movie/${props.id}`}>
          <div className="w-full rounded overflow-hidden h-96">
            <img
              className="w-full"
              src={
                props.poster_path
                  ? "https://image.tmdb.org/t/p/w300" + props.poster_path
                  : "https://via.placeholder.com/300x450"
              }
              alt={props.title}
            />
          </div>
          <div className="py-2 px-4">
            <h1 className="text-xl font-bold py-2 h-20">{props.title}</h1>
            <div className="text-neutral-content">
              <span className="bg-neutral inline-block rounded-full px-3 py-1 mr-2 text-sm font-semibold">
                {props.vote_average}
              </span>
              <span className="bg-neutral inline-block rounded-full px-3 py-1 text-sm font-semibold">
                {props.release_date}
              </span>
            </div>
          </div>
        </Link>
        <div className="movie_card_genre my-2 px-2 flex flex-row overflow-x-scroll">
          {props.genre_ids?.map((id) => (
            <Link reloadDocument key={id} to={`/genre/${id}`}>
              <span className="bg-neutral text-neutral-content inline-block rounded-full px-3 py-1 m-1 text-sm font-semibold">
                {props.genreDB?.find((genre) => genre.id === id)?.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
