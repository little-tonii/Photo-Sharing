import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NavBarContext = createContext();

function NavBarProvider({ children }) {
  const [activeButton, setActiveButton] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <NavBarContext.Provider
      value={{
        activeButton,
        handleHomeNavigate,
        handlePostNavigate,
        handleSearchNavigate,
        handleProfileNavigate,
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
