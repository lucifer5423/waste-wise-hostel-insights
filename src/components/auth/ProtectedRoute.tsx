
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, userInfo } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Student users should not access admin routes
  if (userInfo?.role === 'student' && location.pathname !== '/student-feedback') {
    return <Navigate to="/student-feedback" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
