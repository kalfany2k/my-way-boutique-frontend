import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/types/categories";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);

  return (
    <div className="z-header hidden w-full border-b-[1px] border-black lg:block">
      <div className="mx-auto flex h-8 w-4/5 items-center justify-between bg-white xl:w-2/3">
        {categories.map((category, index) => (
          <div
            className="relative flex h-full flex-col items-center justify-center"
            key={index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(-1)}
          >
            <Link to={category.path} className="mt-[2px] flex flex-row">
              <span className="font-nunito-semibold text-lg">
                {category.name}
              </span>
              {category.subcategories.length > 0 && (
                <ChevronLeft
                  size={20}
                  className={`mt-[4.5px] ${hoveredCategory === index ? "-rotate-90" : "-rotate-0"} transition-transform duration-300 ease-in-out`}
                />
              )}
            </Link>
            {category.subcategories.length > 0 && (
              <div
                className={`${hoveredCategory === index ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0"} absolute left-1/2 top-full z-10 flex h-fit min-h-80 w-fit -translate-x-1/2 flex-row divide-x-[1px] divide-black border-[1px] border-black bg-white p-4 font-overlock-regular text-lg transition-all duration-[400ms] ease-in-out`}
              >
                <div className="mr-4 flex w-fit flex-col divide-y-[1px] divide-black">
                  {category.subcategories.map((subcategory, secondaryIndex) => (
                    <Link
                      key={index + "-" + secondaryIndex}
                      to={subcategory.path}
                      onClick={() => setHoveredCategory(-1)}
                      className="flex w-full justify-center py-[1px]"
                    >
                      <span className="text-center hover:text-rose-900 xl:whitespace-nowrap">
                        {subcategory.name}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="w-64 xl:w-96"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
