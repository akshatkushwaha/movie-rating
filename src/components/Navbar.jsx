import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { themeChange } from "theme-change";

import { useScrollDirection } from "../hooks/useScrollDirection";

import { getMovieUsingQuery } from "../api/movies";

const navigation = ["popular", "toprated", "upcoming", "nowplaying"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const scrollDirection = useScrollDirection();
  const path = window.location.pathname.split("/")[1];
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const themes = [
    "light",
    "dark",
    "cupcake",
    "retro",
    "halloween",
    "garden",
    "forest",
    "lofi",
    "pastel",
    "fantasy",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "coffee",
  ];

  useEffect(() => {
    themeChange(false);
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  });

  const handleSearch = async (search) => {
    setSearch(search);
    if (search === "") {
      setSearchResults([]);
    } else {
      await getMovieUsingQuery(search)
        .then((res) => {
          setSearchResults(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fullSearch = () => {
    window.location.href = `/search/${search}/1`;
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
  } else {
    return (
      <Disclosure
        as="nav"
        // className={classNames(
        //   scrollDirection === "down" ? "hidden" : "block",
        //   "bg-base-300 pb-1 md:pb-0 sticky top-0 w-full z-30 transition transform duration-300 ease-in-out"
        // )}
        className="bg-base-300 pb-1 md:pb-0 sticky top-0 w-full z-30"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl">
              <div className="relative flex h-10 md:h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-base-content hover:bg-base-200 hover:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <div className="hidden lg:hidden h-8 w-auto font-sans font-bold text-lg">
                      Movie Rating
                    </div>
                    <div className="hidden lg:block h-8 w-auto font-sans font-extrabold text-xl">
                      Movie Rating
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => {
                        const displayItem =
                          item.charAt(0).toUpperCase() + item.slice(1);
                        return (
                          <Link to={`/${item}/1`} key={item}>
                            <div
                              className={classNames(
                                path === item
                                  ? "bg-base-100 text-base-content"
                                  : "text-base-content hover:bg-base-100 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                            >
                              {displayItem}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="w-96 flex items-center justify-end md:items-stretch md:justify-start ">
                  <div className="w-full hidden md:block ">
                    <div className="w-full flex space-x-4 ">
                      <div className="w-full relative">
                        <input
                          type="text"
                          name="search"
                          id="search"
                          placeholder="Search"
                          className="bg-base-100 text-base-content rounded-md border-none block pl-6 pr-3 py-2 w-full md:text-sm border-base-300"
                          onChange={(e) => handleSearch(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              fullSearch();
                            }
                          }}
                        />
                        <MagnifyingGlassIcon
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 h-5 w-5 text-base-content"
                          onClick={fullSearch}
                        />
                        {searchResults.length > 0 && (
                          <div className="absolute w-full top-full left-0 bg-base-100 rounded-md shadow-lg z-30">
                            {searchResults.map((result) => (
                              <Link
                                reloadDocument
                                to={`${result.media_type}/${result.id}`}
                                key={result.id}
                                className="block px-4 py-2 text-base-content hover:bg-base-200"
                              >
                                <img
                                  src={
                                    result.poster_path
                                      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                      : result.profile_path
                                      ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
                                      : "https://via.placeholder.com/500x750"
                                  }
                                  alt={result.title || result.name}
                                  className="w-10 h-10 rounded-md object-cover inline-block mr-2"
                                />

                                <span className="text-sm">
                                  {result.title || result.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {loggedIn ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-base-300 text-sm">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://ui-avatars.com/api/?background=random"
                            alt="profile"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-base-content text-base-100"
                                    : "text-base-content",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-base-content text-base-100"
                                    : "text-base-content",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-base-content text-base-100"
                                    : "text-base-content",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <div className="flex flex-row">
                      <Link to="/login">
                        <div className="px-3 py-1 md:py-2 m-2 rounded-md text-sm font-medium text-accent-content bg-accent hover:bg-accent-focus">
                          Login
                        </div>
                      </Link>
                      <Link to="/register">
                        <div className="px-3 py-1 md:py-2 m-2 rounded-md text-sm font-medium text-primary-content bg-primary hover:bg-primary-focus">
                          Register
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="hidden lg:block dropdown dropdown-hover">
                  <label tabIndex={0} className="btn m-1">
                    Theme
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {themes.map((theme) => {
                      return (
                        <li key={theme}>
                          <option data-set-theme={theme}>
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </option>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="block lg:hidden dropdown dropdown-hover w-fit">
                <label tabIndex={0} className="btn m-1">
                  Theme
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu flex-nowrap p-1 shadow bg-base-100 rounded-box leading-6 h-[50vh] overflow-auto"
                >
                  {themes.map((theme) => {
                    return (
                      <li key={theme}>
                        <option data-set-theme={theme}>
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </option>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => {
                  const displayItem =
                    item.charAt(0).toUpperCase() + item.slice(1);
                  return (
                    <Disclosure.Button
                      key={item}
                      as="a"
                      href={`/${item}/1`}
                      className={classNames(
                        item === path
                          ? "bg-base-100 text-base-content"
                          : "text-base-content hover:bg-base-100 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item === path ? "page" : undefined}
                    >
                      {displayItem}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
            <div className="px-2 pb-2 flex items-center justify-end md:items-stretch md:justify-start ">
              <div className="w-full block md:hidden ">
                <div className="w-full flex space-x-4 ">
                  <div className="w-full relative">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search"
                      className="bg-base-100 text-base-content rounded-md border-none block pl-6 pr-3 py-2 w-full text-sm border-base-300"
                      onChange={(e) => handleSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fullSearch();
                        }
                      }}
                    />
                    <MagnifyingGlassIcon
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 h-5 w-5 text-base-content"
                      onClick={fullSearch}
                    />
                    {searchResults.length > 0 && (
                      <div
                        className="absolute w-full top-full left-0 rounded-md shadow-lg z-30 overflow-y-scroll"
                        onClick={() => setSearchResults([])}
                      >
                        <div className="w-fit h-[50vh] bg-base-100 rounded-md shadow-lg overflow-auto">
                          {searchResults.map((result) => (
                            <Link
                              reloadDocument
                              to={`${result.media_type}/${result.id}`}
                              key={result.id}
                              className="block px-4 py-2 text-base-content hover:bg-base-200"
                            >
                              <img
                                src={
                                  result.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                                    : result.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${result.profile_path}`
                                    : "https://via.placeholder.com/500x750"
                                }
                                alt={result.title || result.name}
                                className="w-10 h-10 rounded-md object-cover inline-block mr-2"
                              />

                              <span className="text-sm">
                                {result.title || result.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    );
  }
}
