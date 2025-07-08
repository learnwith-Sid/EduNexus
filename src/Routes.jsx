import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Import your pages
import HomePage from "pages/home/HomePage"; // Corrected path based on your error log
import LoginPage from "pages/home/LoginPage"; // Assuming this path
import AdminDashboard from "pages/admin-dashboard";
import TeacherDashboard from "pages/teacher-dashboard";
import AnnouncementsPage from "pages/admin-dashboard/AnnouncementsPage";
import NotFound from "pages/NotFound";
import UsersPage from "pages/admin-dashboard/UsersPage";

// This component receives props from App.jsx
const AppRoutes = ({ isLoggedIn, handleLogin, handleLogout, isThreeJsLoaded,notifications, setNotifications }) => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<HomePage isThreeJsLoaded={isThreeJsLoaded} />} 
        />
        <Route 
          path="/login" 
          element={
            isLoggedIn ? (
              <Navigate to="/admin-dashboard" /> 
            ) : (
              <LoginPage onLogin={handleLogin} isThreeJsLoaded={isThreeJsLoaded} />
            )
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/admin-dashboard" 
          element={isLoggedIn ? <AdminDashboard onLogout={handleLogout } notifications={notifications} setNotifications={setNotifications} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher-dashboard" 
          element={isLoggedIn ? <TeacherDashboard onLogout={handleLogout} notifications={notifications} setNotifications={setNotifications} /> : <Navigate to="/login" />} 
        />
        <Route path="/announcements" element={isLoggedIn ? <AnnouncementsPage onLogout={handleLogout} notifications={notifications} setNotifications={setNotifications} /> : <Navigate to="/login" />} />
        <Route path="/users" element={isLoggedIn ? <UsersPage onLogout={handleLogout} notifications={notifications} setNotifications={setNotifications} /> : <Navigate to="/login" />} />


        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
