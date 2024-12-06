import { Star } from "lucide-react";

interface Props {
  rating: number;
  size: number;
}

const Rating: React.FC<Props> = ({ rating, size }) => {
  return (
    <div className="flex flex-row items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const difference = rating - index;
        const fillPercentage =
          difference > 0 ? (difference === 1 ? 100 : difference * 100) : 0;
        return (
          <div key={index} className="relative">
            {/* Base star (unfilled) */}
            <Star className="stroke-1" size={size} />

            {/* Filled star with clip path */}
            <div
              className="absolute left-0 top-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="fill-warm-nude-700 stroke-1" size={size} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
