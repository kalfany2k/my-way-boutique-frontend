import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = () => {
  const array = Array.from({ length: 16 }, (_, i) => i + 1);

  return (
    <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
      {array.map((card) => (
        <div key={card} className="flex flex-col items-center">
          <SkeletonCard />
          <div className="mt-2 h-3 w-3/5 animate-pulse rounded-full bg-gray-500" />
          <div className="mt-2 h-2 w-1/3 animate-pulse rounded-full bg-gray-500" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
