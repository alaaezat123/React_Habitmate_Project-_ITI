import React, { useState } from "react";

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Settings</h1>

      <section style={styles.settingItem}>
        <label htmlFor="notifications" style={styles.label}>
          Enable Notifications
        </label>
        <input
          type="checkbox"
          id="notifications"
          checked={notificationsEnabled}
          onChange={() => setNotificationsEnabled((prev) => !prev)}
          aria-checked={notificationsEnabled}
        />
      </section>

      <section style={styles.settingItem}>
        <label htmlFor="darkmode" style={styles.label}>
          Enable Dark Mode
        </label>
        <input
          type="checkbox"
          id="darkmode"
          checked={darkModeEnabled}
          onChange={() => setDarkModeEnabled((prev) => !prev)}
          aria-checked={darkModeEnabled}
        />
      </section>

      <button style={styles.saveButton} onClick={() => alert("Settings saved!")}>
        Save Settings
      </button>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    marginBottom: "2rem",
    textAlign: "center",
  },
  settingItem: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontWeight: "700",
    fontSize: "1.15rem",
  },
  saveButton: {
    backgroundColor: "#0072ff",
    color: "#fff",
    border: "none",
    padding: "1rem 2.5rem",
    borderRadius: 40,
    fontWeight: "700",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "block",
    margin: "2rem auto 0",
    boxShadow: "0 8px 20px rgba(0,114,255,0.5)",
    transition: "background-color 0.3s ease",
  },
};
