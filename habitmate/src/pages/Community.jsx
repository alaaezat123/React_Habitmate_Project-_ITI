import React, { useState, useEffect } from "react";

export default function Community() {
  const [posts, setPosts] = useState([
    { id: 1, author: "Alice", content: "Just completed my habit streak of 10 days!", date: "2025-05-23" },
    { id: 2, author: "Bob", content: "Any tips on staying motivated?", date: "2025-05-22" },
  ]);
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), author: "You", content: newPost.trim(), date: new Date().toISOString().split("T")[0] }, ...posts]);
    setNewPost("");
  };

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Community Forum</h1>
      <p>Connect with other users, share your progress, and get inspired!</p>

      <div style={{ marginTop: 30, marginBottom: 20 }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write something to share..."
          rows={3}
          style={{ width: "100%", padding: 12, fontSize: 16, borderRadius: 8, border: "1.5px solid #ccc", resize: "vertical" }}
        />
        <button
          onClick={addPost}
          style={{
            marginTop: 10,
            padding: "10px 20px",
            backgroundColor: "#0072ff",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Post
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(({ id, author, content, date }) => (
          <li key={id} style={{ padding: 16, marginBottom: 16, backgroundColor: "#f0f8ff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontWeight: "700", marginBottom: 6 }}>{author}</div>
            <div style={{ marginBottom: 8 }}>{content}</div>
            <small style={{ color: "#555" }}>{date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
