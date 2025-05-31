import React, { useState } from "react";

export default function AddHabitModal({ isOpen, onClose, onAdd }) {
  const [habitName, setHabitName] = useState("");
  const [habitGoal, setHabitGoal] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return alert("Please enter a habit name.");
    onAdd({ name: habitName, goal: habitGoal });
    setHabitName("");
    setHabitGoal(1);
    onClose();
  };

  return (
    <div style={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="add-habit-title">
      <form onSubmit={handleSubmit} style={styles.modal}>
        <h2 id="add-habit-title" style={styles.title}>Add New Habit</h2>

        <label htmlFor="habit-name" style={styles.label}>Habit Name:</label>
        <input
          id="habit-name"
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          style={styles.input}
          required
          autoFocus
        />

        <label htmlFor="habit-goal" style={styles.label}>Daily Goal (times):</label>
        <input
          id="habit-goal"
          type="number"
          min="1"
          value={habitGoal}
          onChange={(e) => setHabitGoal(Number(e.target.value))}
          style={styles.input}
          required
        />

        <div style={styles.buttonsRow}>
          <button type="submit" style={styles.addButton}>Add</button>
          <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    width: 320,
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    marginBottom: 16,
    fontWeight: "800",
    fontSize: "1.75rem",
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    border: "2px solid #ccc",
    fontSize: "1rem",
  },
  buttonsRow: {
    marginTop: 24,
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#0072ff",
    border: "none",
    color: "#fff",
    padding: "0.7rem 1.8rem",
    fontWeight: "700",
    borderRadius: 40,
    cursor: "pointer",
    fontSize: "1rem",
  },
  cancelButton: {
    backgroundColor: "#eee",
    border: "none",
    color: "#444",
    padding: "0.7rem 1.8rem",
    fontWeight: "700",
    borderRadius: 40,
    cursor: "pointer",
    fontSize: "1rem",
  },
};
