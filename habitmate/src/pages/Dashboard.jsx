import React, { useState, useEffect } from "react";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  // قيم افتراضية، قم بتعديلها بناءً على بياناتك
  const [totalHabits, setTotalHabits] = useState(12);
  const [completedToday, setCompletedToday] = useState(8);
  const [currentStreak, setCurrentStreak] = useState(5);

  // إضافة تأثيرات لتحميل البيانات
  useEffect(() => {
    // محاكاة تحميل بيانات
    // يمكن استبدال ذلك بخدمات أو API لجلب البيانات الحقيقية
  }, []);

  return (
    <main style={{ maxWidth: 900, margin: "2rem auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Dashboard</h1>
      <p>View your habit progress and statistics to stay motivated.</p>

      <section style={{ marginTop: 30 }}>
        <StatsChart />
      </section>

      {/* Add summary cards or quick stats here */}
      <section style={{ display: "flex", gap: 20, marginTop: 40 }}>
        <div style={{ flex: 1, background: "#e6f0ff", padding: 20, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3>Total Habits</h3>
          <p style={{ fontSize: 24, fontWeight: "700" }}>{totalHabits}</p>
        </div>
        <div style={{ flex: 1, background: "#d1e7dd", padding: 20, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3>Completed Today</h3>
          <p style={{ fontSize: 24, fontWeight: "700" }}>{completedToday}</p>
        </div>
        <div style={{ flex: 1, background: "#ffe5d9", padding: 20, borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3>Current Streak</h3>
          <p style={{ fontSize: 24, fontWeight: "700" }}>{currentStreak} days</p>
        </div>
      </section>
    </main>
  );
}
