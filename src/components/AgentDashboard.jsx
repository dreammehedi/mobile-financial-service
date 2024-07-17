import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { MdMarkEmailUnread } from "react-icons/md";
import { PiDeviceMobileFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { SiNamemc } from "react-icons/si";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import Swal from "sweetalert2";
import AxiosSecure from "./../axios/AxiosSecure";
import useUsersData from "./../hooks/useUsersData";
import HandleLogout from "./HandleLogout";
import Loader from "./Loader";

function AgentDashboard({ user }) {
  // current user refetch
  const { currentUserRefetch } = useUsersData();

  // get requist cash-in or cash-out
  const {
    data: transactionRequest = [],
    isPending,
    refetch: refetchRequest,
  } = useQuery({
    queryKey: ["cash-in", "cash-out"],
    queryFn: async () => {
      try {
        const response = await AxiosSecure.get(`/cash-in-or-out-request`);
        const resData = await response.data;
        return resData;
      } catch (err) {
        console.error(err);
      }
    },
  });

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });
  };

  // handle approve
  const handleApprove = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve!",
    }).then(async (result) => {
      if (result?.isConfirmed) {
        const response = await AxiosSecure.patch(
          "/cash-in-out-approve-agent",
          data
        );
        const resData = await response.data;
        if (resData?.success && resData?.message === "Cash-in approved.") {
          currentUserRefetch();
          refetchRequest();
          Swal.fire({
            title: "Cash In Request Approved",
            text: "Cash-in request has been approved successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        } else if (
          resData?.success &&
          resData?.message === "Cash-out approved."
        ) {
          currentUserRefetch();
          refetchRequest();
          Swal.fire({
            title: "Cash Out Request Approved",
            text: "Cash-out request has been approved successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error",
            showConfirmButton: false,
            timer: 700,
          });
        }
      }
    });
  };
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - Agent Dashboard</title>
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
              <div className="flex justify-start items-center gap-2 flex-wrap break-words">
                <TbCoinTakaFilled className="text-xl"></TbCoinTakaFilled>{" "}
                <strong>Account Balance:</strong>{" "}
                <div className="flex items-center gap-1">
                  <TbCurrencyTaka></TbCurrencyTaka> {user?.balance.toFixed(2)}
                </div>
              </div>
              <p className="flex justify-start items-center gap-2 flex-wrap break-words">
                <TbCoinTakaFilled className="text-xl"></TbCoinTakaFilled>{" "}
                <strong>Account Status:</strong> {user?.status}
              </p>
            </div>

            {/* logout button */}
            <HandleLogout></HandleLogout>
          </div>

          {isPending && (
            <>
              <Loader></Loader>
            </>
          )}
          <div className="lg:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
            {/* users data get */}
            {transactionRequest?.length > 0 ? (
              <>
                <div className="pb-3 flex flex-col lg:flex-row justify-between items-center">
                  {/* title */}
                  <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                    All Transaction:{" "}
                    <span className="bg-blue-500 text-white p-4 text-base rounded-full size-5 flex justify-center items-center">
                      {transactionRequest?.length}
                    </span>
                  </h2>
                </div>

                <div className="overflow-x-auto rounded-md">
                  <table className="min-w-full text-xs text-left">
                    {/* table head */}
                    <thead className="w-full bg-blue-500  text-white">
                      <tr className="*:px-4 *:py-3 text-base">
                        <th>Sender Number</th>
                        <th>Agent Number</th>
                        <th>Balance</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    {/* table body */}
                    <tbody className="font-medium">
                      {transactionRequest?.map((transaction, ind) => {
                        return (
                          <tr
                            key={ind}
                            className={`${
                              ind % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                            }  *:px-4 *:py-2 *:break-words `}
                          >
                            <td>{transaction?.senderNumber}</td>
                            <td>{transaction?.agentNumber}</td>
                            <td>
                              <div className="flex items-center gap-1">
                                <TbCurrencyTaka></TbCurrencyTaka>
                                {transaction?.amount}
                              </div>
                            </td>
                            <td>{formatDate(transaction?.date)}</td>
                            <td>{transaction?.type}</td>
                            <td>
                              {transaction?.status === "approved" ? (
                                "Already Approved"
                              ) : (
                                //  {/* Approve button */}
                                <button
                                  onClick={() => {
                                    handleApprove(transaction);
                                  }}
                                  className="text-xs my-transition bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                                >
                                  Approve
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="text-sm font-medium font-inter text-red-500">
                No Transaction Found!
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

AgentDashboard.propTypes = {
  user: PropTypes.object.isRequired,
};
export default AgentDashboard;
