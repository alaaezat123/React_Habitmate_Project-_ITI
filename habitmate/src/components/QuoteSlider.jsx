import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSun } from "react-icons/fi"; // أيقونة الشمس
import { FaTrophy } from "react-icons/fa"; // أيقونة الكأس

const motivationQuotes = [
  "Small habits make a big difference.",
  "Start today, don’t postpone until tomorrow.",
  "Consistency is the key to success.",
  "Every day is a new opportunity.",
  "Change begins with a small step.",
];

export default function QuoteSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % motivationQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        padding: "2rem 3rem",
        background: "linear-gradient(45deg, #3A3D58, #40B7C0)",
        borderRadius: 25,
        boxShadow: "0 8px 30px rgba(10, 131, 230, 0.77)",
        color: "#fff",
        fontWeight: "700",
        fontSize: "1.5rem",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        userSelect: "none",
        minHeight: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column", // لعرض الأيقونة والنص بشكل عمودي
      }}
      aria-live="polite"
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          {/* إضافة الأيقونة التحفيزية */}
          {index % 2 === 0 ? (
            <FiSun style={{ color: "#FFD700" }} />
          ) : (
            <FaTrophy style={{ color: "#FFD700" }} />
          )}
        </div>
        <motion.p
          style={{
            margin: 0,
            textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          {motivationQuotes[index]}
        </motion.p>
      </motion.div>
    </div>
  );
}
