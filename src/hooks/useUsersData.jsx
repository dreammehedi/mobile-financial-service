import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import AxiosSecure from "../axios/AxiosSecure";

function useUsersData() {
  // location
  const { pathname } = useLocation();

  // get token
  const token = localStorage.getItem("token");

  // fetch user
  const { data: user = null, refetch: currentUserRefetch } = useQuery({
    queryKey: ["currentUser", token, pathname],
    queryFn: async () => {
      const response = await AxiosSecure.get("/users");
      const resData = await response.data;
      return resData;
    },
  });

  return { user, currentUserRefetch };
}

export default useUsersData;
