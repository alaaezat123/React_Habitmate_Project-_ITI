import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HabitLibrary from "./pages/HabitLibrary";
import ProfileSettings from "./pages/ProfileSettings";
import Reminders from "./pages/Reminders";
import Motivation from "./pages/Motivation";
import Community from "./pages/Community";

function AppRoutes() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <NavBar userName={currentUser.displayName || currentUser.email} onLogout={logout} />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/habit-library" element={<HabitLibrary />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/motivation" element={<Motivation />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
