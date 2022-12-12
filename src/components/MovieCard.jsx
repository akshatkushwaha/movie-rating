import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      poster_path: this.props.poster_path,
      release_date: this.props.release_date,
      vote_average: this.props.vote_average,
      overview: this.props.overview,
      id: this.props.id,
      genre_ids: this.props.genre_ids,
      genreDB: this.props.genreDB,
    };
    this.trimGeners = this.trimGeners.bind(this);
  }

  componentDidMount() {
    this.trimGeners(this.state.genre_ids);
  }

  trimGeners = (geners) => {
    const genre_ids = geners.slice(0, 3);
    this.setState({ genre_ids: genre_ids });
  };

  render() {
    return (
      <>
        <div className="max-w-xs rounded overflow-hidden shadow-2xl m-4 transform transition duration-500 hover:scale-110">
          <Link to={`/movie/${this.state.id}`}>
            <div className="w-full rounded overflow-hidden h-96">
              <img
                className="w-full"
                src={"https://image.tmdb.org/t/p/w300" + this.state.poster_path}
                alt={this.state.title}
              />
            </div>
            <div className="bg-white py-2 px-4">
              <h1 className="text-xl font-bold text-gray-800 py-2">
                {this.state.title}
              </h1>
              <div className="">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {this.state.vote_average}
                </span>

                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {this.state.release_date}
                </span>
              </div>
            </div>
          </Link>
          <div className="px-4 p-4 flex flex-row overflow-hidden bg-white">
            {this.state.genre_ids.map((id) => (
              <Link key={id} to={`/genre/${id}`}>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {this.state.genreDB.find((genre) => genre.id === id).name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  }
}
