import React, { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

import {
  getMovie,
  getGenres,
  getMovieProviders,
  getMovieDetails,
  getSimilarMovies,
} from "../api/movies";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [genreDB, setGenreDB] = useState([]);

  useEffect(() => {
    fetchGenresDB();
    fetchMovie();
    fetchMovieProviders();
    fetchMovieDetails();
    fetchSimilarMovies();
  }, []);

  const fetchMovie = async () => {
    const movie = await getMovie(id);
    setMovie(movie.data);
  };

  const fetchMovieProviders = async () => {
    const watchProviders = await getMovieProviders(id);
    setWatchProviders(watchProviders.data.results.IN);
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

  return (
    <>
      {/* Backdrop */}
      <div className="movie-details__backdrop w-full overflow-hidden blur-sm opacity-30 fixed">
        <img
          className="w-full object-cover bg-cover bg-center"
          src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
          alt={movie.title}
        />
      </div>
      {/*  */}
      <div className="w-full pt-12">
        <div className="movie-details flex flex-row flex-wrap container mx-auto p-10 justify-around top-0">
          <div className="movie-details__poster w-fit overflow-hidden rounded-lg mx-5 flex flex-col">
            <img
              src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
              alt={movie.title}
            />
          </div>
          <div className="movie-details__info w-2/3">
            <h1 className="text-5xl font-bold ">{movie.title}</h1>
            <div className="py-2">
              <div className="py-2">
                <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                  {movie.runtime} min | {movie.release_date}
                </span>
              </div>
              <div className="py-2">
                <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                  {/* GnereList */}
                </span>
              </div>
            </div>
            {/* Watch Providers */}
            <div className="py-2">
              <div className="flex flex-row flex-wrap">
                {watchProviders?.rent?.length > 0 && (
                  <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                    Rent:
                  </span>
                )}
                {watchProviders?.rent?.map((provider) => (
                  <img
                    src={"https://image.tmdb.org/t/p/w300" + provider.logo_path}
                    alt={provider.provider_name}
                    className="inline-block h-8 m-2 rounded-full"
                  />
                ))}
              </div>
              <div className="flex flex-row flex-wrap">
                {watchProviders?.buy?.length > 0 && (
                  <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                    Buy:
                  </span>
                )}
                {watchProviders?.buy?.map((provider) => (
                  <img
                    src={"https://image.tmdb.org/t/p/w300" + provider.logo_path}
                    alt={provider.provider_name}
                    className="inline-block h-8 m-2 rounded-full"
                  />
                ))}
              </div>
              <div className="flex flex-row flex-wrap">
                {watchProviders?.flatrate?.length > 0 && (
                  <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                    Flatrate:
                  </span>
                )}
                {watchProviders?.flatrate?.map((provider) => (
                  <img
                    src={"https://image.tmdb.org/t/p/w300" + provider.logo_path}
                    alt={provider.provider_name}
                    className="inline-block h-8 m-2 rounded-full"
                  />
                ))}
              </div>
            </div>
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
              <div key={cast.id} className="flex flex-col items-start m-5">
                <div className="movie-details__cast__scroll__image w-32 overflow-hidden rounded-lg">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + cast.profile_path}
                    alt={cast.name}
                  />
                </div>
                <span className="text-base font-bold">{cast.name}</span>
                <span className="text-base font-mono">{cast.character}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Similar Movies */}
      <div className="movie-details__recommended container mx-auto px-10">
        <h1 className="text-3xl font-bold py-8">Similar</h1>
        <div className="movie-details__recommended__scroll flex flex-row flex-nowrap">
          <div className="flex flex-row flex-wrap justify-center">
            {similar.map.length > 0 ? (
              similar.map((movie) => (
                <MovieCard key={movie.id} {...movie} genreDB={genreDB} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">No Similar Movies Found</h1>
                <h1 className="text-3xl font-bold">
                  Try Searching for a Movie
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
