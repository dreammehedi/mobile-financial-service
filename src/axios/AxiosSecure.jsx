import axios from "axios";

const AxiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default AxiosSecure;
