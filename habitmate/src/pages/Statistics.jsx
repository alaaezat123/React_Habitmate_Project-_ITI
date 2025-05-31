import React from "react";

const sampleStats = {
  habitsCompletedToday: 5,
  totalHabits: 8,
  longestStreak: 12,
  totalDaysTracked: 45,
};

export default function Statistics() {
  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Your Statistics</h1>
      <section style={styles.statsGrid}>
        <StatCard label="Habits Completed Today" value={sampleStats.habitsCompletedToday} />
        <StatCard label="Total Habits" value={sampleStats.totalHabits} />
        <StatCard label="Longest Streak" value={`${sampleStats.longestStreak} days`} />
        <StatCard label="Days Tracked" value={sampleStats.totalDaysTracked} />
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statValue}>{value}</p>
      <p style={styles.statLabel}>{label}</p>
    </div>
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 24,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  statValue: {
    fontSize: "3rem",
    fontWeight: "900",
    margin: 0,
    color: "#0072ff",
  },
  statLabel: {
    marginTop: 12,
    fontWeight: "700",
    fontSize: "1.25rem",
  },
};
