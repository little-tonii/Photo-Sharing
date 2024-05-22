import { Outlet } from "react-router-dom";
import { NavBarProvider } from "../contexts/NavBarContext";
import HomeLayout from "../layouts/HomeLayout";
import { CreatePostProvider } from "../contexts/CreatePostContext";
import { NewFeedsProvider } from "../contexts/NewFeedsContext";
import { SuggestionUserProvider } from "../contexts/SuggestionUserContext";

function HomePage() {
  return (
    <NavBarProvider>
      <NewFeedsProvider>
        <SuggestionUserProvider>
          <CreatePostProvider>
              <HomeLayout>
                <Outlet />
              </HomeLayout>
          </CreatePostProvider>
        </SuggestionUserProvider>
      </NewFeedsProvider>
    </NavBarProvider>
  );
}

export default HomePage;
