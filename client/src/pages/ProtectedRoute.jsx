import { Navigate } from "react-router-dom";
import { useLogin } from "../contexts/LoginContext";

function ProtectedRoute({ children }) {
  const { user } = useLogin();
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
