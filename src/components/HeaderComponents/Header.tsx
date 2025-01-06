import SearchBar from "./SearchBar";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import Login from "./Login";
import Overlay from "../Utility/Overlay";
import ShoppingBag from "./ShoppingBag";
import { useUser } from "../../contexts/UserContext";
import LoggedInMenu from "./LoggedInMenu";
import { Clock, Phone } from "lucide-react";
import CurrencyModifier from "./CurrencyModifier";
import { useEffect } from "react";
import { setGuestToken } from "../../services/setGuestToken";

const Header = () => {
  const { user } = useUser();

  useEffect(() => {
    setGuestToken();
  }, []);

  return (
    <div className="fixed inset-0 z-header flex h-total-header touch-pan-up flex-col">
      <div className="z-10 flex h-10 items-center justify-center border-b-[1px] border-black bg-rosy-nude-200 font-overlock-bold text-gray-800">
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
      <div className="flex h-header flex-row items-center justify-between border-b-[1px] border-black bg-white">
        <div className="z-sidebar flex-1 lg:hidden">
          <TopBar />
        </div>
        <div className="mx-4">
          <CurrencyModifier />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:ml-3 lg:-translate-x-0 xl:left-1/2 xl:ml-0 xl:-translate-x-1/2">
          <Link to="/" className="w-fit">
            <h1 className="mt-2 w-fit cursor-pointer font-ethereal-bold text-5xl lg:text-7xl">
              MWB
            </h1>
          </Link>
        </div>
        <nav className="flex flex-1 flex-row items-center justify-end">
          <div className="flex items-center">
            <SearchBar />
            <ShoppingBag />
            {user ? <LoggedInMenu user={user} /> : <Login />}
          </div>
        </nav>
        <Overlay />
      </div>
    </div>
  );
};

export default Header;
