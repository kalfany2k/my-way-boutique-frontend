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
import { Minus, Plus } from "lucide-react";
import Reviews from "./Reviews";

const ProductPage = () => {
  const params = useParams<{ productID: string }>();
  const [product, setProduct] = useState<ProductData>();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reviewsToggled, toggleReviews] = useState<boolean>(false);
  const [descriptionToggled, toggleDescription] = useState<boolean>(false);
  const [shippingDetailsToggled, toggleShippingDetails] =
    useState<boolean>(false);
  const [additionalDetailsToggled, toggleAdditionalDetails] =
    useState<boolean>(false);
  useState<boolean>(false);
  const { formatPrice } = useCurrency();
  const initialURL = "/products/" + params.productID;

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Set loading at start of async operation
      try {
        if (params.productID) {
          // Fetch product
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
        }
      } finally {
        setIsLoading(false); // Set loading false after everything is done
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
      <div className="mt-8 grid h-fit min-h-page-height grid-cols-1 lg:grid-cols-2">
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
          <div className="rounded-md p-4 lg:w-3/5">
            <span className="whitespace-nowrap font-merriweather-light text-3xl text-gray-800">
              {product.name}
            </span>
            <div className="mt-3 flex flex-row justify-between">
              <span className="font-nunito-semibold text-2xl">
                {formatPrice(product.price)}
              </span>
              <div className="flex flex-row items-center font-nunito-medium">
                {product.rating && (
                  <>
                    <Rating rating={product.rating} size={20} />
                    <span className="ml-1 mt-[1px]">{product.rating}</span>
                  </>
                )}
              </div>
            </div>
            <ShoppingForm product={product} />
            {reviews.length > 0 && (
              <div className="h-fit w-full">
                <div className="flex h-12 w-full items-center justify-between border-b-2 border-black">
                  <span className="font-nunito-regular text-xl">
                    Afiseaza recenziile ({reviews.length})
                  </span>
                  <button
                    type="button"
                    aria-pressed="false"
                    onClick={() => toggleReviews(!reviewsToggled)}
                  >
                    {reviewsToggled ? <Minus /> : <Plus />}
                  </button>
                </div>
                <Reviews toggled={reviewsToggled} reviews={reviews} />
              </div>
            )}
            <div className="h-fit w-full">
              <div className="flex h-12 w-full items-center justify-between border-b-2 border-black">
                <span className="font-nunito-regular text-xl">
                  Afiseaza descrierea
                </span>
                <button
                  type="button"
                  aria-pressed="false"
                  onClick={() => toggleDescription(!descriptionToggled)}
                >
                  {descriptionToggled ? <Minus /> : <Plus />}
                </button>
              </div>
            </div>
            <div className="h-fit w-full">
              <div className="flex h-12 w-full items-center justify-between border-b-2 border-black">
                <span className="font-nunito-regular text-xl">
                  Livrare si retur
                </span>
                <button
                  type="button"
                  aria-pressed="false"
                  onClick={() => toggleShippingDetails(!shippingDetailsToggled)}
                >
                  {shippingDetailsToggled ? <Minus /> : <Plus />}
                </button>
              </div>
            </div>
            <div className="h-fit w-full">
              <div className="flex h-12 w-full items-center justify-between border-b-2 border-black">
                <span className="font-nunito-regular text-xl">
                  Informatii aditionale
                </span>
                <button
                  type="button"
                  aria-pressed="false"
                  onClick={() =>
                    toggleAdditionalDetails(!additionalDetailsToggled)
                  }
                >
                  {additionalDetailsToggled ? <Minus /> : <Plus />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductPage;
