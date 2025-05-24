import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBarChart2, FiBookOpen, FiUser, FiBell, FiHeart, FiUsers, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/home", label: "Home", icon: <FiHome /> },
  { to: "/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
  { to: "/habit-library", label: "Library", icon: <FiBookOpen /> },
  { to: "/profile-settings", label: "Profile", icon: <FiUser /> },
  { to: "/reminders", label: "Reminders", icon: <FiBell /> },
  { to: "/motivation", label: "Motivation", icon: <FiHeart /> },
  { to: "/community", label: "Community", icon: <FiUsers /> },
];

export default function NavBar({ userName, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click (mobile)
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1500,
          backgroundColor: "#0072ff",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          height: 60,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
          userSelect: "none",
        }}
      >
        {/* Left: Logo */}
        <div
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer", fontWeight: "900", fontSize: 24, letterSpacing: 2, userSelect: "none" }}
          tabIndex={0}
          role="link"
          aria-label="Go to Home"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate("/home"); }}
        >
          HabitMate
        </div>

        {/* Desktop Links */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: 30,
            margin: 0,
            padding: 0,
          }}
          className="desktop-menu"
        >
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  color: isActive ? "#00c6ff" : "white",
                  fontWeight: isActive ? "700" : "500",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 16,
                  padding: "8px 0",
                  borderBottom: isActive ? "3px solid #00c6ff" : "3px solid transparent",
                  transition: "color 0.3s ease, border-bottom 0.3s ease",
                })}
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                {icon}
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: User and Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span aria-label={`Logged in as ${userName}`} style={{ fontWeight: "600" }}>
            {userName.split(" ")[0]}
          </span>
          <button
            onClick={onLogout}
            aria-label="Logout"
            style={{
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: 30,
              color: "white",
              cursor: "pointer",
              padding: "6px 16px",
              fontWeight: "700",
              fontSize: 14,
              userSelect: "none",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <FiLogOut size={18} style={{ marginRight: 6 }} />
            Logout
          </button>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: 28,
              display: "none",
              userSelect: "none",
            }}
            className="mobile-menu-button"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#0072ff",
              overflow: "hidden",
              padding: "1rem 2rem",
              boxShadow: "0 6px 25px rgba(0,0,0,0.3)",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: "none",
              zIndex: 1400,
            }}
            ref={menuRef}
          >
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {links.map(({ to, label, icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive ? "#00c6ff" : "white",
                      fontWeight: isActive ? "700" : "500",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 18,
                      padding: "8px 0",
                      borderBottom: isActive ? "3px solid #00c6ff" : "3px solid transparent",
                    })}
                    aria-current={({ isActive }) => (isActive ? "page" : undefined)}
                  >
                    {icon}
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    onLogout();
                    setMenuOpen(false);
                  }}
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    borderRadius: 30,
                    color: "white",
                    cursor: "pointer",
                    padding: "10px 0",
                    width: "100%",
                    fontWeight: "700",
                    fontSize: 18,
                    userSelect: "none",
                  }}
                  aria-label="Logout"
                >
                  <FiLogOut size={22} style={{ marginRight: 10 }} />
                  Logout
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-menu {
              display: none;
            }
            .mobile-menu-button {
              display: block !important;
            }
          }
        `}
      </style>
    </>
  );
}
