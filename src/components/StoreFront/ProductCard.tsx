import { Link } from "react-router-dom";
import { ProductData } from "./ProductGrid";
import Rating from "./Rating";

interface Props {
  product: ProductData;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={"/produse/" + product.type + "/" + product.id}>
      <div className="relative flex aspect-square flex-col items-center justify-between bg-rosy-nude-300">
        <div className="absolute right-0 top-0 m-2">
          <Rating rating={product.rating} size={16} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
