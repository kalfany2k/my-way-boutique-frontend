import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.mwb.local",
  withCredentials: true,
});

export default apiClient;
