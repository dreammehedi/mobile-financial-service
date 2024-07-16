import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
function ProtectRoute({ children }) {
  // get token
  const token = localStorage.getItem("token");

  // if token is present redirect to main page
  if (token) {
    return children;
  }

  // if token is not present redirect to login page
  return <Navigate to={"/login"}></Navigate>;
}
ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectRoute;
