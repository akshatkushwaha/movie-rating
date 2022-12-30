import React, { useEffect, useState } from "react";

import { Route, Routes, useSearchParams } from "react-router-dom";

import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

import GenreDBContext from "./Context/GenreDBContext";

import { getSessionId } from "./api/auth";
import { getMoviesGenres } from "./api/movies";
import { getTvGenres } from "./api/tv";

import Navbar from "./components/Navbar";
import MovieTrend from "./pages/MovieTrend";
import MovieDetails from "./pages/MovieDetails";
import Person from "./pages/Person";
import TvDetails from "./pages/TvDetails";
import PageNotFound from "./pages/PageNotFound";
import GenreGrid from "./pages/GenreGrid";
import Footer from "./components/Footer";
import TvShowTrend from "./pages/TvShowTrend";

export default function App() {
  const [searchParams] = useSearchParams();
  const [sessionID, setSessionID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [genreDB, setGenreDB] = useState([]);

  useEffect(() => {
    fetchGenresDB();
    const requestToken = searchParams.get("request_token");
    if (requestToken) {
      createSession(requestToken);
    }
  }, []);

  const createSession = async (requestToken) => {
    const response = await getSessionId(requestToken);
    if (response.data.success) {
      localStorage.setItem("session_id", response.data.session_id);
      setLoggedIn(true);
      window.location.href = window.location.href.split("?")[0];
    } else {
      setError(true);
      setErrorMessage("Something went wrong");
    }
  };

  const fetchGenresDB = async () => {
    const movieGenreDB = await getMoviesGenres();
    const tvGenreDB = await getTvGenres();
    const genreDB = [...movieGenreDB.data.genres, ...tvGenreDB.data.genres];
    setGenreDB(genreDB);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-neutral fixed">
        <div className="text-2xl font-bold text-error-content">
          {errorMessage}
        </div>
        <button
          className="bg-error text-error-content p-4 rounded-md"
          onClick={() => {
            setError(false);
            setErrorMessage("");
          }}
        >
          Try Again
        </button>
      </div>
    );
  } else
    return (
      <GenreDBContext.Provider value={genreDB}>
        <Navbar />
        <Routes>
          <Route index element={<PageNotFound />} />
          <Route path="movie/">
            <Route path="popular/:page" element={<MovieTrend />} />
            <Route path="upcoming/:page" element={<MovieTrend />} />
            <Route path="genre/:id/:page" element={<GenreGrid />} />
            <Route path=":id" element={<MovieDetails />} />
          </Route>
          <Route path="tv/">
            <Route path="popular/:page" element={<TvShowTrend />} />
            <Route path="on_air/:page" element={<TvShowTrend />} />
            <Route path="genre/:id/:page" element={<GenreGrid />} />
            <Route path=":id" element={<TvDetails />} />
          </Route>
          <Route path="/person/:id" element={<Person />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className="fixed bottom-2 left-2 rounded-full bg-accent">
          <div className="goto-top flex justify-center items-center">
            <a href="#top">
              <ArrowUpCircleIcon className="h-10 w-10 text-accent-content z-30" />
            </a>
          </div>
        </div>
        <Footer />
      </GenreDBContext.Provider>
    );
}
