import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import fetchProfile from "./api/auth";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";

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

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/popular/:page" element={<PopularMovies />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
