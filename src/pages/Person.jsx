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

  return (
    <>
      <div className="w-full pt-12 bg-base-300">
        <div className="container flex flex-row justify-around py-10 px-8 mx-auto rounded-2xl bg-gray-900">
          <div className="flex flex-col w-1/4 rounded-lg overflow-hidden">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/original${person.profile_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={person.name}
            />
          </div>
          <div className="flex flex-col w-2/3">
            <div className="flex flex-row">
              <h1 className="text-5xl font-bold text-base-content mb-4">
                {person.name + " |"}
              </h1>
              <span className="text-xl font-bold text-info-content pt-7 mb-4">
                {person.known_for_department}
              </span>
            </div>
            <div className="flex flex-row">
              <time dateTime="2020-03-16" className="text-lg font-mono">
                {person.birthday}
                {(person.deathday && " - " + person.deathday) || (
                  <span className="text-base-content pr-2"> - Present</span>
                )}
              </time>
              <span className="text-lg font-mono font-bold text-base-content">
                {"| " + gender[person.gender - 1]}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="text-lg font-mono font-bold text-base-content">
                {person.place_of_birth}
              </span>
            </div>
            <p className="text-lg text-justify pt-4">{person.biography}</p>
            {/* External Links */}
            <div className="flex flex-row pt-4">
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
        <div className="container mx-auto px-10 bg-base-300">
          <h1 className="text-3xl font-bold py-8">Known for</h1>
          {/* <div className="flex flex-row flex-wrap justify-center"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {combinedCredits?.cast?.map((movie) => (
              <MovieCard key={movie.id} {...movie} genreDB={genreDB} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
