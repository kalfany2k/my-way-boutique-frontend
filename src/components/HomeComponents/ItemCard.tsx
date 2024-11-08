import { Link } from "react-router-dom";
import { ProductData } from "../StoreFront/ProductGrid";

interface Props {
  product: ProductData;
}

const ItemCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Link to={`/produse/${product.type}/${product.id}`} className="w-full">
        {/* <img
          src={product.primary_image}
          alt={product.name}
          className="h-auto w-full rounded-sm shadow-md"
        /> */}
        <div className="aspect-square w-full bg-pink-nude" />
      </Link>
      <p className="mt-2 text-center font-nunito-medium text-sm text-gray-700">
        {product.name}
      </p>
    </div>
  );
};

export default ItemCard;
