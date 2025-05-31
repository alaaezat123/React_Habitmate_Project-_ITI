import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";

export default function NavBar({ userName }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav style={styles.nav}>
      <div style={styles.navbarContent}>
        <div style={styles.logoContainer} onClick={() => navigate("/home")}>
          <span style={styles.logo}>HabitMate</span>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.userInfo} onClick={() => navigate("/profile")}>
            <FiUser size={26} style={styles.userIcon} />
            <span style={styles.userName}>{userName}</span>
          </div>

          <button
            onClick={() => { /* Add logout logic */ }}
            style={styles.logoutButton}
          >
            Logout
          </button>

          <button onClick={toggleMenu} style={styles.menuButton}>
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Side Menu (Sliding) */}
      {menuOpen && (
        <div style={styles.sideMenu}>
          <button onClick={() => { navigate("/home"); setMenuOpen(false); }} style={styles.menuItem}>Home</button>
          <button onClick={() => { navigate("/habits"); setMenuOpen(false); }} style={styles.menuItem}>Habits</button>
          <button onClick={() => { navigate("/challenges"); setMenuOpen(false); }} style={styles.menuItem}>Challenges</button>
          <button onClick={() => { navigate("/share-progress"); setMenuOpen(false); }} style={styles.menuItem}>Share Progress</button>
          <button onClick={() => { navigate("/inspiration"); setMenuOpen(false); }} style={styles.menuItem}>Inspiration</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    position: "sticky",
    top: 0,
    backgroundColor: "#121212", // Dark base
    color: "#fff",
    zIndex: 1000,
    padding: "1rem 2rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)", // Subtle border
    transition: "background-color 0.3s ease-in-out",
  },
  navbarContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, color 0.3s ease",
  },
  logo: {
    fontSize: "2.8rem",
    fontWeight: "700",
    color: "#00bcd4", // Neon cyan
    letterSpacing: "1px",
    textTransform: "uppercase",
    cursor: "pointer",
    textShadow: "0 0 10px rgba(0,188,212,0.8)", // Neon glowing effect
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  userIcon: {
    color: "#FFD700", // Golden accent for the icon
  },
  userName: {
    fontSize: "1.2rem",
    fontWeight: "600",
  },
  logoutButton: {
    background: "#ff3366", // Bold red accent for logout
    color: "#fff",
    padding: "0.6rem 1.4rem",
    borderRadius: "25px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s ease",
    fontWeight: "600",
  },
  menuButton: {
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "2.5rem", // Larger for better touchability
    transition: "transform 0.3s ease",
  },
  sideMenu: {
    position: "absolute",
    top: "0",
    right: 0,
    width: "260px",
    backgroundColor: "#121212",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
    boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
    animation: "slideIn 0.3s ease-in-out",
  },
  menuItem: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.3rem",
    cursor: "pointer",
    textAlign: "left",
    padding: "0.8rem 0",
    transition: "color 0.3s ease-in-out",
    fontWeight: "600",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Dividers between items
  },
};

// Keyframes for the side menu slide-in animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`, styleSheet.cssRules.length);
