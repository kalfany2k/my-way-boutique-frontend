import { Link, useParams } from "react-router-dom";
import { ProductData } from "./ProductGrid";
import Rating from "./Rating";

interface Props {
  product: ProductData;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { setType } = useParams();
  const productUrl = setType
    ? "/seturi/" + setType + "/" + product.id
    : "/produse/" + product.type + "/" + product.id;

  return (
    <Link to={productUrl}>
      <div className="relative flex aspect-square flex-col items-center justify-between rounded-sm bg-rosy-nude-300">
        <div className="absolute right-0 top-0 m-2">
          {product.rating && <Rating rating={product.rating} size={16} />}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
