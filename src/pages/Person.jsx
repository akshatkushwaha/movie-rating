import React, { useEffect, useState } from "react";

import {
  getPersonDetails,
  getPersonCombinedCredits,
  getPersonExternalIds,
  getPersonImages,
  getPersonTaggedImages,
} from "../api/Person";
import { getGenres } from "../api/movies";
import MovieCard from "../components/MovieCard";

export default function Person() {
  const id = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [combinedCredits, setCombinedCredits] = useState({});
  const gender = ["Female", "Male", "Non-Binary"];
  const [genreDB, setGenreDB] = useState([]);
  const [externalIds, setExternalIds] = useState({});
  const [images, setImages] = useState({});
  const [taggedImages, setTaggedImages] = useState({});

  useEffect(() => {
    fetchGenresDB();
    fetchPersonDetails();
    fetchPersonCombinedCredits();
    fetchPersonsExternalIds();
    // fetchPersonImages();
    // fetchPersonTaggedImages();
  });

  const fetchPersonDetails = async () => {
    const response = await getPersonDetails(id);
    document.title = `Person | ${response.data.name}`;
    setPerson(response.data);
    setLoading(false);
  };

  const fetchPersonCombinedCredits = async () => {
    const response = await getPersonCombinedCredits(id);
    setCombinedCredits(response.data);
  };

  const fetchGenresDB = async () => {
    const genresDB = await getGenres();
    setGenreDB(genresDB.data.genres);
  };

  const fetchPersonsExternalIds = async () => {
    const response = await getPersonExternalIds(id);
    setExternalIds(response.data);
  };

  const fetchPersonImages = async () => {
    const response = await getPersonImages(id);
    setImages(response.data);
  };

  const fetchPersonTaggedImages = async () => {
    const response = await getPersonTaggedImages(id);
    setTaggedImages(response.data);
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
  } else
    return (
      <>
        <div className="w-full bg-base-300">
          <div className="container flex flex-row flex-wrap justify-around py-8 px-8 mx-auto rounded-2xl bg-neutral">
            <div className="flex flex-col md:w-1/4 rounded-lg overflow-hidden">
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                    : "https://via.placeholder.com/500x750"
                }
                alt={person.name}
              />
            </div>
            <div className="flex flex-col py-4 md:py-0 md:w-2/3 text-neutral-content">
              <div className="flex flex-row flex-wrap item-end">
                <h1 className="text-2xl md:text-5xl font-bold mb-4">
                  {person.name}
                </h1>
                <span className="px-2 md:px-4 text-2xl md:text-4xl">|</span>
                <span className="text-base md:text-xl font-bold font-mono mb-4">
                  {person.known_for_department}
                </span>
              </div>
              <div className="flex flex-row flex-wrap">
                <time dateTime="2020-03-16" className="text-base font-mono">
                  {person.birthday}
                  {(person.deathday && " - " + person.deathday) || (
                    <span className="pr-2"> - Present</span>
                  )}
                </time>
                <span className="text-base font-mono font-bold">
                  {"| " + gender[person.gender - 1]}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="text-base font-mono font-bold">
                  {person.place_of_birth}
                </span>
              </div>
              <p className="text-base md:text-lg text-justify pt-2 indent-10">
                {person.biography}
              </p>
              {/* External Links */}
              <div className="flex flex-row flex-wrap justify-between md:justify-start pt-4">
                {externalIds?.imdb_id && (
                  <a
                    href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/imdb.png"
                      alt="IMDB"
                    />
                  </a>
                )}
                {externalIds?.facebook_id && (
                  <a
                    href={`https://www.facebook.com/${externalIds.facebook_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/facebook-new.png"
                      alt="Facebook"
                    />
                  </a>
                )}
                {externalIds?.instagram_id && (
                  <a
                    href={`https://www.instagram.com/${externalIds.instagram_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/instagram-new.png"
                      alt="Instagram"
                    />
                  </a>
                )}
                {externalIds?.twitter_id && (
                  <a
                    href={`https://www.twitter.com/${externalIds.twitter_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="https://img.icons8.com/color/48/000000/twitter.png"
                      alt="Twitter"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto md:px-10 bg-base-300">
            <h1 className="text-3xl font-bold p-4 md:py-8">Known for</h1>
            {/* <div className="flex flex-row flex-wrap justify-center"> */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {combinedCredits?.cast?.map((movie) => (
                <MovieCard key={movie.id} {...movie} genreDB={genreDB} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
}
