import { createBrowserRouter } from "react-router-dom";
import UserCashIn from "../pages/dashboard/user/UserCashIn";
import UserCashOut from "../pages/dashboard/user/UserCashOut";
import UserSendMoney from "../pages/dashboard/user/UserSendMoney";
import UserTransactionHistory from "../pages/dashboard/user/UserTransactionHistory";
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
    children: [
      {
        path: "dashboard/send-money",
        element: <UserSendMoney></UserSendMoney>,
      },
      {
        path: "dashboard/cash-out",
        element: <UserCashOut></UserCashOut>,
      },
      {
        path: "dashboard/cash-in",
        element: <UserCashIn></UserCashIn>,
      },
      {
        path: "dashboard/transaction-history",
        element: <UserTransactionHistory></UserTransactionHistory>,
      },
    ],
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
