import Cookies from "js-cookie";
import { User } from "../contexts/UserContext";

const authService = {
  getStoredUser(): User | null {
    const sessionUser = sessionStorage.getItem("user");
    const localUser = localStorage.getItem("user");
    return sessionUser
      ? JSON.parse(sessionUser)
      : localUser
        ? JSON.parse(localUser)
        : null;
  },

  clearAuth() {
    Cookies.remove("authToken");
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
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
