import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase"; // تأكد من مسار firebase عندك
import { doc, setDoc } from "firebase/firestore";

const habitsList: string[] = ["Reading", "Exercise", "Drink Water", "Meditation", "Learn"];

export default function Onboarding() {
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [reminderTime, setReminderTime] = useState<"morning" | "evening">("morning");
  const navigate = useNavigate();

  const toggleHabit = (habit: string) => {
    setSelectedHabits((prev: string[]) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  };

  const savePreferences = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("User not authenticated");

      await setDoc(doc(db, "users", userId), {
        habits: selectedHabits,
        reminderTime,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error saving preferences: ", error);
      // يمكنك عرض رسالة خطأ للمستخدم هنا
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: 500,
        margin: "auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "1rem" }}>Select Your Habits</h2>
      {habitsList.map((habit) => (
        <label
          key={habit}
          style={{ display: "block", margin: "10px 0", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={selectedHabits.includes(habit)}
            onChange={() => toggleHabit(habit)}
            style={{ marginRight: 8 }}
          />
          {habit}
        </label>
      ))}

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Select Reminder Time</h2>
      <label style={{ display: "block", marginBottom: 8, cursor: "pointer" }}>
        <input
          type="radio"
          checked={reminderTime === "morning"}
          onChange={() => setReminderTime("morning")}
          style={{ marginRight: 8 }}
        />
        Morning
      </label>
      <label style={{ display: "block", cursor: "pointer" }}>
        <input
          type="radio"
          checked={reminderTime === "evening"}
          onChange={() => setReminderTime("evening")}
          style={{ marginRight: 8 }}
        />
        Evening
      </label>

      <button
        onClick={savePreferences}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "linear-gradient(to right, #007bff, #00c6ff)",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          width: "100%",
          fontSize: "1rem",
        }}
      >
        Finish Setup
      </button>
    </div>
  );
}
