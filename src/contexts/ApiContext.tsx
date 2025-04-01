import { createContext, ReactNode, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import apiClient, { cookieUrl } from "../services/apiClient";
import { AxiosInstance } from "axios";
import { setGuestToken } from "../services/setGuestToken";

interface ApiContextType {
  apiClient: AxiosInstance;
  handleLogOut: () => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
  baseURL?: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { setUser } = useUser();
  const { setCartItems } = useCart();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currency_preference");
    sessionStorage.removeItem("user");
    setUser(null);
    setCartItems([]);
    Cookies.remove("authToken", { domain: cookieUrl, path: "/" });
    Cookies.remove("guestSessionToken", {
      domain: cookieUrl,
      path: "/",
    });
    setGuestToken();
  };

  // Use useMemo to prevent recreating the interceptor on every render
  useMemo(() => {
    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response.data.detail === "Token de autentificare expirat"
        ) {
          handleLogOut();
        }
        return Promise.reject(error);
      },
    );
  }, [setUser, setCartItems]);

  return (
    <ApiContext.Provider value={{ apiClient, handleLogOut }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
