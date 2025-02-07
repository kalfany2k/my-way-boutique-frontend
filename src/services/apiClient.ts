import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://api.mwb.local",
  withCredentials: true,
});

export const cookieUrl = ".mwb.local";
export const backendUrl = "api.mwb.local";

export default apiClient;
