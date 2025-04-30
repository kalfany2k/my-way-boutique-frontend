import { Clock, Phone } from "lucide-react";

const Banner = () => {
  return (
    <div className="relative flex min-h-10 items-center justify-center border-b-[1px] border-black bg-rosy-nude-200 font-overlock-bold text-gray-800">
      <span className="hidden text-xl lg:block">
        Cumpara acum si beneficiaza de{" "}
        <span className="font-overlock-bolditalic underline">
          transport gratuit
        </span>{" "}
        la orice comanda de peste 300 RON,{" "}
        <span className="font-overlock-bolditalic underline">
          oriunde in lume
        </span>
        !
      </span>
      <span className="text-md block font-overlock-bold lg:hidden">
        Transport gratuit la orice comanda de peste 300 RON!
      </span>
      <div className="absolute right-2 hidden flex-row 2xl:flex">
        <Phone className="mr-1 size-6" />
        <span className="mr-4">+40 741 985 451</span>
        <Clock className="mr-1 size-6" />
        <span>L-V: 9:00-16:00</span>
      </div>
    </div>
  );
};

export default Banner;
