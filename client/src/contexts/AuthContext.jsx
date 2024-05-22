import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuth: Boolean(localStorage.getItem("access_token")),
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "setIsAuth":
      return { ...state, isAuth: action.payload };
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

  function setIsAuth() {
    dispatch({
      type: "setIsAuth",
      payload: Boolean(localStorage.getItem("access_token")),
    });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, updateUser, setIsAuth }}>
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
