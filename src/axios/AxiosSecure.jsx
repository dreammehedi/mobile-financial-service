import axios from "axios";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://flexiwalled-server.vercel.app",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

export default AxiosSecure;
