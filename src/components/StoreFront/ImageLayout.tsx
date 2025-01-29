import { useEffect, useRef, useState } from "react";

interface Props {
  images: string[];
  onHeightChange?: (height: number) => void;
}

const ImageLayout: React.FC<Props> = ({ images, onHeightChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageHeight = () => {
      if (imageContainerRef.current) {
        const height = imageContainerRef.current.clientHeight;
        if (onHeightChange) onHeightChange(height); // Pass height to parent
      }
    };

    updateImageHeight();

    window.addEventListener("resize", updateImageHeight);

    return () => {
      window.removeEventListener("resize", updateImageHeight);
    };
  }, [onHeightChange]); // Re-run if onHeightChange changes

  return (
    <div className="flex h-fit w-full flex-col gap-2 md:gap-4 lg:w-11/12 lg:gap-2">
      <div
        className="aspect-square w-full overflow-hidden rounded-md ring-1 ring-gray-500"
        ref={imageContainerRef}
      >
        <img
          src={images[currentImageIndex]}
          className="h-full w-full bg-center object-cover"
          alt="Poza produs"
          draggable="false"
        />
      </div>
      {images.length > 1 && (
        <div className="grid w-full grid-cols-5 gap-2 md:gap-4 lg:gap-2">
          {images.map((image, index) => (
            <div
              className={`aspect-square w-full cursor-pointer overflow-hidden rounded-md ring-1 ring-gray-500 ${currentImageIndex === index && "ring-rose-300"}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={image}
                className="h-full w-full bg-center object-cover"
                alt="Poza produs"
                draggable="false"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageLayout;
