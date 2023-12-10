import { useEffect, useState } from "react";
import axios from "axios";

const useUser = () => {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const response = await axios.get("http://localhost:3000/api/user/userr", {
                withCredentials: true,
              });
              setUserData(response.data);
            } catch (error) {
              console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
          };
      
          fetchUserData();
    }, []);

    return {
        userData,
        loading
    }
};

export default useUser;