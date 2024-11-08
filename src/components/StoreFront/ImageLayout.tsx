import { useEffect, useState } from "react";

interface Props {
  images: string[];
}

const ImageLayout: React.FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [columns, setColumns] = useState<number>(4);
  useEffect(() => {
    images.length > 4 ? setColumns(images.length) : setColumns(4);
  });

  return (
    <div className="flex h-fit w-full flex-col items-center lg:items-end">
      <div className="aspect-square w-4/5 bg-black lg:w-2/3"></div>
      <div className={`mt-4 grid w-11/12 lg:w-2/3 grid-cols-${columns} gap-4`}>
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
