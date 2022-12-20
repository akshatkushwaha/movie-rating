import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import MoviesGrid from "./pages/MoviesGrid";
import MovieDetails from "./pages/MovieDetails";
import Person from "./pages/Person";
import TvDetails from "./pages/TvDetails";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PageNotFound />} />
        <Route path="/popular/:page" element={<MoviesGrid />} />
        <Route path="/toprated/:page" element={<MoviesGrid />} />
        <Route path="/upcoming/:page" element={<MoviesGrid />} />
        <Route path="/nowplaying/:page" element={<MoviesGrid />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/person/:id" element={<Person />} />
        <Route path="/tv/:id" element={<TvDetails />} />
      </Routes>
    </div>
  );
}
