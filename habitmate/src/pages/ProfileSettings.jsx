import React, { useState } from "react";

export default function ProfileSettings() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    // Call API or context update here
    alert("Profile updated successfully!");
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Profile Settings</h1>
      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: 20 }}>
        <label>
          Display Name
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid #ccc" }}
          />
        </label>
        <label>
          Email Address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid #ccc" }}
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1.5px solid #ccc" }}
          />
        </label>
        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: "12px 0",
            backgroundColor: "#0072ff",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
