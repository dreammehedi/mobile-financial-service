import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { TbCurrencyTaka } from "react-icons/tb";
import AxiosSecure from "../../../axios/AxiosSecure";
import Loader from "../../../components/Loader";

function UserTransactionHistory() {
  // get all transactions history
  const { data: allTransaction = [], isPending } = useQuery({
    queryKey: ["allTransactionHistory"],
    queryFn: async () => {
      try {
        const response = await AxiosSecure.get("/all-transactions-history");
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

  // data is pending then loader showing
  if (isPending) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  }
  return (
    <>
      {/* dynamic page title */}
      <Helmet>
        <title>FlexiWalled - User Dashboard - Transaction History</title>
      </Helmet>

      {/* transaction history page */}
      <section className=" bg-gray-200 p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-500">
          Transaction History Information
        </h2>

        {allTransaction?.length > 0 ? (
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full text-xs text-left">
              {/* table head */}
              <thead className="w-full bg-blue-500  text-white">
                <tr className="*:px-4 *:py-3 text-base">
                  <th>Sender Number</th>
                  <th>Reciver Number</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Transaction Id</th>
                  <th>Type</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody className="font-medium">
                {allTransaction?.map((transaction, ind) => {
                  return (
                    <tr
                      key={ind}
                      className={`${
                        ind % 2 === 0 ? "bg-blue-200" : "bg-blue-100"
                      } *:px-4 *:py-2 *:break-words `}
                    >
                      <td>{transaction?.senderId}</td>
                      <td>{transaction?.recipiend}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <TbCurrencyTaka></TbCurrencyTaka>
                          {transaction?.amount}
                        </div>
                      </td>
                      <td>{formatDate(transaction?.date)}</td>
                      <td>{transaction?.transactionId}</td>
                      <td>{transaction?.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm font-medium font-inter text-red-500">
            No Transaction Found!
          </p>
        )}
      </section>
    </>
  );
}

export default UserTransactionHistory;
