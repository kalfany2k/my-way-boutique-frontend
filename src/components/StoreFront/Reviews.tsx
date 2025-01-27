import React, { useEffect } from "react";
import { ReviewData } from "./ProductGrid";
import { MessageSquareDashed } from "lucide-react";
import Rating from "./Rating";

interface Props {
  toggled: boolean;
  reviews: ReviewData[];
}

const Reviews: React.FC<Props> = ({ toggled, reviews }) => {
  const [height, setHeight] = React.useState<number>(0);

  const translateDate = (dateString: Date) => {
    const simplifiedDate = dateString.toString().split(".")[0];
    return new Date(simplifiedDate);
  };

  useEffect(() => {
    setHeight(0);
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      const reviewHeight = document.getElementById("review-" + i)?.clientHeight;
      if (reviewHeight) sum += reviewHeight + 9;
    }
    setHeight(sum);
    console.log(sum);
  }, [reviews]);

  return (
    <div
      className={`overflow-hidden border-x-[1px] ${toggled && "border-b-[1px]"} border-gray-700 px-1 transition-all duration-300 ease-in-out`}
      style={{
        height: toggled ? `${height}px` : "0px",
      }}
    >
      {reviews.map((review, index) => (
        <div
          key={index}
          id={"review-" + index}
          className={`${index === 0 && "mt-3"} w-full flex-grow`}
        >
          {review.message ? (
            <div className="h-20"></div>
          ) : (
            <div className="mt-2 flex h-12 flex-row items-center pb-2 font-overlock-regular text-xl text-gray-800">
              <div className="ml-1 mr-2 flex flex-col items-center justify-center">
                <MessageSquareDashed size={24} />
                <span className="text-sm">
                  {translateDate(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="mb-2 mr-1 flex flex-col items-start justify-center">
                <div className="flex flex-row">
                  <span className="mr-1">{review.author_surname}</span>
                  <span className="mr-1">{review.author_name}</span>
                </div>
                <Rating rating={review.stars} size={16} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
