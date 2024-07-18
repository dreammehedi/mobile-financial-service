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
      if (!token) {
        return null;
      }
      const response = await AxiosSecure.get("/users");
      return response.data;
    },
    enabled: !!token,
  });

  return { user, currentUserRefetch };
}

export default useUsersData;
