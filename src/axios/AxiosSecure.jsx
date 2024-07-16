import axios from "axios";

const AxiosSecure = axios.create({
  baseURL: "https://flexiwalled-server.vercel.app",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

AxiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosSecure;
