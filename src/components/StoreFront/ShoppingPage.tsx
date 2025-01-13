import useData from "../../hooks/useData";
import ProductGrid, { ProductData } from "./ProductGrid";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { pluralToSingular, singularToPlural } from "../../assets/types/plurals";
import SortByComponent from "./SortByComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 16;

interface QueryParams {
  categories?: string | null;
  type?: string | null;
  gender?: string | null;
  search?: string | null;
  sort_by?: string | null;
  skip: number;
}

const ShoppingPage = () => {
  const { category, type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const queryParams: QueryParams = {
    categories: category || searchParams.get("categories") || null,
    type: (type && pluralToSingular[type]) || searchParams.get("type") || null,
    search: searchParams.get("search"),
    gender: searchParams.get("gender"),
    sort_by: searchParams.get("sort_by"),
    skip: Number(searchParams.get("skip")) || 0,
  };

  // prettier-ignore
  const { data, count, error, isLoading } = useData<ProductData>("/products", { params: queryParams }, [location], );

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const scrollableDiv = document.getElementById("scrollable-div");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "auto" });
    }
    setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("skip", newPage.toString());
      setSearchParams(newParams);
    }, 400);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-page-height w-full flex-grow flex-col items-center">
      {(queryParams.categories || queryParams.type || queryParams.gender) && (
        <div className="mb-3 flex min-h-24 w-full items-center justify-center border-b-[1px] border-black px-2 shadow-xl lg:px-12">
          <span className="font-signika-medium text-4xl text-gray-800 lg:text-5xl">
            {(
              queryParams.type &&
              queryParams.categories &&
              (singularToPlural[queryParams.type] || queryParams.type) +
                " " +
                queryParams.categories.replace("_", " ")
            )?.toUpperCase() ||
              (
                queryParams.categories &&
                "Articole " + queryParams.categories.replace("_", " ")
              )?.toUpperCase() ||
              (
                queryParams.type &&
                (singularToPlural[queryParams.type] || queryParams.type)
              )?.toUpperCase() ||
              (
                queryParams.gender && "PRODUSE PENTRU " + queryParams.gender
              )?.toUpperCase()}
          </span>
        </div>
      )}

      <div
        className={`${queryParams.search ? "mt-3" : ""} mb-6 flex h-fit w-dvw flex-col items-center lg:w-4/5`}
      >
        <div className="mb-3 flex w-full flex-row items-center justify-between">
          {/* prettier-ignore */}
          <span className="">
            {count} {count > 20 ? "de" : ""} produse gasite {queryParams.search ? "pentru cautarea termenului \"" + queryParams.search + "\"" : ""}
          </span>
          <SortByComponent />
        </div>
        <ProductGrid items={data} count={count} />
      </div>

      {totalPages > 1 && (
        <div className="relative mt-auto flex h-12 w-fit flex-row items-center justify-around">
          {queryParams.skip > 1 && (
            <div className="absolute left-0 flex -translate-x-full cursor-pointer items-center justify-center">
              <ChevronLeft
                className=""
                onClick={() => handlePageChange(queryParams.skip - 1)}
              />
            </div>
          )}

          {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
            // Show first page, last page, current page, and pages around current
            const shouldShow =
              page === 0 ||
              page === totalPages - 1 ||
              Math.abs(page - queryParams.skip) <= 1;

            if (!shouldShow) {
              // Show ellipsis if there's a gap
              if (page === 1 || page === totalPages - 2) {
                return (
                  <span key={page} className="mx-2 mt-1 lg:mx-1">
                    ...
                  </span>
                );
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 h-10 w-10 rounded transition-colors duration-300 ease-out ${
                  page === queryParams.skip
                    ? "bg-rose-500 text-white"
                    : "bg-rose-100 hover:bg-rose-200"
                }`}
              >
                {page + 1}
              </button>
            );
          })}
          {queryParams.skip < totalPages - 2 && (
            <div className="absolute right-0 flex translate-x-full cursor-pointer items-center justify-center">
              <ChevronRight
                className=""
                onClick={() => handlePageChange(queryParams.skip + 1)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShoppingPage;
