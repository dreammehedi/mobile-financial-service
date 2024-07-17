import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiDeviceMobileFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiNamemc } from "react-icons/si";
import { TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import AxiosSecure from "./../axios/AxiosSecure";
import HandleLogout from "./HandleLogout";
import Loader from "./Loader";

function AdminDashboard({ user, setUser }) {
  // user search state
  const [userSearchValue, setUserSearchValue] = useState("");

  // get all users
  const {
    data: allUsers = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", userSearchValue],
    queryFn: async () => {
      try {
        const response = await AxiosSecure.get(
          `/all-users/?userFind=${userSearchValue}`
        );
        const resData = await response.data;
        return resData;
      } catch (err) {
        console.error(err);
      }
    },
  });

  // hanlde active account
  const handleActiveAccount = async (userEmail) => {
    try {
      const response = await AxiosSecure.patch(`/user-active/${userEmail}`);
      const resData = await response.data;
      if (resData?.modifiedCount > 0) {
        Swal.fire({
          title: "Account Status Changed",
          text: "User's account status has been updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        timer: 700,
      });
    }
  };

  // hanlde block account
  const handleBlockAccount = async (userEmail) => {
    try {
      const response = await AxiosSecure.patch(`/user-block/${userEmail}`);
      const resData = await response.data;
      if (resData?.modifiedCount > 0) {
        Swal.fire({
          title: "Account Status Changed",
          text: "User's account status has been updated successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        timer: 700,
      });
    }
  };

  // user search
  const handleUserSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchData = form.userIdentification.value;
    setUserSearchValue(searchData);
  };
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Admin Dashboard</title>
      </Helmet>

      {/* admin dashboard page */}
      <section className="py-10 md:py-12 lg:py-16 bg-gray-100 w-full min-h-screen flex items-center">
        <div className="container p-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
          {/* User Info */}
          <div className="max-w-xl mx-auto bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* title */}
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-500">
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

          {/* is pending user data */}
          {isPending && (
            <>
              <Loader></Loader>
            </>
          )}
          {/* users data get */}
          <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <div className="pb-3 flex flex-col lg:flex-row justify-between items-center">
              {/* title */}
              <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                All Users:{" "}
                <span className="bg-blue-500 text-white p-4 text-base rounded-full size-5 flex justify-center items-center">
                  {allUsers?.length}
                </span>
              </h2>

              {/* user search form */}
              <form
                onSubmit={handleUserSearch}
                className="w-full lg:w-1/2 space-y-2"
              >
                <span className="font-medium font-inter text-sm ">
                  Search Mobile Number / Email Address...
                </span>
                <input
                  name="userIdentification"
                  className="w-full px-4 py-2 outline-none rounded-md bg-white ring-1 ring-gray-100 placeholder:text-sm font-inter"
                  type="text"
                  placeholder="Mobile Number / Email Address..."
                />
              </form>
            </div>

            {allUsers?.length > 0 ? (
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
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  {/* table body */}
                  <tbody className="font-medium">
                    {allUsers?.map((user, ind) => {
                      return (
                        <tr
                          key={ind}
                          className={`${
                            ind / 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                          } *:px-4 *:py-2 *:break-words `}
                        >
                          <td>
                            <div className="flex items-center gap-2">
                              <span
                                className={`${
                                  user?.status === "active"
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                }  text-white p-3 text-sm rounded-full size-3 flex justify-center items-center`}
                              >
                                {ind + 1}
                              </span>
                              {user?.name}
                            </div>
                          </td>
                          <td>{user?.email}</td>
                          <td> {user?.mobileNumber}</td>
                          <td>
                            {user?.balance >= 0 && (
                              <div className="flex items-center gap-1">
                                <TbCurrencyTaka></TbCurrencyTaka>
                                {user?.balance}
                              </div>
                            )}
                          </td>
                          <td>
                            <span
                              className={`${
                                user?.status === "active"
                                  ? "bg-green-500"
                                  : "bg-orange-500"
                              } text-white rounded-md px-3 py-1`}
                            >
                              {user?.status}
                            </span>
                          </td>
                          <td>
                            <span className="bg-blue-500 text-white rounded-md px-3 py-1">
                              {user?.role}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              {/* Check if user is not an admin and has a status */}
                              {user?.role !== "admin" &&
                                user?.status &&
                                // Render either Block or Active button based on user status
                                (user.status === "active" ? (
                                  // Active button
                                  <button
                                    onClick={() => {
                                      handleBlockAccount(user?.email);
                                    }}
                                    className="text-xs my-transition bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                                  >
                                    Block
                                  </button>
                                ) : (
                                  // Block button
                                  <button
                                    onClick={() => {
                                      handleActiveAccount(user?.email);
                                    }}
                                    className="text-xs my-transition bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                  >
                                    Active
                                  </button>
                                ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm font-medium font-inter text-red-500">
                {" "}
                No Users Found!
              </p>
            )}
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
