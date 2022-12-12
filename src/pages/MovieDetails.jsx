import React, { Component } from "react";

import MovieCard from "../components/MovieCard";

import {
  getMovie,
  getGenres,
  getMovieProviders,
  getMovieDetails,
  getSimilarMovies,
} from "../api/movies";

export default class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      overview: "",
      release_date: "",
      runtime: 0,
      vote_average: 0,
      vote_count: 0,
      poster_path: "",
      backdrop_path: "",
      id: 0,
      genres: [],
      genreDB: [],
      genre_list: "",
      watchProviders: [],
      cast: [],
      similar: [],
    };

    this.fetchGenresDB = this.fetchGenresDB.bind(this);
    this.fetchMovie = this.fetchMovie.bind(this);
    this.generateGenereList = this.generateGenereList.bind(this);
    this.fetchMovieProviders = this.fetchMovieProviders.bind(this);
    this.fetchMovieDetails = this.fetchMovieDetails.bind(this);
    this.fetchSimilarMovies = this.fetchSimilarMovies.bind(this);
  }

  componentDidMount = async () => {
    await this.fetchGenresDB();
    await this.fetchMovie();
    this.generateGenereList();
    await this.fetchMovieProviders();
    await this.fetchMovieDetails();
    await this.fetchSimilarMovies();
  };

  fetchMovie = async () => {
    try {
      const id = window.location.pathname.split("/").pop();
      this.setState({ id: id });
      const movie = await getMovie(id);
      this.setState({ title: movie.data.title });
      this.setState({ overview: movie.data.overview });
      this.setState({ release_date: movie.data.release_date });
      this.setState({ runtime: movie.data.runtime });
      this.setState({ vote_average: movie.data.vote_average });
      this.setState({ vote_count: movie.data.vote_count });
      this.setState({ poster_path: movie.data.poster_path });
      this.setState({ backdrop_path: movie.data.backdrop_path });
      this.setState({ id: movie.data.id });
      this.setState({ genres: movie.data.genres });
    } catch (error) {
      console.log(error);
    }
  };

  fetchMovieProviders = async () => {
    try {
      const watchProviders = await getMovieProviders(this.state.id);
      this.setState({ watchProviders: watchProviders.data.results.IN });
    } catch (error) {
      console.log(error);
    }
  };

  fetchMovieDetails = async () => {
    try {
      const details = await getMovieDetails(this.state.id);
      this.setState({ cast: details.data.cast });
    } catch (error) {
      console.log(error);
    }
  };

  fetchSimilarMovies = async () => {
    try {
      const similar = await getSimilarMovies(this.state.id, 1);
      this.setState({ similar: similar.data.results });
    } catch (error) {
      console.log(error);
    }
  };

  fetchGenresDB = async () => {
    try {
      const genres = await getGenres();
      this.setState({ genreDB: genres.data.genres });
    } catch (error) {
      console.log(error);
    }
  };

  generateGenereList = () => {
    let movie_generes = [];
    this.state.genres.forEach((genre) => {
      this.state.genreDB.forEach((genre_db) => {
        if (genre_db.id === genre.id) {
          movie_generes.push(genre_db.name);
        }
      });
    });

    this.setState({ genre_list: movie_generes.join(", ") });
  };

  render() {
    return (
      <>
        {/* Backdrop */}
        <div className="movie-details__backdrop w-full overflow-hidden blur-sm opacity-30 fixed">
          <img
            className="w-full object-cover bg-cover bg-center"
            src={
              "https://image.tmdb.org/t/p/original" + this.state.backdrop_path
            }
            alt={this.state.title}
          />
        </div>
        {/*  */}
        <div className="w-full pt-12">
          <div className="movie-details flex flex-row flex-wrap container mx-auto p-10 justify-around top-0">
            <div className="movie-details__poster w-fit overflow-hidden rounded-lg mx-5 flex flex-col">
              <img
                src={"https://image.tmdb.org/t/p/w300" + this.state.poster_path}
                alt={this.state.title}
              />
            </div>
            <div className="movie-details__info w-2/3">
              <h1 className="text-5xl font-bold ">{this.state.title}</h1>
              <div className="py-2">
                <div className="py-2">
                  <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                    {this.state.runtime} min | {this.state.release_date}
                  </span>
                </div>
                <div className="py-2">
                  <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                    {this.state.genre_list}
                  </span>
                </div>
              </div>
              {/* Watch Providers */}
              <div className="py-2">
                <div className="flex flex-row flex-wrap">
                  {this.state.watchProviders?.rent?.length > 0 && (
                    <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                      Rent:
                    </span>
                  )}
                  {this.state.watchProviders?.rent?.map((provider) => (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w300" + provider.logo_path
                      }
                      alt={provider.provider_name}
                      className="inline-block h-8 m-2 rounded-full"
                    />
                  ))}
                </div>
                <div className="flex flex-row flex-wrap">
                  {this.state.watchProviders?.buy?.length > 0 && (
                    <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                      Buy:
                    </span>
                  )}
                  {this.state.watchProviders?.buy?.map((provider) => (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w300" + provider.logo_path
                      }
                      alt={provider.provider_name}
                      className="inline-block h-8 m-2 rounded-full"
                    />
                  ))}
                </div>
                <div className="flex flex-row flex-wrap">
                  {this.state.watchProviders?.flatrate?.length > 0 && (
                    <span className="inline-block py-1 text-base font-semibold text-gray-700 mr-2">
                      Flatrate:
                    </span>
                  )}
                  {this.state.watchProviders?.flatrate?.map((provider) => (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w300" + provider.logo_path
                      }
                      alt={provider.provider_name}
                      className="inline-block h-8 m-2 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="movie-details__overview container py-4">
                <h1 className="text-3xl font-bold">Overview</h1>
                <p className="text-lg py-4">{this.state.overview}</p>
              </div>
            </div>
          </div>
          <div className="movie-details__cast container mx-auto px-10">
            <h1 className="text-3xl font-bold p-10">Cast</h1>
            {/* Horizontal Scroll */}
            <div className="movie-details__cast__scroll flex flex-row flex-nowrap overflow-x-auto">
              {this.state.cast.map((cast) => (
                <div key={cast.id} className="flex flex-col items-start m-5">
                  <div className="movie-details__cast__scroll__image w-32 overflow-hidden rounded-lg">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + cast.profile_path
                      }
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
              {this.state.similar.map.length > 0 ? (
                this.state.similar.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    genreDB={this.state.genreDB}
                  />
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
      </>
    );
  }
}
