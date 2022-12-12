import React, { Component } from "react";

import { getLatestMovie } from "../api/movies";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Movie: [],
    };
    this.fetchLatestMovie = this.fetchLatestMovie.bind(this);
  }

  componentDidMount() {
    this.fetchLatestMovie();
  }

  fetchLatestMovie = async () => {
    try {
      const movie = await getLatestMovie();
      this.setState({ Movie: movie.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="container mx-auto px-4 pt-16">
          <div className="popular-movies">
            <h2 className="uppercase tracking-wider text-orange-500 text-lg font-semibold">
              Latest Movie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              <div className="mt-8">
                <a href={`/movie/${this.state.Movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${this.state.Movie.poster_path}`}
                    alt="poster"
                    className="hover:opacity-75 transition ease-in-out duration-150"
                  />
                </a>
                <div className="mt-2">
                  <a
                    href={`/movie/${this.state.Movie.id}`}
                    className="text-lg mt-2 hover:text-gray:300"
                  >
                    {this.state.Movie.title}
                  </a>
                  <div className="flex items-center text-gray-400 text-sm mt-1">
                    <span>Release Date: {this.state.Movie.release_date}</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <span>Rating: {this.state.Movie.vote_average}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
