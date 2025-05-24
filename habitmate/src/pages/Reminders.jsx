import React, { useState, useEffect } from "react";

export default function Reminders() {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("reminders");
    return saved ? JSON.parse(saved) : [];
  });
  const [newReminder, setNewReminder] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (!newReminder.trim() || !newTime) {
      alert("Please enter reminder text and time.");
      return;
    }
    setReminders([
      ...reminders,
      {
        id: Date.now(),
        text: newReminder.trim(),
        time: newTime,
      },
    ]);
    setNewReminder("");
    setNewTime("");
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: 20,
      }}
    >
      <h1>Reminders</h1>
      <p>Manage your habit reminders to stay on track.</p>

      <section
        style={{
          marginTop: 30,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Reminder text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          style={{
            flex: "1 1 250px",
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
          }}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            width: 120,
          }}
        />
        <button
          onClick={addReminder}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0072ff",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Add Reminder
        </button>
      </section>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {reminders.length === 0 && (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            No reminders yet. Add one above to get notified.
          </p>
        )}
        {reminders.map(({ id, text, time }) => (
          <li
            key={id}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: "#f0f9ff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
            }}
          >
            <div>
              <strong>{text}</strong>
              <div style={{ fontSize: 14, color: "#555" }}>At: {time}</div>
            </div>
            <button
              onClick={() => deleteReminder(id)}
              aria-label={`Delete reminder: ${text}`}
              style={{
                background: "transparent",
                border: "none",
                color: "#d32f2f",
                cursor: "pointer",
                fontSize: 20,
                fontWeight: "700",
                userSelect: "none",
              }}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
