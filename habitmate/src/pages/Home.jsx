import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { FiCheckCircle, FiCircle, FiPlus, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const motivationQuotes = [
  "العادات الصغيرة تصنع الفارق الكبير.",
  "ابدأ اليوم، لا تؤجل غداً.",
  "الاستمرارية هي سر النجاح.",
  "كل يوم هو فرصة لبداية جديدة.",
  "التغيير يبدأ بخطوة صغيرة.",
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [motivation, setMotivation] = useState("");

  useEffect(() => {
    // اختيار اقتباس تحفيزي عشوائي يومياً
    const index = Math.floor(Math.random() * motivationQuotes.length);
    setMotivation(motivationQuotes[index]);

    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || user.email || "User");
      const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) setHabits(docSnap.data().habits || []);
        else setHabits([]);
      });
      return () => unsubscribe();
    }
  }, []);

  const toggleHabitDone = async (idx) => {
    const user = auth.currentUser;
    if (!user) return;
    const updatedHabits = [...habits];
    updatedHabits[idx] = { ...updatedHabits[idx], done: !updatedHabits[idx].done };
    setHabits(updatedHabits);
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { habits: updatedHabits });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const addHabit = async () => {
    if (!newHabitName.trim()) return;
    const user = auth.currentUser;
    if (!user) return;
    const habitObj = { name: newHabitName.trim(), done: false };
    const updatedHabits = [...habits, habitObj];
    setHabits(updatedHabits);
    setNewHabitName("");
    setShowAddModal(false);
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), { habits: updatedHabits });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const completedCount = habits.filter((h) => h.done).length;
  const totalCount = habits.length;

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: 30 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "900" }}>
          أهلاً بك، {userName} 👋
        </h1>
        <p style={{ fontSize: "1.15rem", color: "#555", marginTop: 6 }}>
          لديك {completedCount} من {totalCount} عادة مكتملة اليوم.
        </p>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 15,
            background: "linear-gradient(90deg, #00c6ff, #0072ff)",
            color: "#fff",
            padding: "0.7rem 1.5rem",
            borderRadius: 30,
            fontWeight: "700",
            fontSize: "1.1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            userSelect: "none",
            boxShadow: "0 6px 15px rgba(0,114,255,0.3)",
          }}
          aria-live="polite"
        >
          <FiStar size={20} />
          {motivation}
        </motion.div>
      </header>

      {/* Habits grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
          marginBottom: 80,
        }}
      >
        {habits.length ? (
          habits.map((habit, idx) => (
            <motion.div
              key={idx}
              layout
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,114,255,0.25)" }}
              style={{
                background: habit.done ? "#d1e7dd" : "#f8f9fa",
                borderRadius: 16,
                padding: 24,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: habit.done
                  ? "0 6px 15px rgba(56,142,60,0.4)"
                  : "0 3px 8px rgba(0,0,0,0.05)",
                userSelect: "none",
              }}
              onClick={() => toggleHabitDone(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleHabitDone(idx);
              }}
              aria-pressed={habit.done}
              aria-label={`${habit.name} ${habit.done ? "مكتملة" : "غير مكتملة"}`}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: habit.done ? "700" : "600",
                  color: habit.done ? "#2e7d32" : "#1a237e",
                  textDecoration: habit.done ? "line-through" : "none",
                }}
              >
                {habit.name}
              </span>
              {habit.done ? (
                <FiCheckCircle size={26} color="#2e7d32" />
              ) : (
                <FiCircle size={26} color="#1a237e" />
              )}
            </motion.div>
          ))
        ) : (
          <p
            style={{
              gridColumn: "1/-1",
              fontStyle: "italic",
              fontSize: 16,
              color: "#888",
              textAlign: "center",
              marginTop: 60,
            }}
          >
            لا توجد عادات حتى الآن. اضغط زر الإضافة لبدء رحلتك!
          </p>
        )}
      </section>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        aria-label="إضافة عادة جديدة"
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(45deg, #00c6ff, #0072ff)",
          color: "#fff",
          fontSize: 30,
          boxShadow: "0 6px 20px rgba(0,114,255,0.4)",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "background 0.3s ease",
          userSelect: "none",
          zIndex: 100,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(45deg, #0072ff, #00c6ff)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(45deg, #00c6ff, #0072ff)")}
      >
        <FiPlus />
      </button>

      {/* Add Habit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1100,
              padding: 16,
            }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.25 }}
              style={{
                backgroundColor: "#fff",
                borderRadius: 20,
                maxWidth: 400,
                width: "100%",
                padding: "2rem",
                boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 style={{ marginBottom: 20, fontWeight: 700, color: "#222" }}>
                أضف عادة جديدة
              </h2>
              <input
                type="text"
                placeholder="اسم العادة..."
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.8rem 1rem",
                  fontSize: "1.1rem",
                  borderRadius: 12,
                  border: "1px solid #ccc",
                  marginBottom: 20,
                  outline: "none",
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addHabit();
                  }
                }}
                aria-label="اسم العادة الجديدة"
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "1rem",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  إلغاء
                </button>
                <button
                  onClick={addHabit}
                  disabled={!newHabitName.trim() || loading}
                  style={{
                    background: "#0072ff",
                    border: "none",
                    color: "#fff",
                    fontWeight: "700",
                    fontSize: "1rem",
                    padding: "0.6rem 1.4rem",
                    borderRadius: 12,
                    cursor: !newHabitName.trim() || loading ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(0,114,255,0.4)",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    !(!newHabitName.trim() || loading) &&
                    (e.currentTarget.style.backgroundColor = "#005ecb")
                  }
                  onMouseLeave={(e) =>
                    !(!newHabitName.trim() || loading) &&
                    (e.currentTarget.style.backgroundColor = "#0072ff")
                  }
                >
                  أضف
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
