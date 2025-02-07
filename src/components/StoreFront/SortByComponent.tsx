import { ArrowDown, ArrowRightIcon, ChevronsRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const sortCriterions = [
  "cele mai recente",
  "popularitatea vanzarilor",
  "pret, crescator",
  "pret, descrescator",
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
      className={`relative mt-2 flex lg:mt-0 ${sortDropdownToggled ? "rounded-t-sm" : "rounded-sm"} w-full flex-row items-center justify-between bg-gray-100 px-1 py-2 ring-1 ring-gray-500 md:w-[22rem]`}
      onClick={() => toggleSortDropdown(!sortDropdownToggled)}
      ref={sortByRef}
    >
      <span className="ml-2 whitespace-nowrap font-nunito-medium text-sm">
        Sorteaza dupa {sortCriterions.at(sortByTerm)}
      </span>
      <ArrowDown
        size={20}
        className={`${sortDropdownToggled ? "rotate-180" : "rotate-0"} mr-1 transition-transform duration-300 ease-in-out`}
      />
      <div
        className={`${sortDropdownToggled ? "rounded-b-sm" : "invisible"} absolute left-0 top-[calc(100%+1px)] z-10 flex h-fit w-full flex-col divide-y-[1px] divide-gray-400 font-nunito-regular ring-1 ring-gray-500`}
      >
        {sortCriterions.map((criterion, index) => (
          <div
            key={index}
            aria-label={"selecteaza sortarea dupa " + sortCriterions.at(index)}
            onClick={() => handleSortingCriterionChange(index)}
            className={`${sortByTerm === index ? "bg-rose-100" : "bg-white"} flex h-8 w-full items-center transition-colors duration-300 hover:bg-rose-200`}
          >
            <span className="ml-2 text-sm">Sorteaza dupa {criterion}</span>
          </div>
        ))}
      </div>
    </button>
  );
};

export default SortByComponent;
