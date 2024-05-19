import { act, createContext, useContext, useReducer, useState } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: Boolean(localStorage.getItem("access_token")),
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    default:
      throw new Error("Unknown action type.");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function updateUser(user) {
    dispatch({ type: "setUser", payload: user });
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Auth context was used outside the AuthProvider.");
  }
  return context;
}

export { AuthProvider, useAuth };
