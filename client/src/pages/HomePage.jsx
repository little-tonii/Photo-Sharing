import { Outlet } from "react-router-dom";
import { NavBarProvider } from "../contexts/NavBarContext";
import HomeLayout from "../layouts/HomeLayout";
import { CreatePostProvider } from "../contexts/CreatePostContext";
import { NewFeedsProvider } from "../contexts/NewFeedsContext";

function HomePage() {
  return (
    <NavBarProvider>
      <NewFeedsProvider>
        <CreatePostProvider>
          <HomeLayout>
            <Outlet />
          </HomeLayout>
        </CreatePostProvider>
      </NewFeedsProvider>
    </NavBarProvider>
  );
}

export default HomePage;
