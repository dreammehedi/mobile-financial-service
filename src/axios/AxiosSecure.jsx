import axios from "axios";

const AxiosSecure = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://flexiwalled-server.vercel.app/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

export default AxiosSecure;
