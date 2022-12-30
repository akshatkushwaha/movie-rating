import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "../components/Grid";

import { getMoviesByGenre } from "../api/movies";

export default function GenreGrid() {
  const navigation = useNavigate();
  const genreId = window.location.pathname.split("/")[3];
  const [title, setTitle] = useState("");
  const currentPage = parseInt(window.location.pathname.split("/")[4]) || 1;
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [prevButtonClass, setPrevButtonClass] = useState("");
  const [nextButtonClass, setNextButtonClass] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    fetchMoviesByGenre();

    if (currentPage === 1) {
      setPrevButtonClass("opacity-50 cursor-not-allowed disabled");
    } else {
      setPrevButtonClass("");
    }

    if (currentPage === totalPages) {
      setNextButtonClass("opacity-50 cursor-not-allowed disabled");
    } else {
      setNextButtonClass("");
    }

    pageNumberGenerator();

    document.title = `Movies | ${title} | Page ${currentPage}`;
  }, [currentPage]);

  const fetchMoviesByGenre = async () => {
    setLoading(true);
    await getMoviesByGenre(genreId, currentPage)
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages);
        setTotalResults(res.data.total_results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pageNumberGenerator = () => {
    let pageNumbers = [];
    const maxPageNumbers = 10;
    const maxPageNumbersBeforeCurrentPage = Math.floor(maxPageNumbers / 2);
    const maxPageNumbersAfterCurrentPage = Math.ceil(maxPageNumbers / 2) - 1;

    let startPage, endPage;
    if (totalPages <= maxPageNumbers) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= maxPageNumbersBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPageNumbers;
      } else if (currentPage + maxPageNumbersAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPageNumbers + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPageNumbersBeforeCurrentPage;
        endPage = currentPage + maxPageNumbersAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    setPageNumbers(pageNumbers);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-row items-center justify-center bg-base-300">
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 animate-spin fill-primary text-base-content"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center text-base-content p-4">
          Loading...
        </h1>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center bg-base-300 text-base-content">
          <div className="container flex flex-row flex-wrap justify-center">
            {movies.length > 0 ? (
              <div className="flex flex-row flex-wrap justify-center">
                <h1 className="text-4xl font-bold text-center  p-4">{title}</h1>
                <div className="flex flex-row flex-wrap justify-between w-full md:pb-8 px-4 md:px-20">
                  <p className="text-sm md:text-base md:font-bold text-center ">
                    Page {currentPage} of {totalPages} Pages
                  </p>
                  <p className="text-sm md:text-base md:font-bold text-center ">
                    Total Results: {totalResults}
                  </p>
                </div>
                <Grid movies={movies} />
              </div>
            ) : (
              <div className="h-screen flex flex-col justify-center">
                <h1 className="text-4xl font-bold">No Data Found</h1>
              </div>
            )}
          </div>
          <div className="container flex flex-row justify-center text-primary-content my-10">
            <button
              className={
                "p-4 mx-4 rounded bg-primary hover:bg-primary-focus" +
                prevButtonClass
              }
              onClick={() => {
                navigation(`/genre/${genreId}/${currentPage - 1}`);
              }}
            >
              Previous
            </button>
            <div className="flex flex-row justify-center">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  className="h-14 w-14 mx-4 rounded bg-primary hover:bg-primary-focus"
                  onClick={() => {
                    navigation(`/${genreId}/${number}`);
                  }}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              className={
                "p-4 mx-4 rounded bg-primary hover:bg-primary-focus" +
                nextButtonClass
              }
              onClick={() => {
                navigation(`/genre/${genreId}/${currentPage + 1}`);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }
}
