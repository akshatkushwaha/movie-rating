import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const path = window.location.pathname.split("/")[1];

  return (
    <div className="h-screen w-full flex flex-col justify-center bg-base-300">
      {path === "" ? (
        <div className="flex flex-col items-center">
          <h1 className="text-center text-4xl font-bold text-white m-6">
            Home page is under construction.
          </h1>
          <div className="flex flex-row">
            <Link to="/movie/popular/1">
              <button className="btn btn-primary m-2">Go Popular Movies</button>
            </Link>
            <Link to="/tv/popular/1">
              <button className="btn btn-primary m-2">
                Go Popular TV Shows
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white m-2">404</h1>
          <h1 className="text-2xl font-bold text-white m-2">
            Page not found. Please try again.
          </h1>
          <Link to="/">
            <button className="btn btn-primary m-2">Go Home</button>
          </Link>
        </div>
      )}
    </div>
  );
}
