import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { FiCheckCircle, FiCircle, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const suggestedHabits = [
  { name: "Meditation", icon: "🧘‍♂️" },
  { name: "Reading", icon: "📚" },
  { name: "Exercise", icon: "🏃‍♀️" },
  { name: "Drink Water", icon: "💧" },
  { name: "Sleep Early", icon: "😴" },
];

export default function Home() {
  const [userHabits, setUserHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // جلب عادات المستخدم من Firestore realtime
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) setUserHabits(docSnap.data().habits || []);
      else setUserHabits([]);
    });

    return () => unsub();
  }, []);

  // إضافة عادة من العادات المقترحة
  const addSuggestedHabit = async (habitName) => {
    if (userHabits.some((h) => h.name === habitName)) return; // منع التكرار

    const newHabit = { name: habitName, done: false };
    const updatedHabits = [...userHabits, newHabit];
    setUserHabits(updatedHabits);

    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    await updateDoc(doc(db, "users", user.uid), { habits: updatedHabits });
    setLoading(false);
  };

  // إضافة عادة جديدة يكتبها المستخدم
  const addNewHabit = async () => {
    if (!newHabitName.trim()) return;

    if (userHabits.some((h) => h.name.toLowerCase() === newHabitName.trim().toLowerCase())) {
      alert("هذه العادة موجودة بالفعل");
      return;
    }

    const newHabit = { name: newHabitName.trim(), done: false };
    const updatedHabits = [...userHabits, newHabit];
    setUserHabits(updatedHabits);

    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    await updateDoc(doc(db, "users", user.uid), { habits: updatedHabits });
    setLoading(false);
    setNewHabitName("");
    setShowAddModal(false);
  };

  // تبديل حالة "مكتملة" للعادات
  const toggleDone = async (idx) => {
    const updatedHabits = [...userHabits];
    updatedHabits[idx].done = !updatedHabits[idx].done;
    setUserHabits(updatedHabits);

    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    await updateDoc(doc(db, "users", user.uid), { habits: updatedHabits });
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#222" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>عاداتك</h1>

      {/* العادات المقترحة */}
      <section style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 12 }}>عادات مقترحة</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {suggestedHabits.map(({ name, icon }) => (
            <button
              key={name}
              disabled={userHabits.some((h) => h.name === name) || loading}
              onClick={() => addSuggestedHabit(name)}
              style={{
                padding: "8px 14px",
                borderRadius: 12,
                border: "none",
                cursor: userHabits.some((h) => h.name === name) ? "not-allowed" : "pointer",
                backgroundColor: userHabits.some((h) => h.name === name) ? "#ccc" : "#0072ff",
                color: "#fff",
                fontWeight: "600",
                fontSize: 16,
                userSelect: "none",
              }}
              aria-label={`أضف عادة ${name}`}
            >
              <span style={{ marginRight: 6 }}>{icon}</span> {name}
            </button>
          ))}
        </div>
      </section>

      {/* عادات المستخدم */}
      <section>
        <h2 style={{ marginBottom: 12 }}>عاداتي</h2>
        {userHabits.length === 0 && <p style={{ fontStyle: "italic" }}>لم تضف أي عادة بعد.</p>}

        <div style={{ display: "grid", gap: 14 }}>
          {userHabits.map((habit, idx) => (
            <motion.div
              key={habit.name}
              layout
              whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(0,114,255,0.25)" }}
              style={{
                background: habit.done ? "#d1e7dd" : "#f8f9fa",
                borderRadius: 16,
                padding: 20,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: habit.done ? "0 6px 15px rgba(56,142,60,0.4)" : "0 3px 8px rgba(0,0,0,0.05)",
                userSelect: "none",
              }}
              onClick={() => toggleDone(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleDone(idx);
              }}
              aria-pressed={habit.done}
              aria-label={`${habit.name} ${habit.done ? "مكتملة" : "غير مكتملة"}`}
            >
              <span style={{ fontSize: 18, fontWeight: habit.done ? "700" : "600", color: habit.done ? "#2e7d32" : "#1a237e", textDecoration: habit.done ? "line-through" : "none" }}>
                {habit.name}
              </span>
              {habit.done ? (
                <FiCheckCircle size={26} color="#2e7d32" />
              ) : (
                <FiCircle size={26} color="#1a237e" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* زر إضافة عادة جديدة */}
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

      {/* مودال إضافة عادة جديدة */}
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
              <h2 style={{ marginBottom: 20, fontWeight: 700, color: "#222" }}>أضف عادة جديدة</h2>
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
                    addNewHabit();
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
                  onClick={addNewHabit}
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
                  onMouseEnter={(e) => !(!newHabitName.trim() || loading) && (e.currentTarget.style.backgroundColor = "#005ecb")}
                  onMouseLeave={(e) => !(!newHabitName.trim() || loading) && (e.currentTarget.style.backgroundColor = "#0072ff")}
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
