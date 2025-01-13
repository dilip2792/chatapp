import  { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"; // Import Cookies

const useGetAllUsers = () => {
  const [allUsers, setAllUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      
      try {
        const token = Cookies.get("jwt"); // Retrieve token from cookies
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
};

export default useGetAllUsers;
