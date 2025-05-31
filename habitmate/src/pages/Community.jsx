import React, { useState } from "react";

const dummyPosts = [
  { id: 1, author: "Alice", content: "Just completed my 10-day streak! Feeling great!" },
  { id: 2, author: "Bob", content: "Anyone else trying the no sugar challenge this week?" },
  { id: 3, author: "Cathy", content: "Motivation tip: celebrate small wins every day." },
];

export default function Community() {
  const [posts, setPosts] = useState(dummyPosts);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    setPosts([{ id: Date.now(), author: "You", content: newPost }, ...posts]);
    setNewPost("");
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Community Feed</h1>
      <section style={styles.newPostSection}>
        <textarea
          placeholder="Share something with the community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
          style={styles.textArea}
          aria-label="New community post"
        />
        <button onClick={handleAddPost} style={styles.postButton}>
          Post
        </button>
      </section>

      <section style={styles.postsList}>
        {posts.map(({ id, author, content }) => (
          <article key={id} style={styles.postCard}>
            <p style={styles.author}>@{author}</p>
            <p style={styles.content}>{content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: 900,
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
  newPostSection: {
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  textArea: {
    width: "100%",
    padding: 16,
    fontSize: "1.1rem",
    borderRadius: 12,
    border: "2px solid #ccc",
    resize: "vertical",
    fontFamily: "inherit",
  },
  postButton: {
    alignSelf: "flex-end",
    backgroundColor: "#00aaff",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: 40,
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.1rem",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,170,255,0.5)",
    transition: "background-color 0.3s ease",
  },
  postsList: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  postCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  author: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#0072ff",
  },
  content: {
    fontSize: "1.1rem",
    lineHeight: 1.5,
  },
};
