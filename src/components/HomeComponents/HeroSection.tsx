import { Search, ScissorsLineDashed } from "lucide-react";
import Carousel from "../Carousel/Carousel";
import DashedLine from "../Utility/DashedLine";
import Map from "../../assets/pictures/Map.svg";
import placeholder from "../../assets/pictures/placeholder1x1.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <Carousel />
      <DashedLine />
      {/* Produse pentru fetite */}
      <div className="hero-item flex h-[652px] flex-col rounded-lg bg-rosy-nude-200 shadow-lg lg:h-page-height lg:flex-row">
        <div
          className="min-h-[50%] flex-1 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: "url(" + placeholder + ")" }}
        ></div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="w-3/4 text-center font-overlock-regular text-3xl lg:w-[50%] lg:font-overlock-regular lg:text-6xl">
            Obiecte personalizate pentru fetite
          </h1>
          <Link to="/produse?gender=fetite">
            <button className="mb-5 mt-4 flex flex-row items-center rounded-3xl bg-rosy-nude-300 p-3 text-black shadow-lg lg:mb-7 lg:mt-6 lg:p-4">
              <Search className="mr-2 size-6 lg:size-8" />
              <p className="font-nunito-medium text-xl lg:text-2xl">
                Arata produse
              </p>
            </button>
          </Link>
          <div className="flex w-3/4 flex-row rounded-xl text-center text-lg leading-tight lg:w-[50%] xl:w-[30%]">
            <div className="flex flex-1 flex-col items-center border-r-2 border-dashed border-black p-2">
              <img src={Map} width={38} className="mb-1" />
              <p className="font-nunito-medium">Facut in Romania</p>
            </div>
            <div className="flex flex-1 flex-col items-center p-2">
              <ScissorsLineDashed size={32} />
              <p className="font-nunito-medium">Confectionat de mana</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
