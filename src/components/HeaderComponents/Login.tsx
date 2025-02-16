import { User, X } from "lucide-react";
import { useOverlay } from "../../contexts/OverlayContext";
import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ForgottenPasswordForm from "./ForgottenPasswordForm";
import Spinner from "../Utility/Spinner";

const Login = () => {
  const { showOverlay, hideOverlay, isOverlayVisible } = useOverlay();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [menuOption, setMenuOption] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forgottenPassword, setForgottenPassword] = useState<boolean>(false);

  useEffect(() => {
    if (loginOpen && !isOverlayVisible) {
      setLoginOpen(false);
    }
  }, [isOverlayVisible]);

  return (
    <>
      <button
        className="icon"
        aria-label="user login"
        aria-checked="false"
        role="button"
        onClick={() => {
          showOverlay();
          setLoginOpen(true);
        }}
      >
        <User className="size-6" />
      </button>
      <div
        className={`fixed left-1/2 top-1/2 z-priority h-full w-full border border-gray-500/75 bg-white/70 backdrop-blur-sm md:h-fit md:min-h-[624px] ${loginOpen ? "opacity-100" : "pointer-events-none opacity-0"} flex -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-hidden transition-all duration-500 ease-in-out md:w-3/5 lg:w-2/5 lg:rounded-lg xl:w-1/3 2xl:w-1/5`}
      >
        <span className="my-6 font-ethereal-bold text-5xl">Autentificare</span>
        <div className="relative mb-6 flex w-4/5 flex-row justify-around">
          <button
            className={`w-[45%] ${menuOption ? "ring-2 ring-black" : ""} rounded-xl bg-gradient-to-r from-slate-300 to-rose-200 p-2 text-xl`}
            onClick={() => {
              if (!menuOption) setMenuOption(true);
            }}
          >
            Logare
          </button>
          <button
            className={`w-[45%] rounded-xl bg-gradient-to-l from-slate-300 to-rose-200 p-2 text-xl ${!menuOption ? "ring-2 ring-black" : ""}`}
            onClick={() => {
              if (menuOption) setMenuOption(false);
            }}
          >
            Inregistrare
          </button>
        </div>
        <div className="h-[3px] w-full bg-gradient-to-r from-rosy-nude-300 via-rosy-nude-500 to-rosy-nude-300" />
        {menuOption ? (
          forgottenPassword ? (
            <ForgottenPasswordForm
              setForgottenPassword={setForgottenPassword}
              setIsLoading={setIsLoading}
            />
          ) : (
            <LoginForm
              setForgottenPassword={setForgottenPassword}
              setIsLoading={setIsLoading}
            />
          )
        ) : (
          <RegisterForm setIsLoading={setIsLoading} />
        )}
        <X
          className="absolute right-0 top-0 m-1 size-12 cursor-pointer md:size-8"
          onClick={() => {
            hideOverlay();
          }}
        />
        {isLoading && (
          <div
            className={`absolute flex h-full w-full items-center justify-center backdrop-blur-[2px] transition-opacity duration-100 ease-in-out ${isLoading && loginOpen ? "opacity-100" : "opacity-0"}`}
          >
            <Spinner size={32} />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
