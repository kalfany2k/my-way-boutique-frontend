import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import authService from "../services/authService";
import { useCart } from "./CartContext";

export interface User {
  id: number;
  email: string;
  surname: string;
  name: string;
  role: string;
  gender: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  setUserLong: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from session storage on initial render
    const storedUser =
      sessionStorage.getItem("user") || localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      authService.storeUser(newUser, false);
    } else {
      authService.clearAuth();
    }
  };

  const updateUserLong = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      authService.storeUser(newUser, true);
    } else {
      authService.clearAuth();
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser: updateUser, setUserLong: updateUserLong }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
