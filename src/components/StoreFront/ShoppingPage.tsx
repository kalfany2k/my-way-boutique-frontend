import texture from "../../assets/pictures/texture.jpg";
import useData from "../../hooks/useData";
import ProductGrid, { ProductData } from "./ProductGrid";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { pluralToSingular } from "../../assets/types/types";

const ITEMS_PER_PAGE = 16;

interface QueryParams {
  categories?: string | null;
  type?: string | null;
  gender?: string | null;
  skip: number;
}

export const singularToPlural: Record<string, string> = Object.entries(
  pluralToSingular,
).reduce(
  (acc, [plural, singular]) => ({
    ...acc,
    [singular]: plural,
  }),
  {},
);

const ShoppingPage = () => {
  const { category, type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const queryParams: QueryParams = {
    categories: category || searchParams.get("category") || null,
    type: (type && pluralToSingular[type]) || searchParams.get("type") || null,
    gender: searchParams.get("gender"),
    skip: Number(searchParams.get("skip")) || 0,
  };

  const { data, count, error, isLoading } = useData<ProductData>(
    "/products",
    { params: queryParams },
    [location],
  );

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("skip", newPage.toString());
    setSearchParams(newParams);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-6 flex h-fit min-h-screen flex-col items-center">
      <div
        className="mb-6 flex h-[15%] min-h-24 min-w-80 max-w-fit items-center justify-center rounded-sm bg-no-repeat px-2 shadow-xl lg:px-12"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: "200%",
          backgroundPosition: "center",
        }}
      >
        <span className="font-overlock-black text-4xl text-rose-950 lg:text-6xl">
          {(queryParams.type &&
            queryParams.categories &&
            (
              singularToPlural[queryParams.type] || queryParams.type
            ).toUpperCase() +
              " " +
              queryParams.categories.replace("_", " ").toUpperCase()) ||
            (queryParams.categories &&
              "ARTICOLE " +
                queryParams.categories.replace("_", " ").toUpperCase()) ||
            (queryParams.type &&
              (
                singularToPlural[queryParams.type] || queryParams.type
              ).toUpperCase())}
        </span>
      </div>
      <div className="flex h-fit w-dvw justify-center lg:w-4/5">
        <ProductGrid items={data} />
      </div>
      <div className="mt-6 flex h-12 w-fit flex-row justify-around">
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
              className={`mx-1 h-10 w-10 rounded ${
                page === queryParams.skip
                  ? "bg-rose-500 text-white"
                  : "bg-rose-100 hover:bg-rose-200"
              }`}
            >
              {page + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingPage;
