import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import fetchProfile from "./api/auth";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import TopRatedMovies from "./pages/TopRatedMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import NowPLaying from "./pages/NowPlaying";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: "",
    };
    // this.setUserData = this.setUserData.bind(this);
  }

  // componentDidMount() {
  //   this.setUserData();
  // }

  // setUserData = async () => {
  //   const dispatch = useDispatch();
  //   const userDataSlice = useSelector((state) => state.userData);
  //   const data = await fetchProfile().then((res) => res.data);
  //   dispatch(userDataSlice.actions.setLoginStatus(data));
  // };

  render() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/popular/:page" element={<PopularMovies />} />
          <Route path="/toprated/:page" element={<TopRatedMovies />} />
          <Route path="/upcoming/:page" element={<UpcomingMovies />} />
          <Route path="/nowplaying/:page" element={<NowPLaying />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    );
  }
}
