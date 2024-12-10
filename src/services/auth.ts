import { AxiosError } from "axios";
import apiClient from "./apiClient";
import Cookies from "js-cookie";

export interface ErrorResponse {
  detail: string;
}

export const throwError = (error: any) => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.detail || "Logare esuata");
    } else if (axiosError.request) {
      throw new Error("Logare esuata: Niciun raspuns de la server");
    } else {
      throw new Error(`Logare esuata: ${axiosError.message}`);
    }
  } else {
    throw new Error("O eroare neasteptata s-a petrecut");
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await apiClient.post(
      "/login",
      { username, password },
      // prettier-ignore
      { headers: { "Content-Type": "application/x-www-form-urlencoded", }, },
    );
    Cookies.set("authToken", response.data.access_token, { expires: 1 });
    return response.data;
  } catch (error) {
    throwError(error);
  }
};

export const register = async (
  email: string,
  surname: string,
  name: string,
  gender: "F" | "M",
  password: string,
) => {
  try {
    const response = await apiClient.post(
      "/users",
      // prettier-ignore
      { email, surname, name, gender, password, },
      // prettier-ignore
      { headers: { "Content-Type": "application/json", }, },
    );
    return response.data;
  } catch (error) {
    throwError(error);
  }
};
