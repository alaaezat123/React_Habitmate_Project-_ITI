
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CustomHabitModal({ customHabitName, setCustomHabitName, onAdd, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(111, 198, 224, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1500,
        padding: 20,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          maxWidth: 400,
          width: "100%",
          padding: "2rem",
          boxShadow: "0 15px 50px rgba(78, 80, 77, 0.96)",
          position: "relative",
          userSelect: "none",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close custom habit modal"
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 26,
            color: "#666",
          }}
        >
          <FiX />
        </button>
        <h3 style={{ marginBottom: 24 }}>Add Custom Habit</h3>
        <input
          type="text"
          placeholder="Habit name..."
          value={customHabitName}
          onChange={(e) => setCustomHabitName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: 16,
            borderRadius: 10,
            border: "1.5px solid #ccc",
            outline: "none",
            marginBottom: 30,
          }}
          aria-label="Custom habit name"
        />
        <button
          onClick={onAdd}
          style={{
            backgroundColor: "#0072ff",
            border: "none",
            color: "white",
            fontWeight: "700",
            fontSize: 16,
            padding: "12px 24px",
            borderRadius: 25,
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0,114,255,0.6)",
          }}
          disabled={!customHabitName.trim()}
          aria-disabled={!customHabitName.trim()}
        >
          Add Habit
        </button>
      </motion.div>
    </motion.div>
  );
}
