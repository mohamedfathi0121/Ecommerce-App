import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";


function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <Outlet />; 
}

export default ProtectedRoutes;
