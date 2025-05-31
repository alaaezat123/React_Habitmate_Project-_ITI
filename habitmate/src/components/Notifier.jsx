import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notifier({ message, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={styles.container}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: 40,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#0072ff",
    color: "#fff",
    padding: "14px 24px",
    borderRadius: 32,
    boxShadow: "0 8px 20px rgba(0,114,255,0.6)",
    fontWeight: "700",
    fontSize: 16,
    userSelect: "none",
    zIndex: 2000,
    maxWidth: "80vw",
    textAlign: "center",
  },
};
