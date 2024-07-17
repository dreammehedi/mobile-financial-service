import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosSecure from "../axios/AxiosSecure";

function useUsersData() {
  // navigate
  const navigate = useNavigate();

  // location
  const { pathname } = useLocation();

  // get user
  const [user, setUser] = useState(null);

  // get token
  const token = localStorage.getItem("token");

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosSecure.get("/users");
        setUser(response.data);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          navigate("/login");
        } else {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchUser();
    }
  }, [pathname, navigate, token]);

  return { user, setUser };
}

export default useUsersData;
