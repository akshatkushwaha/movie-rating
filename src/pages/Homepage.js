import React, { Component } from "react";
import getPopularMovies from "../api/movies";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: {},
    };
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  fetchPopularMovies = async () => {
    console.log("Fetching popular movies...");
    try {
      const response = await getPopularMovies(1);
      console.log(response);
      // this.setState({ movies: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-mono">Welcome to the Movie Database!</h1>
        </div>
      </>
    );
  }
}
