import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    setSearchResults([]);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (user) return;
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // console.log(user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        updateUser,
        clearUser,
        openAuthForm,
        searchResults,
        setOpenAuthForm,
        openEditProfile,
        setOpenEditProfile,
        openDeleteAccount,
        setOpenDeleteAccount,
        openChangePassword,
        setOpenChangePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
