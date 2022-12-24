import React, { useEffect, createContext, useState } from "react";

import { Route, Routes, useSearchParams } from "react-router-dom";

import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

import { getSessionId } from "./api/auth";

import Navbar from "./components/Navbar";
import MoviesGrid from "./pages/MoviesGrid";
import MovieDetails from "./pages/MovieDetails";
import Person from "./pages/Person";
import TvDetails from "./pages/TvDetails";
import PageNotFound from "./pages/PageNotFound";
import GenreGrid from "./pages/GenreGrid";

const userSessionIdContext = createContext();

export default function App() {
  const [searchParams] = useSearchParams();
  const [sessionID, setSessionID] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
      <userSessionIdContext.Provider value={sessionID}>
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
          <Route path="/genre/:id/:page" element={<GenreGrid />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className="fixed bottom-2 left-2 rounded-full bg-accent">
          <div className="goto-top flex justify-center items-center">
            <a href="#top">
              <ArrowUpCircleIcon className="h-10 w-10 text-accent-content z-30" />
            </a>
          </div>
        </div>
      </userSessionIdContext.Provider>
    );
}
