import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext,  useState } from "react";
import { axiosInstance } from "../util/axios";

export const AuthContext = createContext({
  token: "",
  userId: "",
  isAuthenticated: false,
  authenticate: () => {},
  login: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [userId, setUserId] = useState();


  const login = (id) => {
    setUserId(id);
    AsyncStorage.setItem("userId", id);
  };

  const authenticate = (token) => {
    setAuthToken(token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    AsyncStorage.setItem("token", token);
  }

  const logOut = () => {
    setAuthToken(null);
    delete axiosInstance.defaults.headers.common["Authorization"];
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
  };

  const value = {
    userId,
    token: authToken,
    isAuthenticated: !!authToken,
    login,
    logOut,
    authenticate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
