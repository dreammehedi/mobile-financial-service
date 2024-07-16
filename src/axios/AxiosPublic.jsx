import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://flexiwalled-server.vercel.app",
});
export default AxiosPublic;
