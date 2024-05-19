import { useNavBar } from "../../contexts/NavBarContext";
import NavButton from "../commons/NavButton";

function NavBar() {
  const {
    activeButton,
    handleHomeNavigate,
    handlePostNavigate,
    handleSearchNavigate,
    handleProfileNavigate,
  } = useNavBar();

  return (
    <nav className="w-full h-full border-2 border-black flex flex-col p-4 justify-between text-center rounded-lg">
      <div className="flex flex-col">
        <div>
          <h1 className="font-dancingScript font-bold text-4xl pt-4 pb-4 mb-8">
            Photo Sharing
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <NavButton
            text="Home"
            icon="ti-home"
            active={activeButton === "home"}
            action={handleHomeNavigate}
          />
          <NavButton
            text="Search"
            icon="ti-search"
            active={activeButton === "search"}
            action={handleSearchNavigate}
          />
          <NavButton
            text="New Post"
            icon="ti-pencil"
            active={activeButton === "post"}
            action={handlePostNavigate}
          />
          <NavButton
            text="Profile"
            icon="ti-user"
            active={activeButton === "profile"}
            action={handleProfileNavigate}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <NavButton text="Logout" icon="ti-shift-left" />
      </div>
    </nav>
  );
}

export default NavBar;
