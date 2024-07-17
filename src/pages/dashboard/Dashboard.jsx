import AdminDashboard from "../../components/AdminDashboard";
import AgentDashboard from "../../components/AgentDashboard";
import Loader from "../../components/Loader";
import UserDashboard from "../../components/UserDashboard";
import useUsersData from "../../hooks/useUsersData";
const Dashboard = () => {
  // user data
  const { user, setUser } = useUsersData();

  // user not login then loading
  if (!user)
    return (
      <>
        <Loader></Loader>
      </>
    );

  // admin dashboard
  if (user?.role === "admin") {
    return (
      <>
        <AdminDashboard user={user} setUser={setUser}></AdminDashboard>
      </>
    );
  }

  // user dashboard
  if (user?.role === "agent") {
    return (
      <>
        <AgentDashboard user={user} setUser={setUser}></AgentDashboard>
      </>
    );
  }
  // user dashboard
  if (user?.role === "user") {
    return (
      <>
        <UserDashboard user={user} setUser={setUser}></UserDashboard>
      </>
    );
  }
};

export default Dashboard;
