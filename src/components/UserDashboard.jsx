import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiDeviceMobileFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiNamemc } from "react-icons/si";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import HandleLogout from "./HandleLogout";

function UserDashboard({ user, setUser }) {
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - User Dashboard</title>
      </Helmet>

      {/* dashboard main page */}
      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex items-center">
        <div className="container p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* User Info */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-500">
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
                <strong>Account Balance:</strong>{" "}
                <div className="flex items-center gap-1">
                  <TbCurrencyTaka></TbCurrencyTaka> {user?.balance}
                </div>
              </p>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <TbCoinTakaFilled className="text-xl"></TbCoinTakaFilled>{" "}
                <strong>Account Status:</strong> {user?.status}
              </p>
            </div>

            {/* logout button */}
            <HandleLogout setUser={setUser}></HandleLogout>
          </div>

          <div className="lg:col-span-2 w-full h-fit flex flex-col justify-center bg-white p-4 md:p-6 rounded-lg shadow-lg relative">
            {/* image */}
            <img
              className="w-full h-auto md:max-h-[400px] object-cover rounded-md opacity-50"
              src="https://i.ibb.co/d4ZcFmm/0-Nbm5t-Vi-L-X3n-EELe.png"
              alt=""
            />
            {/* main ui */}
            <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 md:p-4 w-[80%] flex flex-wrap gap-4 md:gap-6 ">
              <li>
                <Link to="/dashboard/send-money">
                  <button className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Send Money
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/cash-out">
                  <button className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Cash Out
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/cash-in">
                  <button className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Cash In
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/balance-inquiry">
                  <button className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Balance Inquiry
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/transaction-history">
                  <button className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Transaction History
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

UserDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
export default UserDashboard;
