import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../utils/endpoints";
import { useAuth } from "./AuthContext";

const NavBarContext = createContext();

function NavBarProvider({ children }) {
  const [activeButton, setActiveButton] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser, setIsAuth } = useAuth();

  useEffect(() => {
    setActiveButton(location.pathname.split("/")[2]);
  }, [location]);

  function handleHomeNavigate() {
    navigate("/app/home");
  }

  function handleSearchNavigate() {
    navigate("/app/search");
  }

  function handlePostNavigate() {
    navigate("/app/post");
  }

  function handleProfileNavigate() {
    navigate("/app/profile");
  }

  async function handleLogout() {
    await axios.delete(API.LOGOUT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      withCredentials: true,
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    updateUser(null);
    setIsAuth();
    navigate("/login");
  }

  return (
    <NavBarContext.Provider
      value={{
        activeButton,
        handleHomeNavigate,
        handlePostNavigate,
        handleSearchNavigate,
        handleProfileNavigate,
        handleLogout,
      }}
    >
      {children}
    </NavBarContext.Provider>
  );
}

const useNavBar = () => {
  const context = useContext(NavBarContext);
  if (context === undefined) {
    throw new Error("NavBar context was used outside the NavBarProvider.");
  }
  return context;
};

export { NavBarProvider, useNavBar };
