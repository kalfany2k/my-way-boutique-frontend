import { useParams } from "react-router-dom";
import { ProductData, ReviewData } from "./ProductGrid";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { AxiosError } from "axios";
import ErrorPage from "./ErrorPage";
import ImageLayout from "./ImageLayout";
import ShoppingForm from "./ShoppingForm";

const ProductPage = () => {
  const params = useParams<{ productID: string }>();
  const [product, setProduct] = useState<ProductData>();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (params.productID) {
          const fetchedProduct = await apiClient
            .get("/products/" + params.productID)
            .then((res) => res.data);
          setProduct(fetchedProduct);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status == 404) {
            setError(
              `Resursa cu id-ul ${params.productID} nu a putut fi gasita`,
            );
          } else {
            setError(`O eroare neasteptata s-a intamplat`);
          }
        }
      }
    };
    setIsLoading(true);
    fetchProduct();
    setIsLoading(false);
  }, [params.productID]);

  if (product)
    return (
      <div className="mt-8 grid h-fit grid-cols-1 lg:grid-cols-2">
        <div className="lg:mr-2">
          <ImageLayout
            images={
              product.secondary_images
                ? [product.primary_image].concat(product.secondary_images)
                : [product.primary_image]
            }
          />
        </div>
        <div className="flex flex-col items-center lg:ml-2 lg:items-start">
          <div className="w-fit">
            <span className="font-merriweather-light text-3xl text-gray-800">
              {product.name}
            </span>
            <div className="mt-3 flex flex-row justify-between">
              <span className="font-overlock-regular text-xl">
                {product.price} RON
              </span>
              <div className="flex flex-row items-center">
                <Rating rating={product.rating} size={20} />
                <span className="ml-2">{product.rating}</span>
              </div>
            </div>
            <ShoppingForm />
          </div>
        </div>
      </div>
    );

  if (error) return <ErrorPage />;
};

export default ProductPage;
