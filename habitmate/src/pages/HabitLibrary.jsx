import React from "react";
import HabitCard from "../components/HabitCard";
import { categorizedHobbies } from "../data/habitsData";

export default function HabitLibrary() {
  return (
    <section style={{ maxWidth: 900, margin: "2rem auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Habit Library</h1>
      <p>Explore and add habits to your collection.</p>

      {Object.entries(categorizedHobbies).map(([category, habits]) => (
        <div key={category} style={{ marginTop: 30 }}>
          <h2 style={{ color: "#0072ff", borderBottom: "3px solid #0072ff", paddingBottom: 6 }}>{category}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 12 }}>
            {habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
