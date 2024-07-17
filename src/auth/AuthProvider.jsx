import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosSecure from "../axios/AxiosSecure";

// create auth context
export const AuthContext = createContext();

function AuthProvider({ children }) {
  // user
  const [user, setUser] = useState(null);

  //   navigate
  const navigate = useNavigate();

  //   pathname
  const { pathname } = useLocation();

  //   get user token
  const token = localStorage.getItem("token");

  // handle logout fn
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AxiosSecure.get("/users");
        setUser(response.data);
        console.log(response.data);
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

  // user information
  const userInformation = { user, setUser, handleLogout };

  return (
    <AuthContext.Provider value={userInformation}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
