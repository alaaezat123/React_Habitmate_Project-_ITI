import React, { useState } from "react";
import { FiHome, FiBarChart2, FiUsers, FiSettings, FiLogOut, FiX, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ userName = "User", onLogout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { icon: <FiHome />, label: "Home", path: "/home" },
    { icon: <FiBarChart2 />, label: "Stats", path: "/stats" },
    { icon: <FiUsers />, label: "Community", path: "/community" },
    { icon: <FiSettings />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        style={styles.menuToggle}
      >
        {open ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      <nav
        style={{
          ...styles.sidebar,
          left: open ? 0 : "-280px",
        }}
        aria-label="Sidebar navigation"
      >
        <div style={styles.userSection}>
          <div style={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
          <p style={styles.userName}>{userName}</p>
        </div>
        <ul style={styles.navList}>
          {links.map(({ icon, label, path }) => (
            <li key={label}>
              <button
                onClick={() => {
                  navigate(path);
                  setOpen(false);
                }}
                style={styles.navButton}
              >
                {icon}
                <span style={{ marginLeft: 10 }}>{label}</span>
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              style={{ ...styles.navButton, color: "#f44336" }}
            >
              <FiLogOut />
              <span style={{ marginLeft: 10 }}>Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {open && <div onClick={() => setOpen(false)} style={styles.overlay} aria-hidden="true" />}
    </>
  );
}

const styles = {
  menuToggle: {
    position: "fixed",
    top: 20,
    left: 20,
    zIndex: 1600,
    background: "#0072ff",
    border: "none",
    borderRadius: "50%",
    padding: 12,
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(0,114,255,0.6)",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 280,
    height: "100vh",
    backgroundColor: "#001f44",
    color: "#fff",
    padding: "3rem 1.5rem",
    boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
    transition: "left 0.3s ease",
    zIndex: 1500,
    display: "flex",
    flexDirection: "column",
  },
  userSection: {
    marginBottom: 40,
    textAlign: "center",
  },
  avatar: {
    backgroundColor: "#0072ff",
    width: 70,
    height: 70,
    borderRadius: "50%",
    fontSize: 36,
    lineHeight: "70px",
    fontWeight: "900",
    margin: "0 auto 10px",
    userSelect: "none",
  },
  userName: {
    fontWeight: "700",
    fontSize: 20,
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "transparent",
    border: "none",
    padding: "12px 10px",
    fontSize: 18,
    fontWeight: "600",
    color: "#cbd5e1",
    cursor: "pointer",
    borderRadius: 8,
    transition: "background-color 0.2s ease",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1400,
  },
};
