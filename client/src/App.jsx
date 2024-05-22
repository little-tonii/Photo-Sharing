import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NewFeeds from "./components/newfeeds/NewFeeds";
import CreatePost from "./components/create_post/CreatePost";
import Profile from "./components/profile/Profile";
import UserProfile from "./components/user_profile/UserProfile";
import ViewPost from "./components/view_post/ViewPost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-lato">
          <Routes>
            <Route index element={<Navigate to="/app" />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/home" />} />
              <Route
                path="/app/home"
                element={
                  <ProtectedRoute>
                    <NewFeeds />
                  </ProtectedRoute>
                }
              >
                <Route
                  to="/app/home/post/:postId"
                  element={
                    <ProtectedRoute>
                      <ViewPost />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="/app/search"
                element={<ProtectedRoute></ProtectedRoute>}
              />
              <Route
                path="/app/post"
                element={
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app/user/:userId"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
