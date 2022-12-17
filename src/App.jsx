import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import PopularMovies from "./pages/PopularMovies";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/popular" element={<PopularMovies />} />
        {/* <Route path="/toprated/:page" element={<TopRatedMovies />} /> */}
        {/* <Route path="/upcoming/:page" element={<UpcomingMovies />} /> */}
        {/* <Route path="/nowplaying/:page" element={<NowPLaying />} /> */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}
