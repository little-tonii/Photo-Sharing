import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { API } from "../utils/endpoints";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  firstNameError: "",
  lastNameError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updatePassword":
      return { ...state, password: action.payload };
    case "updateConfirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "updateFirstName":
      return { ...state, firstName: action.payload };
    case "updateLastName":
      return { ...state, lastName: action.payload };
    case "updateEmailError":
      return { ...state, emailError: action.payload };
    case "updatePasswordError":
      return { ...state, passwordError: action.payload };
    case "updateConfirmPasswordError":
      return { ...state, confirmPasswordError: action.payload };
    case "updateFirstNameError":
      return { ...state, firstNameError: action.payload };
    case "updateLastNameError":
      return { ...state, lastNameError: action.payload };
    default:
      throw new Error("Unknown action type.");
  }
}

const RegisterContext = createContext();

function RegisterProvider({ children }) {
  const [
    {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      emailError,
      passwordError,
      confirmPasswordError,
      firstNameError,
      lastNameError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { updateUser } = useAuth();

  const navigate = useNavigate();

  async function register() {
    if (email.length === 0) {
      dispatch({
        type: "updateEmailError",
        payload: "Email is required.",
      });
    } else {
      dispatch({ type: "updateEmailError", payload: "" });
    }
    if (password.length === 0) {
      dispatch({
        type: "updatePasswordError",
        payload: "Password is required.",
      });
    } else {
      dispatch({ type: "updatePasswordError", payload: "" });
    }
    if (password !== confirmPassword) {
      dispatch({
        type: "updateConfirmPasswordError",
        payload: "Passwords do not match.",
      });
    } else {
      dispatch({ type: "updateConfirmPasswordError", payload: "" });
    }
    if (firstName.length === 0) {
      dispatch({
        type: "updateFirstNameError",
        payload: "First name is required.",
      });
    } else {
      dispatch({ type: "updateFirstNameError", payload: "" });
    }
    if (lastName.length === 0) {
      dispatch({
        type: "updateLastNameError",
        payload: "Last name is required.",
      });
    } else {
      dispatch({ type: "updateLastNameError", payload: "" });
    }
    if (
      email.length > 0 &&
      password === confirmPassword &&
      firstName.length > 0 &&
      lastName.length > 0
    ) {
      dispatch({ type: "updateEmailError", payload: "" });
      dispatch({ type: "updatePasswordError", payload: "" });
      dispatch({ type: "updateConfirmPasswordError", payload: "" });
      dispatch({ type: "updateFirstNameError", payload: "" });
      dispatch({ type: "updateLastNameError", payload: "" });
      try {
        const res = await axios.post(
          API.REGISTER,
          {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
          },
          { withCredentials: true }
        );

        const data = await res.data;

        if (data.user) {
          localStorage.setItem("access_token", data.access_token);
          updateUser(data.user);
          navigate("/home");
        }
      } catch (error) {
        dispatch({
          type: "updateEmailError",
          payload: "Email is already in use.",
        });
      }
    }
  }

  function updateEmail(value) {
    dispatch({ type: "updateEmail", payload: value });
  }

  function updatePassword(value) {
    dispatch({ type: "updatePassword", payload: value });
  }

  function updateConfirmPassword(value) {
    dispatch({ type: "updateConfirmPassword", payload: value });
  }

  function updateFirstName(value) {
    dispatch({ type: "updateFirstName", payload: value });
  }

  function updateLastName(value) {
    dispatch({ type: "updateLastName", payload: value });
  }

  return (
    <RegisterContext.Provider
      value={{
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        emailError,
        passwordError,
        confirmPasswordError,
        firstNameError,
        lastNameError,
        updateEmail,
        updatePassword,
        updateConfirmPassword,
        updateFirstName,
        updateLastName,
        register,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

function useRegister() {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error("Register context was used outside the RegisterProvider.");
  }
  return context;
}

export { RegisterProvider, useRegister };
