import React from "react";
import { ReviewData } from "./ProductGrid";
import { SquareUserRound } from "lucide-react";
import Rating from "./Rating";

interface Props {
  toggled: boolean;
  reviews: ReviewData[];
}

const Reviews: React.FC<Props> = ({ toggled, reviews }) => {
  const translateDate = (dateString: Date) => {
    const simplifiedDate = dateString.toString().split(".")[0];
    return new Date(simplifiedDate);
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out`}
      style={{
        height: toggled ? `${reviews.length * 104}px` : "0px",
      }}
    >
      {reviews.map((review, index) => (
        <div
          key={index}
          className={`mt-2 flex h-24 flex-row items-center rounded-sm bg-gray-100`}
        >
          <div className="border-r-2 border-black px-4">
            <SquareUserRound size={56} />
            <Rating rating={review.stars} size={11} />
          </div>
          <div className="flex flex-col p-4">
            <span>
              {review.surname} {review.name}
            </span>
            <span>{translateDate(review.created_at).toLocaleDateString()}</span>
          </div>
          <div className="w-full p-4">
            <span className="font-nunito-light">{review.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
