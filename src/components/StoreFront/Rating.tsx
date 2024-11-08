import { Star } from "lucide-react";

interface Props {
  rating?: number;
  size: number;
}

const Rating: React.FC<Props> = ({ rating, size }) => {
  if (rating)
    return (
      <div className="flex flex-row items-center">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className={`stroke-1 ${index < Math.round(rating) ? "fill-warm-nude-700" : ""}`}
            size={size}
          />
        ))}
      </div>
    );
};

export default Rating;
