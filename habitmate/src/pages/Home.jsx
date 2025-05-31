import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiPlayCircle, FiTarget, FiShare2, FiSmile, FiSun, FiMoon } from "react-icons/fi";
import QuoteSlider from "../components/QuoteSlider";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25, when: "beforeChildren" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

export default function Home({ userName = "User" }) {
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("habitmate-darkmode");
    return stored ? JSON.parse(stored) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem("habitmate-darkmode", JSON.stringify(!prev));
      return !prev;
    });
  };

  const tips = [
    "Consistency is the key! Try adding a new habit this week.",
    "Reward yourself after a 7-day streak!",
    "Share your progress to stay motivated.",
    "Try a new habit today and track your success!",
    "Keep a journal of your daily habits for better insights.",
  ];

  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 7000);
    return () => clearInterval(tipInterval);
  }, []);

  const colors = {
    light: {
      background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      textPrimary: "#2d3748",
      textSecondary: "#4a5568",
      highlight: "#ff4081",
      cardBackground: "rgba(255, 255, 255, 0.85)",
      buttonBackground: "#ff4081",
      buttonShadow: "rgba(255, 64, 129, 0.5)",
    },
    dark: {
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      textPrimary: "#e2e8f0",
      textSecondary: "#94a3b8",
      highlight: "#f472b6",
      cardBackground: "rgba(30, 41, 59, 0.85)",
      buttonBackground: "#f472b6",
      buttonShadow: "rgba(244, 114, 182, 0.5)",
    },
  };

  const theme = darkMode ? colors.dark : colors.light;

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ ...styles.pageContainer, background: theme.background, color: theme.textPrimary }}
    >
      <motion.button
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        style={{
          ...styles.darkModeToggle,
          backgroundColor: theme.buttonBackground,
          boxShadow: `0 8px 20px ${theme.buttonShadow}`,
          color: darkMode ? "#1e293b" : "#fff",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
      </motion.button>

      <motion.section variants={itemVariants} style={{ ...styles.welcomeCard, backgroundColor: theme.cardBackground }} aria-live="polite">
        <h1 style={{ ...styles.greetingText, color: theme.textPrimary }}>
          {greeting}, <span style={{ ...styles.userName, color: theme.highlight }}>{userName}</span>!
        </h1>
        <p style={{ ...styles.subGreeting, color: theme.textSecondary }}>
          Ready to build some <span style={{ ...styles.highlight, color: theme.highlight }}>great habits</span> today?
        </p>
      </motion.section>

      <motion.section variants={itemVariants} style={{ ...styles.sliderWrapper, backgroundColor: theme.cardBackground }}>
        <QuoteSlider />
      </motion.section>

      <motion.section variants={itemVariants} style={styles.buttonsRow}>
        <ActionButton icon={<FiPlayCircle size={24} />} onClick={() => navigate("/habits")} theme={theme}>Start Habits</ActionButton>
        <ActionButton icon={<FiTarget size={24} />} onClick={() => navigate("/challenges")} theme={theme}>Today's Challenges</ActionButton>
        <ActionButton icon={<FiShare2 size={24} />} onClick={() => navigate("/share-progress")} theme={theme}>Share Progress</ActionButton>
        <ActionButton icon={<FiSmile size={24} />} onClick={() => navigate("/inspiration")} theme={theme}>Get Inspired</ActionButton>
      </motion.section>

      <AnimatePresence exitBeforeEnter>
        <motion.p
          key={tipIndex}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ ...styles.tipText, color: theme.textSecondary }}
        >
          {tips[tipIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.main>
  );
}

function ActionButton({ icon, children, onClick, theme }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, boxShadow: `0 10px 25px ${theme.buttonShadow}` }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{ ...styles.actionButton, backgroundColor: theme.buttonBackground, color: "#fff", boxShadow: `0 12px 30px ${theme.buttonShadow}` }}
      type="button"
    >
      {icon}
      <span style={{ marginLeft: 12 }}>{children}</span>
    </motion.button>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    width: "100vw",
    padding: "4rem 4vw",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
    overflowX: "hidden",
    position: "relative",
  },
  darkModeToggle: {
    position: "fixed",
    top: 24,
    right: 24,
    borderRadius: "50%",
    border: "none",
    padding: 14,
    cursor: "pointer",
    zIndex: 2000,
    outline: "none",
  },
  welcomeCard: {
    padding: "3rem 5rem",
    borderRadius: 36,
    boxShadow: "0 20px 70px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(16px)",
    textAlign: "center",
    maxWidth: 900,
    width: "90vw",
  },
  greetingText: {
    margin: 0,
    fontWeight: "900",
    fontSize: "4.5rem",
    lineHeight: 1.05,
    letterSpacing: "0.05em",
  },
  userName: {
    fontWeight: "900",
  },
  subGreeting: {
    marginTop: 18,
    fontSize: "1.75rem",
    fontWeight: "700",
  },
  highlight: {
    fontWeight: "900",
  },
  sliderWrapper: {
    width: "90vw",
    maxWidth: 960,
    borderRadius: 30,
    padding: "2rem 3rem",
    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(18px)",
  },
  buttonsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 28,
    width: "90vw",
    maxWidth: 960,
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,
    padding: "1.4rem 2.6rem",
    fontWeight: "900",
    fontSize: "1.3rem",
    cursor: "pointer",
    userSelect: "none",
    outline: "none",
    border: "none",
  },
  tipText: {
    fontSize: "1.4rem",
    fontStyle: "italic",
    textAlign: "center",
    maxWidth: 850,
    minHeight: "2rem",
    marginTop: 16,
  },
};
