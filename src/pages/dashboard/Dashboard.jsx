import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiDeviceMobileFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiNamemc } from "react-icons/si";
import { TbCoinTakaFilled } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import AxiosSecure from "./../../axios/AxiosSecure";
const Dashboard = () => {
  // navigate
  const navigate = useNavigate();

  // location
  const { pathname } = useLocation();

  // get user
  const [user, setUser] = useState(null);
  console.log(user);

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

    fetchUser();
  }, [pathname, navigate]);
  // handle logout fn
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // user not login then loading
  if (!user)
    return (
      <>
        <Loader></Loader>
      </>
    );

  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Dashboard</title>
      </Helmet>

      {/* dashboard main page */}
      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex items-center">
        <div className="container p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* User Info */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              User Information
            </h2>
            {/* user desc */}
            <div className="space-y-2">
              <p className="flex justify-start items-center gap-2 flex-wrap break-words capitalize">
                <RiAdminFill className="text-xl"></RiAdminFill>{" "}
                <strong>Your Are:</strong> {user?.role}
              </p>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <SiNamemc className="text-xl"></SiNamemc> <strong>Name:</strong>{" "}
                {user?.name}
              </p>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <MdMarkEmailUnread className="text-xl"></MdMarkEmailUnread>
                <strong>Email Address:</strong> {user?.email}
              </p>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <PiDeviceMobileFill className="text-xl"></PiDeviceMobileFill>{" "}
                <strong>Mobile Number:</strong> {user?.mobileNumber}
              </p>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <TbCoinTakaFilled className="text-xl"></TbCoinTakaFilled>{" "}
                <strong>Account Balance:</strong> {user?.balance}
              </p>
            </div>

            {/* logout button */}
            <button
              onClick={handleLogout}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Recent Transactions
            </h2>
            {/* Placeholder for transaction history */}
            <p>No recent transactions</p>
            <Link
              to="/"
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              View Transactions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
