import React from "react";

const articles = [
  {
    id: 1,
    title: "The Power of Small Habits",
    summary: "Learn how tiny changes can lead to big results.",
    url: "#",
  },
  {
    id: 2,
    title: "Staying Consistent: Tips and Tricks",
    summary: "Strategies to keep your habits on track.",
    url: "#",
  },
  {
    id: 3,
    title: "Motivational Stories from HabitMate Users",
    summary: "Real success stories to inspire you.",
    url: "#",
  },
];

export default function Motivation() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Motivation</h1>
      <p>Explore articles and stories to keep your motivation high.</p>

      <div style={{ marginTop: 30, display: "grid", gap: 20 }}>
        {articles.map(({ id, title, summary, url }) => (
          <a
            key={id}
            href={url}
            style={{
              textDecoration: "none",
              padding: 20,
              borderRadius: 16,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              backgroundColor: "#f5f9ff",
              color: "#0072ff",
              display: "block",
              fontWeight: "600",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{title}</h3>
            <p style={{ fontWeight: "400", color: "#333" }}>{summary}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
