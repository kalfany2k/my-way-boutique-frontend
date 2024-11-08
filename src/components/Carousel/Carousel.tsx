import placeholder from "../../assets/pictures/placeholder1x1.jpg";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./CarouselArrowButtons";
import "../../assets/styles/embla.css";

type PropType = {
  options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
    align: "center",
    containScroll: false,
  });

  const slides = [
    { image: placeholder, position: 1 },
    { image: placeholder, position: 2 },
    { image: placeholder, position: 3 },
    { image: placeholder, position: 4 },
    { image: placeholder, position: 5 },
  ];

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.position}>
              <img
                src={slide.image}
                className="embla__slide__img"
                alt={`Slide ${slide.position}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default Carousel;
