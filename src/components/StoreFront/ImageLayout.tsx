import { useEffect, useState } from "react";

interface Props {
  images: string[];
}

const ImageLayout: React.FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  return (
    <div className="flex h-fit w-full flex-col items-center lg:items-end">
      <div className="aspect-square w-4/5 bg-black lg:w-2/3"></div>
      <div
        className={`mt-4 grid w-11/12 lg:w-2/3 ${images.length > 4 ? "grid-cols-" + images.length : "grid-cols-4"} gap-4`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`${currentImageIndex === index ? "ring-2 ring-white" : ""} aspect-square w-full cursor-pointer bg-black`}
            onClick={() => setCurrentImageIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageLayout;
