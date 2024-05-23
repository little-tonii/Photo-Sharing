import { Outlet } from "react-router-dom";
import { NavBarProvider } from "../contexts/NavBarContext";
import HomeLayout from "../layouts/HomeLayout";
import { CreatePostProvider } from "../contexts/CreatePostContext";
import { NewFeedsProvider } from "../contexts/NewFeedsContext";
import { SuggestionUserProvider } from "../contexts/SuggestionUserContext";
import { ViewPostProvider } from "../contexts/ViewPostContext";
import { LikePostProvider } from "../contexts/LikePostContext";

function HomePage() {
  return (
    <NavBarProvider>
      <NewFeedsProvider>
        <SuggestionUserProvider>
          <CreatePostProvider>
            <ViewPostProvider>
              <LikePostProvider>
                <HomeLayout>
                  <Outlet />
                </HomeLayout>
              </LikePostProvider>
            </ViewPostProvider>
          </CreatePostProvider>
        </SuggestionUserProvider>
      </NewFeedsProvider>
    </NavBarProvider>
  );
}

export default HomePage;
