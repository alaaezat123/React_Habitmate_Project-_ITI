import React from "react";
import { motion } from "framer-motion";

export default function ConfirmDeleteModal({ habitName, onCancel, onConfirm }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1600,
        padding: 20,
      }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.25 }}
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: "2rem",
          maxWidth: 360,
          width: "100%",
          textAlign: "center",
          userSelect: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ marginBottom: 24, fontSize: 18 }}>
          Are you sure you want to delete <strong>{habitName}</strong>?
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
          <button
            onClick={onCancel}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: 10,
              border: "1px solid #ccc",
              backgroundColor: "#eee",
              cursor: "pointer",
              fontWeight: "600",
              minWidth: 100,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "0.5rem 1.5rem",
              borderRadius: 10,
              border: "none",
              backgroundColor: "#d32f2f",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              minWidth: 100,
            }}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
