import React, { Component } from "react";

import MovieCard from "../components/MovieCard";

import { getUpcomingMovies, getGenres } from "../api/movies";

export default class UpcomingMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      totalPages: -1,
      currentPage: 0,
      totalResults: 0,
      prevButtonClass: "",
      nextButtonClass: "",
      genreDB: [],
    };
    this.fetchUpcomingMovies = this.fetchUpcomingMovies.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.fetchGenresDB = this.fetchGenresDB.bind(this);
  }

  componentDidMount() {
    this.fetchUpcomingMovies();
    this.fetchGenresDB();
  }

  fetchUpcomingMovies = async () => {
    const page = Number(window.location.pathname.split("/")[2]);
    try {
      const movies = await getUpcomingMovies(page);
      this.setState({ movies: movies.data.results });
      this.setState({ totalPages: movies.data.total_pages });
      this.setState({ currentPage: movies.data.page });
      this.setState({ totalResults: movies.data.total_results });

      if (this.state.currentPage === 1) {
        this.setState({ prevButtonClass: "hidden" });
      } else {
        this.setState({ prevButtonClass: "block" });
      }

      if (this.state.currentPage === this.state.totalPages) {
        this.setState({ nextButtonClass: "hidden" });
      } else {
        this.setState({ nextButtonClass: "block" });
      }
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

  nextPage = () => {
    window.location.href = `/upcoming/${this.state.currentPage + 1}`;
  };

  previousPage = () => {
    window.location.href = `/upcoming/${this.state.currentPage - 1}`;
  };

  render() {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <div className="container flex flex-row flex-wrap justify-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 p-4">
              Upcoming Movies
            </h1>
            <div className="flex flex-row flex-wrap justify-between w-full px-28 py-10">
              <p className="text-base font-bold text-center text-gray-800">
                Page {this.state.currentPage} of {this.state.totalPages} Pages
              </p>
              <p className="text-base font-bold text-center text-gray-800">
                Total Results: {this.state.totalResults}
              </p>
            </div>

            <div className="flex flex-row flex-wrap justify-center">
              {this.state.movies.map.length > 0 ? (
                this.state.movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    genreDB={this.state.genreDB}
                  />
                ))
              ) : (
                <h1 className="text-4xl font-bold text-center text-gray-800">
                  No Movies Found
                </h1>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center py-5">
            <button
              className={
                this.state.prevButtonClass +
                " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
              }
              onClick={this.previousPage}
            >
              Previous
            </button>
            <button
              className={
                this.state.nextButtonClass +
                " bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4"
              }
              onClick={this.nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
