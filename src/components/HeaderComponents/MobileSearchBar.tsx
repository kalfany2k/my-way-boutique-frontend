import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function MobileSearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchTerm);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      <div
        className={`relative flex items-center overflow-hidden rounded-full bg-taupe-nude-200 transition-all duration-300 ease-in-out ${
          isOpen ? "h-10 w-64 shadow-md" : "h-10 w-10"
        }`}
      >
        <form onSubmit={handleSearch} className="flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cauta produse..."
            className={`w-full bg-transparent py-2 pl-4 pr-10 text-lg text-taupe-nude-900 placeholder-cool-nude-500 focus:outline-none ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </form>
        <button
          onClick={handleToggle}
          className="absolute right-0 p-2 text-cool-nude-700 focus:outline-none"
          aria-label={isOpen ? "Close search" : "Open search"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
