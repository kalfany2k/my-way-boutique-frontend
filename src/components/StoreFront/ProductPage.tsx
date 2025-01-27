import { useParams } from "react-router-dom";
import { ProductData, ReviewData } from "./ProductGrid";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { AxiosError } from "axios";
import ErrorPage from "./ErrorPage";
import ImageLayout from "./ImageLayout";
import ShoppingForm from "./ShoppingForm";
import { useCurrency } from "../../contexts/CurrencyContext";
import AccordionDetails from "./AccordionDetails";

const ProductPage = () => {
  const params = useParams<{ productID: string }>();
  const [product, setProduct] = useState<ProductData>();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formatPrice } = useCurrency();
  const initialURL = "/products/" + params.productID;

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (params.productID) {
          const fetchedProduct = await apiClient
            .get<ProductData>(initialURL)
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

          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.productID]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews
        const fetchedReviews = await apiClient
          .get<ReviewData[]>(initialURL + "/reviews")
          .then((res) => res.data);
        setReviews(fetchedReviews);
      } catch (error) {
        console.log(error);
      }
    };

    if (product?.rating) fetchReviews();
  }, [product]);

  if (isLoading) return <div className="min-h-page-height"></div>;

  if (error) return <ErrorPage />;

  if (product)
    return (
      <div className="flex h-fit w-full flex-col items-center justify-start overflow-hidden pb-[1px]">
        <span
          className="mt-4 text-center font-helvetica-thin text-4xl lg:text-5xl"
          id="product-name"
        >
          {product.name.slice(0, product.name.lastIndexOf(" "))}
        </span>
        <div className="mt-6 flex w-full flex-col items-center justify-center gap-2 md:gap-4 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex w-[90%] justify-end md:w-[75%] lg:h-full lg:w-2/5 xl:w-1/3">
            <ImageLayout
              images={[product.primary_image].concat(product.secondary_images)}
              onHeightChange={(height) => setImageHeight(height)}
            />
          </div>
          <div className="flex w-[90%] justify-center md:w-[75%] lg:h-full lg:w-2/5 lg:justify-start xl:w-1/3">
            <div
              className="w-full ring-1 ring-gray-500"
              style={{ height: imageHeight ? `${imageHeight}px` : undefined }}
            ></div>
          </div>
        </div>
      </div>
    );
};

export default ProductPage;
