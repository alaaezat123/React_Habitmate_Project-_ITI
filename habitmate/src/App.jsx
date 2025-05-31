import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Habits from "./pages/Habits";
import Challenges from "./pages/Challenges";
import ShareProgress from "./pages/ShareProgress";
import Inspiration from "./pages/Inspiration";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const { currentUser } = useAuth();
  const location = useLocation();

  // NavBar يظهر فقط لو المستخدم مسجل دخول و **الصفحة ليست AuthPage أو Home**
  const showNavBar =
    currentUser && location.pathname !== "/" && location.pathname !== "/home";

  return (
    <>
      {showNavBar && <NavBar userName={currentUser.displayName || currentUser.email} />}

      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/home" replace /> : <AuthPage />
          }
        />

        {currentUser && (
          <>
            <Route
              path="/home"
              element={<Home userName={currentUser.displayName || currentUser.email} />}
            />
            <Route path="/habits" element={<Habits />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/share-progress" element={<ShareProgress />} />
            <Route path="/inspiration" element={<Inspiration />} />
          </>
        )}

        {/* لو مش مسجل دخول، إعادة توجيه أي صفحة أخرى إلى "/" */}
        {!currentUser && <Route path="*" element={<Navigate to="/" replace />} />}

        {/* صفحة 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
