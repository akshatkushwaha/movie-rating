import React, { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

import {
  getMovie,
  getGenres,
  getMovieDetails,
  getSimilarMovies,
} from "../api/movies";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [genreDB, setGenreDB] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    fetchGenresDB();
    fetchMovie();
    fetchMovieDetails();
    fetchSimilarMovies();
    genrateGenreList();
  }, []);

  const fetchMovie = async () => {
    const movie = await getMovie(id);
    document.title = `Movie | ${movie.data.title}`;
    setMovie(movie.data);
  };

  const fetchMovieDetails = async () => {
    const movieDetails = await getMovieDetails(id);
    setCast(movieDetails.data.cast);
  };

  const fetchSimilarMovies = async () => {
    const similarMovies = await getSimilarMovies(id);
    setSimilar(similarMovies.data.results);
  };

  const fetchGenresDB = async () => {
    const genresDB = await getGenres();
    setGenreDB(genresDB.data.genres);
  };

  const genrateGenreList = () => {
    const genreList = movie?.genres?.map((genre) => {
      const genreName = genreDB.find((g) => g.id === genre.id);
      return { id: genre.id, name: genreName.name };
    });
    setGenreList(genreList);
  };

  return (
    <>
      <div className="w-full pt-12 bg-base-300">
        <div className="movie-details flex flex-row flex-wrap container mx-auto px-8 py-20 justify-around top-0 bg-gray-900 rounded-xl">
          <div className="movie-details__poster w-fit h-fit overflow-hidden rounded-lg mx-5 flex flex-col">
            <img
              src={
                movie.poster_path
                  ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
                  : "https://via.placeholder.com/300x450"
              }
              alt={movie.title}
            />
          </div>
          <div className="movie-details__info w-2/3">
            <h1 className="text-5xl font-bold ">{movie.title}</h1>
            <div className="py-2">
              <div className="py-2">
                <span className="inline-block py-1 text-base font-mono font-semibold mr-2">
                  {movie.runtime} min | {movie.release_date}
                </span>
              </div>
              <div className="pt-2">
                {genreList?.map((genre) => (
                  <Link key={genre.id} to={`/genre/${genre.id}`}>
                    <span className="inline-block py-1 text-base font-mono font-semibold mr-2">
                      {genre.name} |
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {movie.homepage && (
              <div className="flex flex-row flex-wrap items-end">
                <h1 className="text-2xl font-bold">Watch at: </h1>
                <a href={movie.homepage} target="_blank" className="pl-5 ">
                  Streaming Service
                </a>
              </div>
            )}
            <div className="movie-details__overview container py-4">
              <h1 className="text-3xl font-bold">Overview</h1>
              <p className="text-lg py-4">{movie.overview}</p>
            </div>
          </div>
        </div>
        <div className="movie-details__cast container mx-auto px-10">
          <h1 className="text-3xl font-bold p-10">Cast</h1>
          <div className="movie-details__cast__scroll flex flex-row flex-nowrap overflow-x-auto">
            {cast.map((cast) => (
              <Link key={cast.id} to={`/person/${cast.id}`}>
                <div className="flex flex-col items-start m-5">
                  <div className="movie-details__cast__scroll__image w-32 overflow-hidden rounded-lg">
                    <img
                      src={
                        cast.profile_path !== null
                          ? "https://image.tmdb.org/t/p/w300" +
                            cast.profile_path
                          : "https://via.placeholder.com/300x450"
                      }
                      alt={cast.name}
                    />
                  </div>
                  <span className="text-base font-bold">{cast.name}</span>
                  <span className="text-base font-mono">{cast.character}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Similar Movies */}
        <div className="movie-details__recommended container mx-auto px-10 bg-base-300">
          <h1 className="text-3xl font-bold py-8">Similar</h1>
          <div className="movie-details__recommended__scroll flex flex-row flex-nowrap">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {similar.map.length > 0 ? (
                similar.map((movie) => (
                  <MovieCard key={movie.id} {...movie} genreDB={genreDB} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold">
                    No Similar Movies Found
                  </h1>
                  <h1 className="text-3xl font-bold">
                    Try Searching for a Movie
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
