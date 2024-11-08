import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/types/categories";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);

  return (
    <div className="z-header hidden w-full bg-warm-nude-300 shadow-md lg:block">
      <div className="mx-auto flex h-8 w-4/5 items-center justify-between font-nunito-semibold xl:w-2/3">
        {categories.map((category, index) => (
          <div
            className="relative flex h-full flex-col items-center justify-center"
            key={index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(-1)}
          >
            <Link to={category.path} className="mt-[2px] flex flex-row">
              {category.name}
              {category.subcategories.length > 0 && (
                <ChevronLeft
                  size={20}
                  className={`mt-[3px] ${hoveredCategory === index ? "-rotate-90" : ""} transition-transform duration-300 ease-in-out`}
                />
              )}
            </Link>
            {category.subcategories.length > 0 && (
              <div
                className={`${hoveredCategory === index ? "visible z-20 h-96 max-h-[32rem] w-[36rem] opacity-100" : "pointer-events-none invisible h-48 max-h-0 w-[24rem] opacity-0"} absolute left-1/2 top-8 z-10 flex -translate-x-[50%] flex-row overflow-hidden rounded-b-lg bg-warm-nude-300 font-nunito-regular transition-all duration-500 ease-in-out`}
              >
                <div className="flex h-full w-fit min-w-24 max-w-56 flex-col justify-center overflow-hidden border-r-[1px] border-gray-500">
                  {category.subcategories.map((subcategory, secondIndex) => (
                    <Link
                      key={index + "-" + secondIndex}
                      /* prettier-ignore */
                      className={`w-full whitespace-nowrap p-1 shadow-inner transition-colors duration-300 hover:bg-warm-nude-400/80`}
                      to={subcategory.path}
                      onClick={() => setHoveredCategory(-1)}
                    >
                      <span className="m-2">{subcategory.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="flex-1"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
