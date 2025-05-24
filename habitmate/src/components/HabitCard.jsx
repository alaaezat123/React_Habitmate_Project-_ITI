
import { FiCheckCircle, FiCircle, FiTrash2, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function HabitCard({
  habit,
  onToggle,
  onDelete,
  isToggleMode = true,
  showDelete = true,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,114,255,0.25)" }}
      style={{
        background: habit.done ? "#d4edda" : "#f8f9fa",
        borderRadius: 20,
        boxShadow: habit.done
          ? "0 6px 15px rgba(4, 252, 62, 0.4)"
          : "0 3px 8px rgba(0,0,0,0.1)",
        maxWidth: 250,
        cursor: "pointer",
        userSelect: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      onClick={() => {
        if (isToggleMode && onToggle) onToggle();
        else if (!isToggleMode && onToggle) onToggle();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onToggle) onToggle();
      }}
      aria-pressed={habit.done}
      aria-label={`${habit.name} ${habit.done ? "completed" : "not completed"}`}
    >
      <img
        src={habit.imageUrl}
        alt={habit.name}
        style={{ width: "100%", height: 140, objectFit: "cover" }}
        loading="lazy"
      />
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        <h3
          style={{
            margin: 0,
            color: habit.done ? "#155724" : "#212529",
            fontWeight: "700",
            fontSize: "1.15rem",
          }}
        >
          {habit.name}
        </h3>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            aria-label={habit.done ? "Mark as incomplete" : "Mark as complete"}
            style={{
              background: habit.done ? "#28a745" : "#6c757d",
              border: "none",
              borderRadius: 25,
              color: "white",
              padding: "8px 16px",
              fontWeight: "600",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle && onToggle();
            }}
          >
            {habit.done ? <FiCheckCircle size={20} /> : <FiCircle size={20} />}{" "}
            {habit.done ? "Completed" : "Mark Complete"}
          </button>
          {showDelete && (
            <button
              aria-label="Delete habit"
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete();
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#dc3545",
                cursor: "pointer",
                fontSize: 20,
              }}
            >
              <FiTrash2 />
            </button>
          )}
          {!showDelete && !isToggleMode && (
            <FiPlus
              size={24}
              color="#0072ff"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle && onToggle();
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  onToggle && onToggle();
                }
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
