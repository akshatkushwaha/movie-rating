import React, { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

import {
  getMovie,
  getGenres,
  getMovieDetails,
  getSimilarMovies,
  getMovieExternalIds,
} from "../api/movies";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [genreDB, setGenreDB] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [externalIds, setExternalIds] = useState({});

  useEffect(() => {
    fetchGenresDB();
    fetchMovie();
    fetchMovieDetails();
    fetchSimilarMovies();
    fetchMovieExternalIds();

    genrateGenreList();
  }, [id]);

  const fetchMovie = async () => {
    const movie = await getMovie(id);
    document.title = `Movie | ${movie.data.title}`;
    setMovie(movie.data);

    setLoading(false);
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

  const fetchMovieExternalIds = async () => {
    const movieExternalIds = await getMovieExternalIds(id);
    setExternalIds(movieExternalIds.data);
  };

  if (loading)
    return (
      <div className="w-full h-screen flex flex-row items-center justify-center bg-base-300">
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 animate-spin fill-primary text-base-content"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center text-base-content p-4">
          Loading...
        </h1>
      </div>
    );
  else
    return (
      <>
        <div className="w-full pt-12 bg-base-300">
          <div className="movie-details mt-16 flex flex-row flex-wrap container mx-auto px-8 py-20 justify-around top-0 bg-gray-900 rounded-xl">
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
            <div className="movie-details__info w-2/3 text-gray-100">
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
                <div className="flex flex-row flex-wrap items-end my-2">
                  <h1 className="text-xl font-bold">Watch at: </h1>
                  <a href={movie.homepage} target="_blank" className="pl-5 ">
                    Streaming Service
                  </a>
                </div>
              )}
              <div className="flex flex-row flex-wrap items-end my-2">
                <h1 className="text-xl font-bold">External Links: </h1>
                {externalIds.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                    target="_blank"
                    className="pl-5 "
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/imdb.png"
                      className="h-10 bottom-0"
                    />
                  </a>
                )}
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
                    <span className="text-base font-mono">
                      {cast.character}
                    </span>
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
