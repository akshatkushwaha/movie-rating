import React, { useState, useEffect } from "react";
import Card from "./Card";

import { Link } from "react-router-dom";

export default function Grid(props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2 md:p-0 gap-2 md:gap-6">
      {props?.movies?.map((movie) => (
        <Link key={movie.id} reloadDocument to={`/movie/${movie.id}`}>
          <Card key={movie.id} {...movie} />
        </Link>
      ))}
      {props?.tvShows?.map((tvShow) => (
        <Link key={tvShow.id} reloadDocument to={`/tv/${tvShow.id}`}>
          <Card key={tvShow.id} {...tvShow} />
        </Link>
      ))}
    </div>
  );
}
