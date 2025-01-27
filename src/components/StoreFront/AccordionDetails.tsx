import { useState } from "react";
import { ReviewData } from "./ProductGrid";
import { Minus, Plus } from "lucide-react";
import Reviews from "./Reviews";

interface Props {
  reviews: ReviewData[];
}

const AccordionDetails: React.FC<Props> = ({ reviews }) => {
  const [reviewsToggled, toggleReviews] = useState<boolean>(false);
  const [descriptionToggled, toggleDescription] = useState<boolean>(false);
  const [shippingDetailsToggled, toggleShippingDetails] =
    useState<boolean>(false);
  const [additionalDetailsToggled, toggleAdditionalDetails] =
    useState<boolean>(false);
  return (
    <>
      {reviews.length > 0 && (
        <div className="h-fit w-full">
          <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-gray-700">
            <span className="font-helvetica-light text-xl text-gray-600">
              Afiseaza recenziile ({reviews.length})
            </span>
            <button
              type="button"
              aria-pressed="false"
              onClick={() => toggleReviews(!reviewsToggled)}
              className="accordion-btn"
            >
              {reviewsToggled ? <Minus /> : <Plus />}
            </button>
          </div>
          <Reviews toggled={reviewsToggled} reviews={reviews} />
        </div>
      )}

      <div className="h-fit w-full">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-gray-700">
          <span className="font-helvetica-light text-xl text-gray-600">
            Afiseaza descrierea
          </span>
          <button
            type="button"
            aria-pressed="false"
            onClick={() => toggleDescription(!descriptionToggled)}
            className="accordion-btn"
          >
            {descriptionToggled ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>

      <div className="h-fit w-full">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-gray-700">
          <span className="font-helvetica-light text-xl text-gray-600">
            Livrare si retur
          </span>
          <button
            type="button"
            aria-pressed="false"
            onClick={() => toggleShippingDetails(!shippingDetailsToggled)}
            className="accordion-btn"
          >
            {shippingDetailsToggled ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>

      <div className="h-fit w-full">
        <div className="flex h-12 w-full items-center justify-between border-b-[1px] border-gray-700">
          <span className="font-helvetica-light text-xl text-gray-600">
            Informatii aditionale
          </span>
          <button
            type="button"
            aria-pressed="false"
            onClick={() => toggleAdditionalDetails(!additionalDetailsToggled)}
            className="accordion-btn"
          >
            {additionalDetailsToggled ? <Minus /> : <Plus />}
          </button>
        </div>
      </div>
    </>
  );
};

export default AccordionDetails;
