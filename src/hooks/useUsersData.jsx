import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import AxiosSecure from "../axios/AxiosSecure";

function useUsersData() {
  const [userLoader, setUserLoader] = useState(true);

  // location
  const { pathname } = useLocation();

  // get token
  const token = localStorage.getItem("token");

  // fetch user
  const { data: user = null, refetch: currentUserRefetch } = useQuery({
    queryKey: ["currentUser", token, pathname],
    queryFn: async () => {
      setUserLoader(true);
      if (!token) {
        return null;
      }
      const response = await AxiosSecure.get("/users");
      setUserLoader(false);
      return response.data;
    },
    enabled: !!token,
  });

  return { userLoader, user, currentUserRefetch };
}

export default useUsersData;
