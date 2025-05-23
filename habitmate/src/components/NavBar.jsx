import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiUsers,
  FiPlus,
  FiUser,
  FiLogOut,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

// Simple circular progress component
const ProgressCircle = ({ progress }) => {
  const radius = 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} aria-label={`${Math.round(progress * 100)}% completed`}>
      <circle
        stroke="#ddd"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#00c6ff"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.35s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default function NavBar({
  userName = "User",
  completedCount = 0,
  totalCount = 0,
  onAddHabit,
  onLogout,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const progress = totalCount ? completedCount / totalCount : 0;

  return (
    <nav
      dir="ltr"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        backgroundColor: "#0072ff",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.7rem 1.5rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        userSelect: "none",
      }}
      aria-label="Main navigation"
    >
      {/* Left: Hamburger + Logo + Greeting */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={iconButtonStyle}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div
          onClick={() => navigate("/home")}
          style={{
            cursor: "pointer",
            fontWeight: "900",
            fontSize: 24,
            userSelect: "none",
            letterSpacing: 2,
          }}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate("/home");
          }}
          aria-label="Go to home page"
        >
          HabitMate
        </div>

        <div
          style={{
            fontWeight: "600",
            fontSize: 14,
            opacity: 0.85,
            marginLeft: 12,
            userSelect: "none",
          }}
          aria-live="polite"
        >
          {greeting}, {userName.split(" ")[0]}!
        </div>
      </div>

      {/* Center: Progress + Click to stats */}
      <button
        onClick={() => navigate("/stats")}
        aria-label={`You have completed ${completedCount} out of ${totalCount} habits today`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.15)",
          border: "none",
          borderRadius: 24,
          padding: "6px 18px",
          cursor: "pointer",
          color: "#fff",
          fontWeight: "700",
          userSelect: "none",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
      >
        <ProgressCircle progress={progress} />
        <span>{completedCount} / {totalCount} done today</span>
      </button>

      {/* Right: Add habit + User menu */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={onAddHabit}
          aria-label="Add new habit"
          style={addHabitButtonStyle}
        >
          <FiPlus size={20} />
          <span style={{ marginLeft: 6, fontWeight: "700" }}>Add Habit</span>
        </button>

        <UserMenu userName={userName} onLogout={onLogout} />
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          navigate={navigate}
          onAddHabit={() => {
            onAddHabit();
            setMenuOpen(false);
          }}
          onLogout={() => {
            onLogout();
            setMenuOpen(false);
          }}
        />
      )}
    </nav>
  );
}

function UserMenu({ userName, onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
        style={userAvatarButtonStyle}
        title={userName}
      >
        {userName.charAt(0).toUpperCase()}
      </button>
      {open && (
        <ul
          role="menu"
          aria-label="User menu options"
          style={menuDropdownStyle}
        >
          <li role="none">
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate("/settings");
              }}
              style={menuItemStyle}
            >
              <FiSettings style={{ marginLeft: 8 }} /> Settings
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              style={menuItemStyle}
            >
              <FiLogOut style={{ marginLeft: 8 }} /> Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

function MobileMenu({ onClose, navigate, onAddHabit, onLogout }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1500,
        display: "flex",
        flexDirection: "column",
        padding: 20,
        gap: 24,
      }}
    >
      <button
        onClick={() => {
          onClose();
          navigate("/home");
        }}
        style={mobileMenuButtonStyle}
      >
        <FiHome size={22} /> Home
      </button>

      <button
        onClick={() => {
          onClose();
          navigate("/stats");
        }}
        style={mobileMenuButtonStyle}
      >
        <FiBarChart2 size={22} /> Statistics
      </button>

      <button
        onClick={() => {
          onClose();
          navigate("/community");
        }}
        style={mobileMenuButtonStyle}
      >
        <FiUsers size={22} /> Community
      </button>

      <button onClick={() => { onAddHabit(); onClose(); }} style={mobileAddButtonStyle}>
        <FiPlus size={22} /> Add Habit
      </button>

      <button onClick={() => { onLogout(); onClose(); }} style={mobileMenuButtonStyle}>
        <FiLogOut size={22} /> Logout
      </button>

      <button onClick={onClose} style={{ ...mobileMenuButtonStyle, marginTop: "auto" }}>
        Close Menu
      </button>
    </div>
  );
}

// Styles

const navButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontWeight: "600",
  fontSize: "1.05rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 8,
  userSelect: "none",
  transition: "background-color 0.25s ease, box-shadow 0.25s ease",
  outline: "none",
};

const addHabitButtonStyle = {
  border: "none",
  color: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: 30,
  fontSize: "1rem",
  userSelect: "none",
  background: "linear-gradient(45deg, #00c6ff, #0072ff)",
  boxShadow: "0 4px 15px rgba(0,114,255,0.5)",
  transition: "background 0.3s ease",
  outline: "none",
};

const iconButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  padding: 6,
  borderRadius: 8,
  userSelect: "none",
  transition: "background-color 0.2s ease",
  outline: "none",
};

const userAvatarButtonStyle = {
  background: "transparent",
  border: "2px solid #fff",
  borderRadius: "50%",
  width: 40,
  height: 40,
  fontWeight: "700",
  color: "#fff",
  cursor: "pointer",
  userSelect: "none",
  fontSize: 18,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const menuDropdownStyle = {
  position: "absolute",
  right: 0,
  marginTop: 8,
  backgroundColor: "#fff",
  color: "#333",
  borderRadius: 8,
  boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
  listStyle: "none",
  padding: "8px 0",
  minWidth: 160,
  zIndex: 1300,
};

const menuItemStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  padding: "10px 20px",
  textAlign: "right",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: 14,
  color: "#333",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 6,
  userSelect: "none",
  transition: "background-color 0.2s ease",
};

const mobileMenuButtonStyle = {
  background: "#0072ff",
  border: "none",
  color: "#fff",
  fontWeight: "700",
  fontSize: 18,
  padding: "14px 24px",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  gap: 16,
  cursor: "pointer",
  userSelect: "none",
};

const mobileAddButtonStyle = {
  ...mobileMenuButtonStyle,
  background: "linear-gradient(45deg, #00c6ff, #0072ff)",
  boxShadow: "0 6px 20px rgba(0,114,255,0.6)",
};
