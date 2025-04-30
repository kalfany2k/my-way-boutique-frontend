import SearchBar from "./SearchBar";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
import Login from "./Login";
import Overlay from "../Utility/Overlay";
import ShoppingBag from "./ShoppingBag";
import { useUser } from "../../contexts/UserContext";
import LoggedInMenu from "./LoggedInMenu";
import CurrencyModifier from "./CurrencyModifier";
import { useEffect } from "react";
import { setGuestToken } from "../../services/setGuestToken";
import Categories from "../HomeComponents/Categories";

const Header = () => {
  const { user } = useUser();

  useEffect(() => {
    setGuestToken();
  }, []);

  return (
    <div className="sticky top-0 z-50 flex h-total-header touch-pan-up flex-col bg-white/40 backdrop-blur-[4px] transition-colors duration-200 ease-in-out hover:bg-white">
      <div className="flex h-header flex-row items-center justify-between border-b-[1px] border-black">
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
      </div>
      <Categories />
      <Overlay />
    </div>
  );
};

export default Header;
