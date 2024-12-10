import { useCurrency } from "../../contexts/CurrencyContext";
import ProductCard from "./ProductCard";

export type ProductData = {
  id: string;
  name: string;
  item_gender: string;
  type: string;
  categories: object | null;
  price: number;
  rating: number;
  primary_image: string;
  secondary_images: string[] | null;
  created_at: Date;
};

export type ReviewData = {
  user_id: number;
  product_id: string;
  message: string | null;
  stars: number;
  created_at: Date;
};

type Props = {
  items: ProductData[];
  count: number;
};

const ProductGrid: React.FC<Props> = ({ items, count }) => {
  const { formatPrice } = useCurrency();

  if (count > 0)
    return (
      <div className="grid w-11/12 grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col">
            <ProductCard product={item} />
            <span className="mt-1 w-full text-center font-nunito-semibold text-sm">
              {item.name.substring(0, item.name.lastIndexOf(" "))}
            </span>
            <span className="text-md mt-1 w-full text-center font-nunito-regular">
              {formatPrice(item.price)}
            </span>
          </div>
        ))}
      </div>
    );

  return <span>Niciun produs cu filtrele selectate nu a putut fi gasit</span>;
};

export default ProductGrid;
