import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortCriterions = [
  "cele mai recente",
  "popularitatea vanzarilor",
  "pret, de la cel mai mic la cel mai mare",
  "pret, de la cel mai mare la cel mai mic",
];

const sortCriterionsParams = [
  "recente",
  "popularitate",
  "pret_asc",
  "pret_desc",
];

const SortByComponent = () => {
  const [sortByTerm, setSortByTerm] = useState<number>(0);
  const [sortDropdownToggled, toggleSortDropdown] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortByRef.current &&
        !sortByRef.current.contains(event.target as Node)
      ) {
        toggleSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortingCriterionChange = (index: number) => {
    setSortByTerm(index);
    const criterion = sortCriterionsParams.at(index);
    const newParams = new URLSearchParams(searchParams);
    if (criterion) newParams.set("sort_by", criterion);
    setSearchParams(newParams);
  };

  return (
    <button
      type="button"
      aria-label="alege criteriul sortarii"
      aria-checked="false"
      className="relative flex w-[25rem] flex-row items-center justify-between bg-gray-100 px-4 py-2 ring-1 ring-gray-500"
      onClick={() => toggleSortDropdown(!sortDropdownToggled)}
      ref={sortByRef}
    >
      <span className="mr-1 text-sm">
        Sorteaza dupa {sortCriterions.at(sortByTerm)}
      </span>
      <ArrowDown
        size={20}
        className={`${sortDropdownToggled ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`}
      />
      <div
        className={`${sortDropdownToggled ? "" : "invisible"} absolute left-0 top-[calc(100%+1px)] z-10 flex h-fit w-full flex-col ring-1 ring-gray-500`}
      >
        {sortCriterions.map((criterion, index) => (
          <div
            key={index}
            aria-label={"selecteaza sortarea dupa " + sortCriterions.at(index)}
            onClick={() => handleSortingCriterionChange(index)}
            className={`${sortByTerm === index ? "bg-gray-200" : "bg-gray-100"} flex h-8 w-full items-center transition-colors duration-300 hover:bg-gray-300`}
          >
            <span className="ml-2 text-sm">Sorteaza dupa {criterion}</span>
          </div>
        ))}
      </div>
    </button>
  );
};

export default SortByComponent;
