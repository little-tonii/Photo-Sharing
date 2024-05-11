import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { LoginProvider } from "./contexts/LoginContext";
import PageNotFound from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import { RegisterProvider } from "./contexts/RegisterContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
          <div className="font-lato">
            <Routes>
              <Route index element={<Navigate to="/home" />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
