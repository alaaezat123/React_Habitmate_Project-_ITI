import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      className="p-4 glass-card w-100"
      style={{ maxWidth: "440px", borderRadius: "20px" }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-live="polite"
    >
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <i className="bi bi-envelope-fill"></i>
        </span>
        <input
          type="email"
          className="form-control form-control-lg"
          placeholder="Enter your email"
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
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-lg w-100"
        style={{
          background: "linear-gradient(to right, #007bff, #00c6ff)",
          border: "none",
          fontWeight: 600,
          borderRadius: "12px",
        }}
        disabled={loading}
      >
        <i className="bi bi-box-arrow-in-right me-2"></i>{" "}
        {loading ? "Logging in..." : "Login"}
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
    </motion.form>
  );
}

export default LoginForm;
