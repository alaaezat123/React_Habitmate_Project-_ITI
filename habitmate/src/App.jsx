import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar"; // تأكد من المسار الصحيح
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import HabitSelectionScreen from "./pages/HabitSelectionScreen";

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!currentUser ? <AuthPage /> : <Navigate to="/home" replace />} />
      <Route path="/select-habits" element={currentUser ? <HabitSelectionScreen /> : <Navigate to="/" replace />} />
      <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      {currentUser && <NavBar userName={currentUser.displayName || currentUser.email} />}
      <AppRoutes />
    </BrowserRouter>
  );
}
