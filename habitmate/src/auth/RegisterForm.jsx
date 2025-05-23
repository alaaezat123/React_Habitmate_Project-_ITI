import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion } from "framer-motion";

function RegisterForm({ onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });

      setSuccessMsg("Account created successfully! Please log in.");
      setLoading(false);

      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Registration failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleRegister}
      className="p-4 glass-card w-100"
      style={{ maxWidth: "480px", borderRadius: "20px" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-live="polite"
    >
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <i className="bi bi-person-fill"></i>
        </span>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
          autoComplete="name"
        />
      </div>

      <div className="mb-3 input-group">
        <span className="input-group-text">
          <i className="bi bi-envelope-fill"></i>
        </span>
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />
      </div>

      <div className="mb-3 input-group">
        <span className="input-group-text">
          <i className="bi bi-lock-fill"></i>
        </span>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      <div className="mb-3 input-group">
        <span className="input-group-text">
          <i className="bi bi-shield-lock-fill"></i>
        </span>
        <input
          type="password"
          className="form-control form-control-lg"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-lg w-100"
        style={{
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "#fff",
          fontWeight: "600",
          border: "none",
          borderRadius: "12px",
        }}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="bi bi-arrow-repeat me-2 spinning"></i> Registering...
          </>
        ) : (
          <>
            <i className="bi bi-person-plus-fill me-2"></i> Register Now
          </>
        )}
      </button>

      {error && (
        <motion.div
          className="alert alert-danger text-center mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
        >
          {error}
        </motion.div>
      )}

      {successMsg && (
        <motion.div
          className="alert alert-success text-center mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          role="alert"
        >
          {successMsg}
        </motion.div>
      )}

      <style>{`
        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.form>
  );
}

export default RegisterForm;
