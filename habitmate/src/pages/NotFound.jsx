import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>404 - Page Not Found</h2>
      <button style={styles.button} onClick={() => navigate("/home")}>
        Go to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "3rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 400,
    margin: "5rem auto",
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    padding: "0.75rem 2rem",
    fontSize: 16,
    cursor: "pointer",
  },
};
