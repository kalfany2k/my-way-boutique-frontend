import apiClient from "./apiClient";
import Cookies from "js-cookie";

export const setGuestToken = async () => {
  if (!Cookies.get("guestSessionToken") && !Cookies.get("authToken")) {
    const response = await apiClient.get("/login_guest");
    Cookies.set("guestSessionToken", response.data.guest_token, {
      path: "/",
      SameSite: "Strict",
      secure: true,
      expires: 1,
      domain: "mwb.local",
    });
  }
};
