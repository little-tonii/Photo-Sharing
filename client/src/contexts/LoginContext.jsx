import axios from "axios";
import { createContext, useContext, useReducer, useState } from "react";
import { API } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const initialState = {
  email: "",
  password: "",
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updatePassword":
      return { ...state, password: action.payload };
    case "updateError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type.");
  }
};

const LoginContext = createContext();

function LoginProvider({ children }) {
  const [{ email, password, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { updateUser } = useAuth();

  const navigate = useNavigate();

  function updateEmail(value) {
    dispatch({ type: "updateEmail", payload: value });
  }

  function updatePassword(value) {
    dispatch({ type: "updatePassword", payload: value });
  }

  function register() {
    navigate("/register");
  }

  async function login() {
    try {
      const res = await axios.post(
        API.LOGIN,
        { email, password },
        { withCredentials: true }
      );

      const data = await res.data;

      if (data.user) {
        localStorage.setItem("access_token", data.access_token);
        updateUser(data.user);
        navigate("/app");
      } else {
        console.log(data);
      }
    } catch (err) {
      dispatch({
        type: "updateError",
        payload: "Email or password is incorrect",
      });
      console.log(err);
    }
  }

  return (
    <LoginContext.Provider
      value={{
        email,
        password,
        error,
        login,
        updateEmail,
        updatePassword,
        register,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("Login context was used outside the LoginProvider");
  }
  return context;
}

export { LoginProvider, useLogin };
