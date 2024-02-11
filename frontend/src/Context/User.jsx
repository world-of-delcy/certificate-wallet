import { createContext, useContext, useEffect, useState } from "react";
import { isLoggedIn } from "../Services/backend";
import Loading from "../Components/Common/Loading";
export const UserContext = createContext();

UserContext.displayName = "UserContext";

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await isLoggedIn();
      setLoading(false);
      if (!response || response instanceof Error || !response.isLoggedIn)
        return;
      setUser(response.user);
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
      {loading && <Loading />}
    </UserContext.Provider>
  );
}
