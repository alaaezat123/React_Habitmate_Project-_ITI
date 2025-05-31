import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Global Styles for Dark Theme ---
const globalStyles = `
  body {
    margin: 0;
    overflow: hidden;
    font-family: 'Arial', 'Helvetica', sans-serif;
    color: #fff;
    background-color: #121212;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .background-overlay-dots {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at top left, rgba(255,255,255,0.1) 1px, transparent 1px),
      radial-gradient(circle at bottom right, rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 100px 100px;
    opacity: 0.4;
    z-index: -1;
    animation: backgroundShift 150s linear infinite alternate;
  }

  @keyframes backgroundShift {
    0% { background-position: 0 0; }
    100% { background-position: 1500px 1500px; }
  }

  /* Button Press Effect */
  @keyframes button-press {
    0% { transform: scale(1); }
    50% { transform: scale(0.98); }
    100% { transform: scale(1); }
  }
`;

export default function Inspiration() {
  const inspirations = useMemo(() => [
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Your habits shape your future, one day at a time.", author: "Unknown" },
    { text: "Motivation gets you started; discipline keeps you going.", author: "Jim Rohn" },
    { text: "Small daily improvements lead to stunning results.", author: "James Clear" },
    { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  ], []);

  const gradientBackgrounds = useMemo(() => [
    "linear-gradient(135deg,rgb(60, 77, 153) 0%,rgb(98, 95, 136) 100%)", // Deep Purple Haze
    "linear-gradient(135deg,rgb(175, 125, 67) 0%,rgb(104, 100, 82) 100%)", // Sunset Glow
    "linear-gradient(135deg,rgb(2, 2, 2) 0%, #38ef7d 100%)", // Emerald Dream
    "linear-gradient(135deg,rgb(196, 66, 92) 0%,rgb(194, 181, 181) 100%)", // Pink & Blue Fusion
    "linear-gradient(135deg,rgb(63, 59, 57) 0%,rgb(87, 83, 84) 50%, #23d5ab 100%)", // Tri-Color Wave
    "linear-gradient(135deg,rgb(11, 21, 24) 0%, #0072ff 100%)", // Ocean Breeze
    "linear-gradient(135deg,rgb(105, 96, 112) 0%,rgb(66, 68, 75) 100%)", // Violet Depth
  ], []);

  const [index, setIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);

    return () => document.head.removeChild(styleSheet);
  }, []);

  const changeQuote = useCallback(
    (newIndex) => {
      setIndex(newIndex);
      setBgIndex(newIndex % gradientBackgrounds.length);
      setCopied(false);
    },
    [gradientBackgrounds.length]
  );

  const nextQuote = () => changeQuote((index + 1) % inspirations.length);
  const prevQuote = () => changeQuote((index - 1 + inspirations.length) % inspirations.length);

  const shuffleQuote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * inspirations.length);
    } while (randomIndex === index);
    changeQuote(randomIndex);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(`“${inspirations[index].text}” — ${inspirations[index].author}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(err => {
      console.error("Failed to copy text:", err);
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextQuote();
      else if (e.key === "ArrowLeft") prevQuote();
      else if (e.key === "c" && e.ctrlKey) copyQuote();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, nextQuote, prevQuote, copyQuote]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        ...styles.container,
        background: gradientBackgrounds[bgIndex],
      }}
      aria-live="polite"
    >
      <div className="background-overlay-dots"></div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.title}
      >
        Daily Dose of Inspiration
      </motion.h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, rotateX: -20, scale: 0.8 }}
          transition={{ duration: 1.1, ease: [0.6, 0.05, 0.01, 0.9] }}
          style={styles.quoteCard}
        >
          <motion.blockquote
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            style={styles.quoteText}
            aria-label={`Inspiring quote: ${inspirations[index].text}`}
          >
            “{inspirations[index].text}”
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            style={styles.author}
          >
            — {inspirations[index].author}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <div style={styles.controls}>
        <motion.button
          onClick={prevQuote}
          aria-label="Previous Quote"
          {...buttonProps}
        >
          <span className="icon">←</span> Previous
        </motion.button>
        <motion.button
          onClick={copyQuote}
          aria-label="Copy Quote to Clipboard"
          {...buttonProps}
          style={{
            ...buttonProps.style,
            color: copied ? "#23d5ab" : "#fff",
            backgroundColor: copied ? "rgba(35, 213, 171, 0.2)" : "rgba(255,255,255,0.1)",
            borderColor: copied ? "#23d5ab" : "rgba(255,255,255,0.3)",
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </motion.button>
        <motion.button
          onClick={shuffleQuote}
          aria-label="Random Quote"
          {...buttonProps}
        >
          <span className="icon">🔀</span> Shuffle
        </motion.button>
        <motion.button
          onClick={nextQuote}
          aria-label="Next Quote"
          {...buttonProps}
        >
          Next <span className="icon">→</span>
        </motion.button>
      </div>

      <footer style={styles.footer}>
        {inspirations.map((_, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i === index ? 1.5 : 1,
              opacity: i === index ? 1 : 0.5,
              backgroundColor: i === index ? "#fff" : "rgb(252, 251, 251)",
            }}
            transition={{ duration: 0.4 }}
            style={styles.dot}
            aria-hidden="true"
            onClick={() => changeQuote(i)}
          />
        ))}
      </footer>
    </motion.main>
  );
}

const buttonProps = {
  whileHover: { scale: 1.05, boxShadow: "0 8px 25px rgba(9, 119, 245, 0.86)" },
  whileTap: { scale: 0.95, boxShadow: "0 3px 10px rgba(0,0,0,0.1)" },
  transition: { type: "spring", stiffness: 400, damping: 25 },
  style: {
    background: "rgba(15, 15, 15, 0.97)",
    border: "1px solid rgba(29, 27, 27, 0.93)",
    borderRadius: 50,
    padding: "0.85rem 2.2rem",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.15rem",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.83)",
    userSelect: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "4rem 2rem",
    position: "relative",
    overflow: "hidden",
    transition: "background 1s ease-in-out",
  },
  title: {
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    fontWeight: "900",
    marginBottom: "3.5rem",
    textShadow: "0 6px 30px rgba(0, 0, 0, 0.88), 0 0 15px rgba(126, 121, 121, 0.9)",
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    textAlign: "center",
  },
  quoteCard: {
    maxWidth: 750,
    width: "100%",
    padding: "3rem 2.5rem",
    borderRadius: 25,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(15px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 25px 80px rgba(9, 74, 160, 0.81), inset 0 0 60px rgba(255,255,255,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "250px",
  },
  quoteText: {
    fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
    fontWeight: "600",
    fontStyle: "italic",
    lineHeight: 1.5,
    margin: 0,
    userSelect: "text",
    textShadow: "0 3px 10px rgba(5, 156, 38, 0.88)",
    color: "#fff",
  },
  author: {
    fontSize: "1.2rem",
    fontWeight: "400",
    marginTop: "1.5rem",
    opacity: 0.8,
    fontStyle: "normal",
    color: "rgba(252, 248, 248, 0.9)",
    letterSpacing: "0.05em",
  },
  controls: {
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  footer: {
    marginTop: 60,
    display: "flex",
    justifyContent: "center",
    gap: 15,
    alignItems: "center",
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "inline-block",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.3)",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  },
};
