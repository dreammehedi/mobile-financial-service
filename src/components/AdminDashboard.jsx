import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiDeviceMobileFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiNamemc } from "react-icons/si";
import { TbCurrencyTaka } from "react-icons/tb";
import HandleLogout from "./HandleLogout";

function AdminDashboard({ user, setUser }) {
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Admin Dashboard</title>
      </Helmet>

      {/* admin dashboard page */}
      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex items-center">
        <div className="container p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* User Info */}
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Admin Information
            </h2>

            {/* user desc */}
            <div className="space-y-2">
              <p className="flex justify-start items-center gap-2 flex-wrap break-words capitalize">
                <RiAdminFill className="text-xl"></RiAdminFill>{" "}
                <strong>You are:</strong> {user?.role}
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
            </div>

            {/* logout button */}
            <HandleLogout setUser={setUser}></HandleLogout>
          </div>

          {/* users data get */}
          <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              All Users: <span className="text-blue-500">3</span>
            </h2>

            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-xs text-left">
                {/* table head */}
                <thead className="w-full bg-blue-500  text-white">
                  <tr className="*:px-4 *:py-3 text-base">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody className="font-medium">
                  <tr className="*:px-4 *:py-2 *:break-words bg-blue-200">
                    <td>Mehedi Hassan</td>
                    <td>dreammehedihassan@gmail.com</td>
                    <td>01830143234</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <TbCurrencyTaka></TbCurrencyTaka>500
                      </div>
                    </td>
                    <td className="text-green-500">Activate</td>
                    <td>
                      {/* active button */}
                      <button className="text-xs my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Active
                      </button>

                      {/* block button */}
                      <button className="text-xs my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Block
                      </button>
                    </td>
                  </tr>

                  <tr className="*:px-4 *:py-2 *:break-words bg-blue-100">
                    <td>Mehedi Hassan</td>
                    <td>dreammehedihassan@gmail.com</td>
                    <td>01830143234</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <TbCurrencyTaka></TbCurrencyTaka>500
                      </div>
                    </td>
                    <td className="text-green-500">Activate</td>
                    <td>
                      {/* active button */}
                      <button className="text-xs my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Active
                      </button>

                      {/* block button */}
                      <button className="text-xs my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Block
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* <p className="text-sm font-medium font-inter text-red-500">
              {" "}
              No Users Found!
            </p> */}
          </div>
        </div>
      </section>
    </>
  );
}

AdminDashboard.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
export default AdminDashboard;
