import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MovieCard(props) {
  const genre_ids = props.genre_ids;
  const year = props.release_date?.slice(0, 4);
  const month = props.release_date?.slice(5, 7);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

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
      <div className="rounded overflow-hidden shadow-base-200 shadow-2xl transform transition duration-500 md:hover:scale-110 bg-base-100">
        <Link reloadDocument to={`/movie/${props.id}`}>
          <div className="w-full rounded overflow-hidden">
            <img
              className="w-full"
              src={
                props.poster_path
                  ? "https://image.tmdb.org/t/p/w300" + props.poster_path
                  : "https://via.placeholder.com/300x450"
              }
              alt={props.title}
            />
            <div className="absolute top-0 right-0 m-2">
              <span className="bg-info text-info-content inline-block rounded-full px-2 py-1 text-xs md:text-base font-normal md:font-semibold">
                {props.vote_average}
              </span>
            </div>
          </div>
          <div className="py-2 px-4">
            <h1 className="text-base md:text-xl font-bold pb-2">
              {props.title}
            </h1>
            <div className="text-neutral-content">
              <span className="text-xs md:text-sm font-normal md:font-semibold">
                {year + " " + months[month - 1]}
              </span>
            </div>
            <div className="movie_card_genre my-2 flex flex-row overflow-x-scroll">
              {props.genre_ids?.map((id) => (
                <Link reloadDocument key={id} to={`/genre/${id}/1`}>
                  <span className="bg-neutral text-neutral-content inline-block rounded-full px-2 py-1 mr-2 text-xs md:text-sm font-normal md:font-semibold truncate">
                    {props.genreDB?.find((genre) => genre.id === id)?.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
