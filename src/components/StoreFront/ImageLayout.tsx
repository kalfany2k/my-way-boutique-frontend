import { useState } from "react";

interface Props {
  images: string[];
}

const ImageLayout: React.FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  return (
    <div className="flex h-fit w-full flex-col items-center lg:items-end">
      <div className="relative aspect-square w-4/5 bg-black lg:w-2/3">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={images[currentImageIndex]}
          loading="lazy"
        />
      </div>
      <div
        className={`mt-4 grid w-11/12 lg:w-2/3 ${images.length > 4 ? "grid-cols-" + images.length : "grid-cols-4"} gap-4`}
      >
        {images.map((_, index) => (
          <div
            key={index}
            className={`${currentImageIndex === index && ""} relative aspect-square w-full cursor-pointer bg-black`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={images[index]}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageLayout;
