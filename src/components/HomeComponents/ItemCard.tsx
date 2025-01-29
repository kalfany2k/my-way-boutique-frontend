import { Link } from "react-router-dom";
import { ProductData } from "../StoreFront/ProductGrid";

interface Props {
  product: ProductData;
}

const ItemCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full flex-col items-center">
      <Link
        to={`/produse/${product.type}/${product.id}`}
        className="w-full"
        draggable="false"
      >
        <div className="aspect-square w-full bg-rose-100">
          <img
            className="h-full w-full bg-center object-cover"
            alt={product.name}
            src={product.primary_image}
            draggable="false"
          />
        </div>
      </Link>
      <p className="mt-2 text-center font-nunito-medium text-sm text-gray-700">
        {product.name}
      </p>
    </div>
  );
};

export default ItemCard;
