import React, { useState, useEffect } from "react";
import QuoteSlider from "../components/QuoteSlider";
import HabitCard from "../components/HabitCard";
import CustomHabitModal from "../components/CustomHabitModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { categorizedHobbies } from "../data/habitsData";

export default function Home() {
  // عادات المستخدم المخزنة
  const [userHabits, setUserHabits] = useState(() => {
    const saved = localStorage.getItem("userHabits");
    return saved ? JSON.parse(saved) : [];
  });

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customHabitName, setCustomHabitName] = useState("");
  const [habitToDelete, setHabitToDelete] = useState(null);

  // حفظ العادات في localStorage عند التحديث
  useEffect(() => {
    localStorage.setItem("userHabits", JSON.stringify(userHabits));
  }, [userHabits]);

  // تبديل حالة اكتمال العادة
  const toggleDone = (id) => {
    setUserHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  // إضافة عادة من المكتبة (إن لم تكن موجودة)
  const addHabit = (habit) => {
    if (userHabits.some((h) => h.id === habit.id)) {
      alert("Habit already added.");
      return;
    }
    setUserHabits([...userHabits, { ...habit, done: false }]);
  };

  // إضافة عادة مخصصة
  const addCustomHabit = () => {
    const name = customHabitName.trim();
    if (!name) {
      alert("Please enter a habit name.");
      return;
    }
    if (userHabits.some((h) => h.name.toLowerCase() === name.toLowerCase())) {
      alert("Habit already added.");
      return;
    }
    const newHabit = {
      id: Date.now(),
      name,
      imageUrl:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      done: false,
    };
    setUserHabits([...userHabits, newHabit]);
    setCustomHabitName("");
    setShowCustomModal(false);
  };

  // تأكيد حذف العادة
  const confirmDelete = (habit) => setHabitToDelete(habit);
  // إلغاء الحذف
  const cancelDelete = () => setHabitToDelete(null);
  // تنفيذ الحذف
  const performDelete = () => {
    setUserHabits((prev) => prev.filter((h) => h.id !== habitToDelete.id));
    setHabitToDelete(null);
  };

  return (
    <div className="container" style={{ maxWidth: 960, margin: "2rem auto", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#222", minHeight: "100vh", paddingBottom: 80 }}>
      <QuoteSlider />

      <section style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 24, fontWeight: "700", color: "#0072ff" }}>Available Habits</h2>
        {Object.entries(categorizedHobbies).map(([category, habits]) => (
          <div key={category} style={{ marginBottom: 36 }}>
            <h3 style={{ color: "#0072ff", fontWeight: "700", borderBottom: "3px solid #0072ff", paddingBottom: 6, marginBottom: 20, fontSize: 20 }}>
              {category}
            </h3>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "flex-start" }}>
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={() => addHabit(habit)}
                  isToggleMode={false} // في المكتبة نستخدم الضغط لإضافة، مش لتبديل حالة
                  showDelete={false}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowCustomModal(true)}
          style={{
            marginTop: 20,
            background: "linear-gradient(135deg, #00b0ff, #005fcb)",
            border: "none",
            padding: "14px 28px",
            borderRadius: 30,
            color: "white",
            fontWeight: "700",
            fontSize: 16,
            cursor: "pointer",
            boxShadow: "0 6px 25px rgba(0,176,255,0.9)",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            maxWidth: 220,
          }}
          aria-label="Add a custom habit"
        >
          + Add Custom Habit
        </button>
      </section>

      <section style={{ marginTop: 50 }}>
        <h2 style={{ marginBottom: 24, fontWeight: "700", color: "#333" }}>Your Habits</h2>
        {userHabits.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "flex-start" }}>
            {userHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={() => toggleDone(habit.id)}
                onDelete={() => confirmDelete(habit)}
                isToggleMode={true}
                showDelete={true}
              />
            ))}
          </div>
        ) : (
          <p style={{ color: "#666", fontStyle: "italic", fontSize: 16 }}>
            You haven't added any habits yet. Choose from above or add a custom one.
          </p>
        )}
      </section>

      {showCustomModal && (
        <CustomHabitModal
          customHabitName={customHabitName}
          setCustomHabitName={setCustomHabitName}
          onAdd={addCustomHabit}
          onClose={() => setShowCustomModal(false)}
        />
      )}

      {habitToDelete && (
        <ConfirmDeleteModal
          habitName={habitToDelete.name}
          onCancel={cancelDelete}
          onConfirm={performDelete}
        />
      )}
    </div>
  );
}
