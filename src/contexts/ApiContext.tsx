import { createContext, ReactNode, useContext, useMemo } from "react";
import Cookies from "js-cookie";
import { useCart } from "./CartContext";
import { useUser } from "./UserContext";
import apiClient from "../services/apiClient";
import { AxiosInstance } from "axios";

interface ApiContextType {
  apiClient: AxiosInstance;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
  baseURL?: string;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { setUser } = useUser();
  const { setCartItems } = useCart();

  // Use useMemo to prevent recreating the interceptor on every render
  useMemo(() => {
    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response.data.detail === "Token de autentificare expirat"
        ) {
          setUser(null);
          setCartItems([]);
          Cookies.remove("authToken", { domain: ".mwb.local", path: "/" });
          Cookies.remove("guestSessionToken", {
            domain: ".mwb.local",
            path: "/",
          });
          localStorage.removeItem("user");
        }
        return Promise.reject(error);
      },
    );
  }, [setUser, setCartItems]);

  return (
    <ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
