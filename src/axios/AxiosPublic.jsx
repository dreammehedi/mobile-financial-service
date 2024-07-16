import axios from "axios";

const AxiosPublic = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://flexiwalled-server.vercel.app/api",
});
export default AxiosPublic;
