import axios from "axios";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { BASE_URL } from "../assets/url";
import Loader from "../component/Loader";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/refetch`, { withCredentials: true });
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setLoading(false);
      } else {
        console.log(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

 
  return (
    <>
    {
      loading ? <Loader />:
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
    }
    </>
  );
}
