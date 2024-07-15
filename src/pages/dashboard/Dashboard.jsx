import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* User Info */}
          <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <p>
              <strong>Name:</strong> mehedi
            </p>
            <p>
              <strong>Email:</strong> mehedi
            </p>
            <p>
              <strong>Mobile:</strong> mehedi
            </p>
            <p>
              <strong>Balance:</strong> mehedi Taka
            </p>
            <button
              // onClick={logout}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Logout
            </button>
          </div>

          {/* Transaction History */}
          <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
            {/* Placeholder for transaction history */}
            <p>No recent transactions</p>
            <Link
              to="/transactions"
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              View Transactions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
