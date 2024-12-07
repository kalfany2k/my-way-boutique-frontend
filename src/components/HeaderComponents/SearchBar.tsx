import { Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import apiClient from "../../services/apiClient";

interface SearchResult {
  id: string;
  name: string;
  type: string;
  primary_image: string;
}

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(true);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  let location = useLocation();

  useEffect(() => {
    location.pathname.startsWith("/centru-admin")
      ? setShow(false)
      : setShow(true);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.length > 2) {
      window.location.replace("/produse?search=" + searchTerm);
      closeSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    const handleClickInside = (event: MouseEvent) => {
      if (inputRef.current?.contains(event.target as Node)) {
        setShowResults(true);
      }
    };

    document.addEventListener("mousedown", handleClickInside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickInside);
    };
  }, []);

  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const performSearch = async (term: string) => {
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.get("/products", {
        params: { search: searchTerm, limit: 4 },
      });
      const data = response.data;
      setSearchResults(data.items);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(term);
    }, 250);
  };

  return (
    <div
      className={`absolute left-1/2 mt-[8.5rem] ${show ? "flex" : "hidden"} -translate-x-1/2 cursor-pointer rounded-full bg-rosy-nude-200 shadow-md transition-all duration-500 ease-in-out ${isOpen ? "" : "hover:bg-rosy-nude-300"} lg:relative lg:left-0 lg:mr-4 lg:mt-0 lg:-translate-x-0`}
    >
      <div
        className={`relative flex h-10 flex-row items-center justify-start overflow-hidden p-2 transition-all duration-500 ease-in-out lg:h-12 lg:p-3 lg:ring-0 ${isOpen ? "w-72 lg:w-80 2xl:w-96" : "w-10 lg:w-12"}`}
      >
        <button
          className="z-10 -ml-2 -mr-2 p-2"
          onClick={(e) => {
            isOpen ? handleSearch(e) : openSearch();
          }}
        >
          <Search className="h-6 w-6" />
        </button>

        <form onSubmit={handleSearch} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
            placeholder="Cauta produse..."
            className={`w-full overflow-hidden bg-transparent pl-2 pr-2 text-lg placeholder-black transition-opacity duration-300 focus:outline-none ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </form>
        {isOpen && (
          <button onClick={closeSearch}>
            <X className="size-7" />
          </button>
        )}
      </div>
      {searchResults?.length > 0 && isOpen && showResults && (
        <div
          ref={searchResultsRef}
          className="absolute left-0 right-0 top-full mt-2 max-h-96 overflow-y-auto rounded-lg bg-warm-nude-100"
        >
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Se caută...</div>
          ) : (
            <div className="divide-y divide-rosy-nude-300">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/produse/${result.type}/${result.id}`}
                  className="flex items-center bg-white px-4 py-3 transition-colors duration-100 ease-in-out hover:bg-rosy-nude-200"
                  onClick={closeSearch}
                >
                  <div>
                    <div className="text-sm font-medium">{result.name}</div>
                    <div className="text-xs text-gray-500">{result.id}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
