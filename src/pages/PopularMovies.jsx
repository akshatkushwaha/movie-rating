import React, { useState, useEffect } from "react";

import MovieCard from "../components/MovieCard";

import { getPopularMovies, getGenres } from "../api/movies";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [genreDB, setGenreDB] = useState([]);
  const [prevButtonClass, setPrevButtonClass] = useState("");
  const [nextButtonClass, setNextButtonClass] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();

    if (currentPage === 1) {
      setPrevButtonClass("opacity-50 cursor-not-allowed");
    } else {
      setPrevButtonClass("");
    }

    if (currentPage === totalPages) {
      setNextButtonClass("opacity-50 cursor-not-allowed");
    } else {
      setNextButtonClass("");
    }
  }, [currentPage]);

  const fetchMovies = async () => {
    setLoading(true);
    await getGenres()
      .then((res) => {
        setGenreDB(res.data.genres);
      })

      .catch((err) => {
        console.log(err);
      });

    await getPopularMovies(currentPage)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setTotalResults(res.data.total_results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
          Loading...
        </h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <div className="container flex flex-row flex-wrap justify-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
              Popular Movies
            </h1>
            <div className="flex flex-row flex-wrap justify-between w-full px-28 py-10">
              <p className="text-base font-bold text-center text-gray-800">
                Page {currentPage} of {totalPages} Pages
              </p>
              <p className="text-base font-bold text-center text-gray-800">
                Total Results: {totalResults}
              </p>
            </div>
            {movies.length > 0 ? (
              <div className="flex flex-row flex-wrap justify-center">
                {movies.map.length > 0 ? (
                  movies.map((movie) => (
                    <MovieCard key={movie.id} {...movie} genreDB={genreDB} />
                  ))
                ) : (
                  <h1 className="text-4xl font-bold text-center text-gray-800">
                    No Movies Found
                  </h1>
                )}
              </div>
            ) : (
              <h1 className="text-4xl font-bold text-center text-gray-800">
                No Movies Found
              </h1>
            )}
          </div>
          <div className="flex flex-row justify-center py-5">
            <button
              className={
                prevButtonClass +
                " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
              }
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              Previous
            </button>
            <button
              className={
                nextButtonClass +
                " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
              }
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
