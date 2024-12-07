import { Link } from "react-router-dom";
import ItemCard from "./ItemCard";
import useData from "../../hooks/useData";
import { ProductData } from "../StoreFront/ProductGrid";
import SkeletonCard from "./SkeletonCard";

interface GridProps {
  name: string;
  type: string;
  categories?: string;
  path: string;
}

const HomeProductGrid: React.FC<GridProps> = ({
  name,
  type,
  categories,
  path,
}) => {
  const { data, isLoading, error } = useData<ProductData>("/products", {
    params: { type: type, limit: 8 },
  });

  const handleShowMore = () => {
    const scrollableDiv = document.getElementById("scrollable-div");
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  return (
    <>
      <div className="hero-item z-body mx-auto h-fit w-11/12 md:w-2/3">
        <div className="flex justify-center bg-gradient-to-b">
          <h1 className="px-4 text-center font-ethereal-bold text-4xl">
            {name}
          </h1>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {data.map((item, index) =>
            isLoading ? (
              <SkeletonCard key={item.id} />
            ) : (
              <ItemCard key={index} product={item} />
            ),
          )}
        </div>
        <div className="hero-item flex justify-center">
          <Link
            to={path}
            className="font-ethereal-light text-lg font-bold hover:underline lg:text-xl"
            onClick={handleShowMore}
          >
            Apasa aici pentru a vedea mai multe
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeProductGrid;
