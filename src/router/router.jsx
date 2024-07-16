import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/error/Error";
import ProtectRoute from "../protect_route/ProtectRoute";
import Dashboard from "./../pages/dashboard/Dashboard";
import Login from "./../pages/login/Login";
import Register from "./../pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Dashboard></Dashboard>
      </ProtectRoute>
    ),
    errorElement: <Error></Error>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
export default router;
