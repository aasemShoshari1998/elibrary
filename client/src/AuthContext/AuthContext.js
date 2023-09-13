import React from "react";
import { useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
};

const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
