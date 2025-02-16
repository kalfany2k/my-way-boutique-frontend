import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/types/categories";
import placeholder from "../../assets/pictures/placeholder1x1.jpg";

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
            <Link
              to={category.path}
              className="mt-[2px] flex flex-row items-center"
            >
              <span className="mb-[3px] font-nunito-regular text-xl">
                {category.name}
              </span>
              {category.subcategories.length > 0 && (
                <ChevronLeft
                  size={20}
                  className={`${hoveredCategory === index ? "-rotate-90" : "-rotate-0"} transition-transform duration-300 ease-in-out`}
                />
              )}
            </Link>
            {category.subcategories.length > 0 && (
              <div
                className={`${hoveredCategory === index ? "scale-x-100 scale-y-100 opacity-100" : "pointer-events-none scale-x-90 scale-y-50 opacity-0"} absolute left-1/2 top-full z-10 flex h-fit w-fit min-w-36 origin-top -translate-x-1/2 flex-row divide-x-[1px] divide-black rounded-b-md border-[1px] border-black bg-white transition-all duration-300 ease-in-out`}
              >
                <div className="flex w-fit flex-col gap-y-[2px] p-4 font-nunito-medium text-lg">
                  {category.subcategories.map((subcategory, secondaryIndex) => (
                    <Link
                      key={index + "-" + secondaryIndex}
                      to={subcategory.path}
                      onClick={() => setHoveredCategory(-1)}
                      className="w-fit"
                    >
                      <span className="hover:text-rose-900 xl:whitespace-nowrap">
                        {subcategory.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
