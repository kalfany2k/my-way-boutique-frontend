import {
  UserCheck,
  LayoutDashboard,
  LogOut,
  UserPen,
  ScrollText,
} from "lucide-react";
import { User as UserType } from "../../contexts/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../contexts/ApiContext";

interface Props {
  user: UserType;
}

const LoggedInMenu: React.FC<Props> = ({ user }) => {
  const { handleLogOut } = useApi();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const logOut = () => {
    setOpenMenu(false);
    handleLogOut();
  };

  return (
    <div
      className={`relative mr-4 hidden w-fit min-w-28 flex-row items-center md:flex ${openMenu ? "cursor-default rounded-t-xl bg-rosy-nude-300" : "rounded-full bg-rosy-nude-200"} px-3 py-2 drop-shadow-lg transition-colors duration-500 ease-in-out`}
      onMouseEnter={() => setOpenMenu(!openMenu)}
      onMouseLeave={() => setOpenMenu(!openMenu)}
    >
      <UserCheck className="mr-1 h-6 w-6" />
      <span className="ml-[1px] mt-[2px] flex-1 text-center font-nunito-regular text-xl">
        {user.surname}
      </span>
      <div className={`${openMenu ? "" : "invisible"} bg-inherit`}>
        <div className="absolute left-0 top-full h-[1px] w-full bg-black" />
        <div
          className={`absolute right-0 top-[calc(100%+1px)] h-fit w-full rounded-b-xl bg-inherit transition-colors duration-500 ease-in-out`}
        >
          <Link
            className="flex w-full flex-row items-center justify-start px-2 py-1"
            to="/utilizatori/eu"
          >
            <UserPen className="mr-1 size-6" />
            Profil
          </Link>
          {user.role === "admin" && (
            <>
              <Link
                className="flex w-full flex-row items-center justify-start px-2 py-1"
                to="/centru-admin"
              >
                <div className="mr-1 flex h-6 w-6 items-center justify-center">
                  <LayoutDashboard size={24} />
                </div>
                Panou
              </Link>
              <Link
                className="flex w-full flex-row items-center justify-start px-2 py-1"
                to="/comenzi"
              >
                <div className="mr-1 flex h-6 w-6 items-center justify-center">
                  <ScrollText size={24} />
                </div>
                Comenzi
              </Link>
            </>
          )}
          <button
            className="flex w-full flex-row items-center justify-start px-2 pb-2 pt-1 text-red-500"
            onClick={() => {
              logOut();
            }}
          >
            <LogOut className="mr-1 size-6" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoggedInMenu;
