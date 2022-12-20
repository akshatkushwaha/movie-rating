import React, { useEffect, useState } from "react";

import { getTvDetails } from "../api/Tv";

export default function TvDetails() {
  const id = window.location.pathname.split("/")[2];
  const [tv, setTv] = useState({});

  useEffect(() => {
    fetchTvDetails();
  });

  const fetchTvDetails = async () => {
    const response = await getTvDetails(id);
    setTv(response.data);
  };

  return (
    <>
      <div className="w-full pt-12 bg-base-300">
        <div className="container flex flex-row justify-around py-10 px-8 mx-auto rounded-2xl bg-gray-900">
          <div className="flex flex-col w-1/4 rounded-lg overflow-hidden">
            <img
              src={
                tv.poster_path
                  ? "https://image.tmdb.org/t/p/w300" + tv.poster_path
                  : "https://via.placeholder.com/300x450"
              }
              alt="placeholder"
            />
          </div>
          <div className="flex flex-col w-2/3">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-white">{tv.name}</h1>
              <div className="flex flex-row">
                <h1 className="text-2xl font-bold text-white">
                  {tv.first_air_date}
                </h1>
                <h1 className="text-2xl font-bold text-white">|</h1>
                <h1 className="text-2xl font-bold text-white">
                  {tv.vote_average}
                </h1>
              </div>
              <div className="flex flex-row">
                <h1 className="text-2xl font-bold text-white">
                  {tv.genres?.map((genre) => genre.name).join(", ")}
                </h1>
              </div>
              <div className="flex flex-row">
                <h1 className="text-2xl font-bold text-white">
                  {tv.number_of_seasons} Seasons
                </h1>
                <h1 className="text-2xl font-bold text-white">|</h1>
                <h1 className="text-2xl font-bold text-white">
                  {tv.number_of_episodes} Episodes
                </h1>
              </div>
            </div>
            <div className="flex flex-row">
              <h1 className="text-2xl font-bold text-white">{tv.overview}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
