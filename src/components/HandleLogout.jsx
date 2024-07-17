import { useNavigate } from "react-router-dom";

function HandleLogout() {
  // navigate
  const navigate = useNavigate();

  // handle logout fn
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* logout button */}
      <button
        onClick={handleLogout}
        className="my-transition mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Logout
      </button>
    </>
  );
}

export default HandleLogout;
