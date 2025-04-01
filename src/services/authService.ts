import Cookies from "js-cookie";
import { User } from "../contexts/UserContext";

const authService = {
  // utility functions that are to be used in the scope of UserContext

  getStoredUser(): User | null {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");
    return sessionUser
      ? JSON.parse(sessionUser)
      : localUser
        ? JSON.parse(localUser)
        : null;
  },

  storeUser(user: User, longTerm: boolean) {
    if (longTerm) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  },

  isAuthenticated(): boolean {
    return !!Cookies.get("authToken");
  },

  getAuthToken(): string | null {
    return Cookies.get("authToken") || null;
  },
};

export default authService;
