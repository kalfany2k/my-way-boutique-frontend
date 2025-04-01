import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/types/categories";
import placeholder from "../../assets/pictures/placeholder1x1.jpg";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState<number>(-1);

  return (
    <div className="relative z-header hidden w-full border-b-[1px] border-black lg:block">
      <div className="mx-auto flex h-8 w-4/5 items-center justify-center bg-white xl:w-1/2">
        {categories.map((category, index) => (
          <div
            className="flex h-full flex-col items-center justify-center px-8"
            key={index}
            onMouseEnter={() => setHoveredCategory(index)}
            onMouseLeave={() => setHoveredCategory(-1)}
          >
            <Link
              to={category.path}
              className="mt-[2px] flex flex-row items-center"
            >
              <span className="mb-[3px] whitespace-nowrap font-nunito-regular text-xl">
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
                className={`${index === hoveredCategory ? "block" : "hidden"} absolute left-0 top-full flex h-96 w-[100dvw] flex-row items-center divide-x-[2px] divide-dotted divide-gray-500 border-b-[1px] border-black bg-white pb-4`}
              >
                <div className="flex h-[90%] w-1/2 items-start justify-end pr-12">
                  <div className="flex h-4/5 w-11/12 flex-row items-center justify-center xl:w-4/5 2xl:w-3/5">
                    <div className="h-full w-1/3 rounded-lg ring-1 ring-black"></div>
                    <div className="h-full w-2/3 border-2 border-dashed border-black"></div>
                  </div>
                </div>
                <div className="flex h-[90%] w-1/2 items-center justify-start pl-12">
                  <div className="flex h-full flex-row gap-8">
                    <div className="flex w-fit flex-col">
                      <span className="p-2 font-helvetica text-lg">Baieti</span>
                      <div className="mb-1 w-full border-b-[2px] border-dotted border-gray-500" />
                      {category.subcategories.map((subcategory, index) => (
                        <Link
                          to={subcategory.path}
                          key={index}
                          className="mx-2 font-helvetica text-lg"
                          onClick={() => setHoveredCategory(-1)}
                        >
                          <span className="text-base">{subcategory.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="flex w-fit flex-col">
                      <span className="p-2 font-helvetica text-lg"> Fete </span>
                      <div className="mb-1 w-full border-b-[2px] border-dotted border-gray-500" />
                      {category.subcategories.map((subcategory, index) => (
                        <Link
                          to={subcategory.path}
                          key={index}
                          className="mx-2 font-helvetica text-lg"
                        >
                          <span className="text-base">{subcategory.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
