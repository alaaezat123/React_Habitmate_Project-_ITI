import { useState } from "react";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import illustration from "../assets/Fitz - Meditating at Home.png";
import { motion, AnimatePresence } from "framer-motion";

const containerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundSize: "600% 600%",
  animation: "bgAnimation 20s ease infinite",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  padding: "1rem",
  overflow: "hidden",
};

const cardStyle = {
  display: "flex",
  flexDirection: "row",
  width: "90vw",
  maxWidth: 1100,
  minHeight: "80vh",
  borderRadius: "25px",
  overflow: "hidden",
  background: "rgba(255, 255, 255, 0.18)",
  boxShadow: "0 35px 60px rgba(0, 153, 255, 0.75)",
  backdropFilter: "blur(25px)",
  color: "#fff",
  userSelect: "none",
};

const leftSideStyle = {
  flex: 1,
  background: "rgba(20, 12, 126, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 3rem",
  textAlign: "center",
};

const rightSideStyle = {
  flex: 1,
  background: "rgba(191, 213, 226, 0.95)",
  padding: "3rem 4rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "0 25px 25px 0",
  color: "#222",
  boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0)",
  position: "relative",
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <style>{`
        @keyframes bgAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg {
          background: linear-gradient(270deg,rgb(24, 135, 150),rgb(236, 196, 14),rgb(3, 3, 43),rgb(26, 224, 250),rgb(2, 14, 187),rgb(209, 130, 205));
          background-size: 600% 600%;
          animation: bgAnimation 20s ease infinite;
        }
        button.custom-toggle {
          background: transparent;
          border: none;
          color:rgb(0, 112, 187);
          font-weight: 700;
          cursor: pointer;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }
        button.custom-toggle:hover {
          color:rgb(40, 5, 168);
          text-shadow: 0 0 8px rgb(0, 189, 247);
        }
        h1.gradient-text {
          font-weight: 900;
          font-size: 3rem;
          background: linear-gradient(45deg,rgb(63, 210, 255),rgb(255, 255, 255));
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
        p.intro-text {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgb(250, 250, 250);
          margin-top: 1rem;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
          user-select: text;
        }
        @media (max-width: 900px) {
          .card-container {
            flex-direction: column;
            min-height: auto;
            border-radius: 20px;
          }
          .left-side, .right-side {
            border-radius: 0;
          }
          .right-side {
            border-radius: 0 0 20px 20px;
          }
        }
      `}</style>

      <div className="gradient-bg" style={containerStyle}>
        <motion.div
          className="card-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={cardStyle}
        >
          <div className="left-side" style={leftSideStyle}>
            <motion.img
              src={illustration}
              alt="Meditation Illustration"
              style={{
                maxWidth: "320px",
                marginBottom: "2.5rem",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgb(0, 255, 234)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />
            <motion.h1
              className="gradient-text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Shape Your Future with HabitMate
            </motion.h1>
            <motion.p
              className="intro-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              HabitMate helps you build meaningful habits, boost productivity,
              and unlock your full potential. One habit at a time.
            </motion.p>
          </div>

          <div className="right-side" style={rightSideStyle}>
            <h2
              style={{
                fontWeight: "700",
                fontSize: "2rem",
                marginBottom: "2rem",
                color: "#222",
              }}
            >
              {isLogin ? "Welcome Back" : "Create Your Account"}
            </h2>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  style={{ maxWidth: "440px", margin: "0 auto", width: "100%" }}
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  style={{ maxWidth: "440px", margin: "0 auto", width: "100%" }}
                >
                  <RegisterForm onSuccess={() => setIsLogin(true)} />
                </motion.div>
              )}
            </AnimatePresence>

            <p
              style={{
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "1rem",
                color: "#555",
              }}
            >
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button onClick={toggleForm} className="custom-toggle">
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
