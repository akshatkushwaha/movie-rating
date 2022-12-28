import React, { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";

import {
  getMovie,
  getGenres,
  getMovieDetails,
  getSimilarMovies,
  getMovieExternalIds,
  getMovieVideos,
  getMovieImages,
  getMovieReviews,
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
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchGenresDB();
    fetchMovie();
    fetchMovieDetails();
    fetchSimilarMovies();
    fetchMovieExternalIds();
    fetchMovieVideos();
    fetchMovieImages();

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

  const fetchMovieVideos = async () => {
    const movieVideos = await getMovieVideos(id);
    setVideos(movieVideos.data.results);
  };

  const fetchMovieImages = async () => {
    const movieImages = await getMovieImages(id);
    setImages(movieImages.data.backdrops);
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
        <div className="w-full bg-base-300">
          <div className="movie-details flex flex-row flex-wrap container mx-auto md:px-8 py-5 md:py-20 justify-around bg-gray-900 rounded-xl">
            <div className="movie-details__poster px-10 md:w-1/4 overflow-hidden rounded-lg md:mx-5">
              <img
                src={
                  movie.poster_path
                    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                    : "https://via.placeholder.com/500x750"
                }
                alt={movie.title}
              />
            </div>
            <div className="movie-details__info mt-4 md:mt-0 mx-4 md:mx-0 md:w-2/3 text-gray-100">
              <h1 className="text-3xl md:text-5xl font-bold text-center md:text-left">
                {movie.title}
              </h1>
              <div className="py-2">
                <div className="">
                  <h1 className="py-1 text-sm md:text-base text-center md:text-left font-mono font-semibold">
                    {movie.runtime} min | {movie.release_date}
                  </h1>
                </div>
                <div className="">
                  {genreList?.map((genre) => (
                    <Link key={genre.id} to={`/genre/${genre.id}`}>
                      <h1 className="inline-block text-sm md:text-base font-mono font-semibold mr-2">
                        {genre.name} |
                      </h1>
                    </Link>
                  ))}
                </div>
              </div>
              {movie.homepage && (
                <div className="flex flex-row flex-wrap items-end">
                  <h1 className="text-lg md:text-xl font-bold">Watch at: </h1>
                  <a href={movie.homepage} target="_blank" className="pl-5 ">
                    Streaming Service
                  </a>
                </div>
              )}
              <div className="flex flex-row flex-wrap items-end">
                <h1 className="text-lg md:text-xl font-bold">
                  External Links:{" "}
                </h1>
                {externalIds.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${externalIds.imdb_id}`}
                    target="_blank"
                    className="pl-5 "
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/imdb.png"
                      className="h-10 item-end"
                    />
                  </a>
                )}
              </div>
              <div className="movie-details__overview container py-4">
                <h1 className="text-3xl font-bold">Overview</h1>
                <p className="text-lg py-4 text-justify">{movie.overview}</p>
              </div>
            </div>
          </div>
          {videos.length > 0 && (
            <div className="movie-details__cast container mx-auto">
              <h1 className="text-3xl font-bold p-4 md:p-10">Videos</h1>
              <div className="movie-details__cast__scroll flex flex-row flex-nowrap overflow-x-auto">
                {videos.reverse().map((video) => (
                  <Link
                    key={video.id}
                    onClick={() => {
                      window.open(
                        `https://www.youtube.com/watch?v=${video.key}`,
                        "_blank"
                      );
                    }}
                  >
                    <div className="flex flex-col items-start mx-2 md:mx-3">
                      <div className="movie-details_videos w-32 overflow-hidden rounded-lg">
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/0.jpg`}
                          alt={video.name}
                        />
                      </div>
                      <span className="text-base font-bold line-clamp-2 w-32">
                        {video.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {images.length > 0 && (
            <div className="movie-details__cast container mx-auto">
              <h1 className="text-3xl font-bold p-4 md:p-10">Images</h1>
              <div className="movie-details__cast__scroll flex flex-row flex-nowrap overflow-x-auto">
                {images.map((image) => (
                  <Link
                    key={image.id}
                    onClick={() => {
                      window.open(
                        `https://image.tmdb.org/t/p/original${image.file_path}`,
                        "_blank"
                      );
                    }}
                  >
                    <div className="movie-details_videos w-72 md:w-96 mx-2 md:mx-5 overflow-hidden rounded-lg">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt={image.name}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="movie-details__cast container mx-auto">
            <h1 className="text-3xl font-bold p-4 md:p-10">Cast</h1>
            <div className="movie-details__cast__scroll flex flex-row flex-nowrap overflow-x-auto">
              {cast.map((cast) => (
                <Link key={cast.id} reloadDocument to={`/person/${cast.id}`}>
                  <div className="flex flex-col items-start mx-2 md:mx-3">
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
                    <div className="flex flex-col w-32 line-clamp-4">
                      <span className="text-base font-bold">{cast.name}</span>
                      <br />
                      <span className="text-base font-mono">
                        {cast.character}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Similar Movies */}
          <div className="movie-details__recommended container mx-auto bg-base-300">
            <h1 className="text-3xl font-bold p-4 md:p-10">Similar Movies</h1>
            <div className="movie-details__recommended__scroll flex flex-row flex-nowrap overflow-x-auto">
              {similar?.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <div className="flex flex-col items-start mx-2 md:mx-3">
                    <div className="movie-details__recommended__scroll__image w-32 overflow-hidden rounded-lg">
                      <img
                        src={
                          movie.poster_path !== null
                            ? "https://image.tmdb.org/t/p/w300" +
                              movie.poster_path
                            : "https://via.placeholder.com/300x450"
                        }
                        alt={movie.title}
                      />
                    </div>
                    <div className="flex flex-col w-32 line-clamp-4">
                      <span className="text-base font-bold">{movie.title}</span>
                      <br />
                      <span className="text-base font-mono">
                        {movie.release_date}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
