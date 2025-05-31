import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// --- Import Illustrations ---
import noSugarIllustration from "../assets/Boost your immune system-amico.svg"; 
import readingIllustration from "../assets/Morning essential-rafiki.png"; 
import meditationIllustration from "../assets/Mental health-bro.svg"; 
import hydrationIllustration from "../assets/boost-immune.svg"; 
import journalingIllustration from "../assets/Healthy habit-cuate.png"; 

// Challenge data with unique colors and relevant illustrations
const innovativeChallenges = [
  {
    id: 1,
    title: "7-Day Sugar Detox",
    tagline: "Reclaim your energy & clarity.",
    description: "Eliminate all added sugars for 7 days to reset your palate and boost your well-being.",
    reward: "Unlock 'Sweet Freedom' badge & a curated guide to sugar-free living!",
    color: "#FF6B6B", // Calming Red
    illustration: noSugarIllustration,
  },
  {
    id: 2,
    title: "Mindful Reader's Quest",
    tagline: "Expand your mind, one page at a time.",
    description: "Immerse yourself in literature for 30 minutes daily. Explore new perspectives and knowledge.",
    reward: "Gain access to exclusive 'Literary Luminary' collection & author interviews!",
    color: "#4ECDC4", // Calming Teal
    illustration: readingIllustration,
  },
  {
    id: 3,
    title: "14-Day Zen Start",
    tagline: "Cultivate inner peace every morning.",
    description: "Begin your day with 10 minutes of guided meditation. Reduce stress and enhance focus.",
    reward: "Achieve 'Inner Zen' mastery & unlock premium guided meditation tracks!",
    color: "#C490D1", // Serene Purple
    illustration: meditationIllustration,
  },
  {
    id: 4,
    title: "Hydration Mastery",
    tagline: "Fuel your body, elevate your performance.",
    description: "Commit to drinking 8 glasses of water daily for a week. Experience improved vitality.",
    reward: "Earn 'Aqua Champion' title & a personalized hydration tracking dashboard!",
    color: "#47B5ED", // Refreshing Blue
    illustration: hydrationIllustration,
  },
  {
    id: 5,
    title: "Daily Reflection Ritual",
    tagline: "Unpack your thoughts, unlock insights.",
    description: "Dedicate 15 minutes each day to journaling. Process emotions and track your growth.",
    reward: "Receive 'Insight Architect' badge & prompts for deeper self-discovery!",
    color: "#F7C325", // Gentle Gold
    illustration: journalingIllustration,
  },
];

// Custom hook to manage challenge state with localStorage
function useChallenges(initialChallenges) {
  const [joinedChallenges, setJoinedChallenges] = useState(() => {
    try {
      const stored = localStorage.getItem("joinedChallenges");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load joined challenges from localStorage", error);
      return [];
    }
  });
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("joinedChallenges", JSON.stringify(joinedChallenges));
    } catch (error) {
      console.error("Failed to save joined challenges to localStorage", error);
    }
  }, [joinedChallenges]);

  const joinChallenge = (id, challengeTitle) => {
    if (joinedChallenges.includes(id)) return;
    setLoadingId(id);

    setTimeout(() => {
      setJoinedChallenges((prev) => [...prev, id]);
      setLoadingId(null);
      toast.success(` You've successfully joined "${challengeTitle}"!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 1500); // Slightly longer delay for a more noticeable loading state
  };

  return { joinedChallenges, joinChallenge, loadingId };
}

export default function Challenges() {
  const { joinedChallenges, joinChallenge, loadingId } = useChallenges(innovativeChallenges);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          overflow-x: hidden;
          background: linear-gradient(135deg,rgb(219, 227, 233),rgb(195, 203, 211));
          font-family: 'Inter', 'Poppins', sans-serif;
          color: #333;
          line-height: 1.6;
        }

        .animated-background-effect {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at top left, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(circle at bottom right, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 120px 120px;
          opacity: 0.5;
          z-index: -1;
          animation: backgroundShift 200s linear infinite alternate;
        }

        @keyframes backgroundShift {
          0% { background-position: 0 0; }
          100% { background-position: 2000px 2000px; }
        }

        .page-header-title {
          font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(45deg,rgb(21, 79, 196),rgb(158, 56, 25));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 12px 25px rgba(0, 114, 255, 0.1);
          letter-spacing: -0.03em;
          line-height: 1.05;
        }

        .challenge-card {
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease-out;
          border: 1px solid rgba(15, 15, 15, 0.41);
          backdrop-filter: blur(6px);
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .challenge-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 30px 80px rgba(0, 114, 255, 0.2);
        }

        .join-button {
          padding: 1.1rem 3.5rem;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 50px;
          background-color:rgb(129, 93, 26);
          color: #fff;
          border: none;
          transition: all 0.3s ease-out;
          cursor: pointer;
          position: relative;
        }

        .join-button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 18px 45px rgb(0, 115, 255);
        }

        .join-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background-color: #aaa;
        }

        .spinner {
          border: 5px solid rgba(61, 58, 58, 0.4);
          border-top: 5px solid #fff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          .page-header-title {
            font-size: clamp(2.5rem, 7vw, 5rem);
            margin-bottom: 3.5rem;
          }

          .challenge-list-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .page-header-title {
            font-size: clamp(2rem, 9vw, 4rem);
            margin-bottom: 2rem;
          }

          .challenge-list-grid {
            grid-template-columns: 1fr;
            padding: 0 1.5rem;
            gap: 30px;
          }

          .join-button {
            font-size: 1.2rem;
            padding: 1rem 3rem;
          }
        }
      `}</style>

      <div className="animated-background-effect"></div>
      <ToastContainer /> 

      <main style={{ maxWidth: '1200px', margin: 'auto', textAlign: 'center' }}>
        <motion.h1
          className="page-header-title"
          initial={{ opacity: 0, y: -80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          Embark on Your Growth Journey!
        </motion.h1>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          <AnimatePresence>
            {innovativeChallenges.map(({ id, title, tagline, description, reward, color, illustration }) => {
              const isJoined = joinedChallenges.includes(id);
              const isLoading = loadingId === id;

              return (
                <motion.article
                  key={id}
                  className="challenge-card"
                  style={{ borderTop: `8px solid ${color}` }}
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -70, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: id * 0.15 }}
                >
                  <div style={{ padding: '35px', textAlign: 'center' }}>
                    {illustration && (
                      <motion.img
                        src={illustration}
                        alt={title}
                        style={{ width: '100%', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
                      />
                    )}
                    <motion.h2
                      style={{ fontSize: '1.8rem', color }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      {title}
                    </motion.h2>
                    <motion.p
                      style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#6a6a6a' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {tagline}
                    </motion.p>
                    <p style={{ fontSize: '1rem', marginBottom: '15px' }}>{description}</p>
                    <motion.p
                      style={{ fontSize: '1.1rem', color }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45, duration: 0.5 }}
                    >
                      {reward}
                    </motion.p>

                    <motion.button
                      className="join-button"
                      onClick={() => !isJoined && !isLoading && joinChallenge(id, title)}
                      disabled={isJoined || isLoading}
                    >
                      {isLoading ? (
                        <div className="spinner"></div>
                      ) : isJoined ? (
                        "Joined Successfully! "
                      ) : (
                        "Join Challenge"
                      )}
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}
