import { UserCheck, LayoutDashboard, LogOut, UserPen } from "lucide-react";
import { User as UserType, useUser } from "../../contexts/UserContext";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

interface Props {
  user: UserType;
}

const LoggedInMenu: React.FC<Props> = ({ user }) => {
  const { setUser, setUserLong } = useUser();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleLogOut = () => {
    setOpenMenu(false);
    setUser(null);
    setUserLong(null);
    Cookies.remove("authToken");
  };

  return (
    <div
      className={`relative mr-4 flex w-fit min-w-28 flex-row items-center ${openMenu ? "cursor-default rounded-t-2xl bg-warm-nude-500" : "rounded-full"} bg-warm-nude-400 px-3 py-2 drop-shadow-lg transition-colors duration-500 ease-in-out hover:bg-warm-nude-500`}
      onMouseEnter={() => setOpenMenu(!openMenu)}
      onMouseLeave={() => setOpenMenu(!openMenu)}
    >
      <UserCheck className="mr-1 h-6 w-6" />
      <span className="mt-[1px] flex-1 text-center font-nunito-regular text-xl">
        {user.surname}
      </span>
      {openMenu && (
        <>
          <div className="absolute left-0 top-full h-[1px] w-full bg-black" />
          <div
            className={`absolute right-0 top-[calc(100%+1px)] h-fit w-full rounded-b-xl bg-inherit`}
          >
            <Link
              className="flex w-full flex-row items-center justify-start px-2 py-1"
              to="/utilizatori/eu"
            >
              <UserPen className="mr-1 size-6" />
              Profil
            </Link>
            {user.role === "admin" && (
              <Link
                className="flex w-full flex-row items-center justify-start px-2 py-1"
                to="/centru-admin"
              >
                <div className="mr-1 flex h-6 w-6 items-center justify-center">
                  <LayoutDashboard size={24} />
                </div>
                Panou
              </Link>
            )}
            <button
              className="flex w-full flex-row items-center justify-start px-2 pb-2 pt-1 text-red-500"
              onClick={() => {
                handleLogOut();
              }}
            >
              <LogOut className="mr-1 size-6" />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoggedInMenu;
