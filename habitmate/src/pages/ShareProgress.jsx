import React, { useState, useEffect, useRef } from "react";

export default function ShareProgress() {
  const MAX_CHARS = 280;

  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shared, setShared] = useState(false);
  const textareaRef = useRef(null);
  const [currentMotivation, setCurrentMotivation] = useState(0);

  // Data for the motivational hero section
  const motivationalContent = [
    {
      image: "src/assets/Healthy habit-cuate.svg",
      quote: "Transform your habits, transform your life.",
      subQuote: "Consistency is the key to unlocking your full potential.",
      bgColor: "linear-gradient(135deg, #e0f7fa 0%, #a7d9f7 100%)", // Gradient Cyan to light blue
      quoteColor: "#004d40", // Dark Teal
    },
    {
      image: "src/assets/Mental health-pana.svg",
      quote: "Cultivate inner peace, empower your mind.",
      subQuote: "Your well-being is a journey, not a destination.",
      bgColor: "linear-gradient(135deg, #e8f5e9 0%, #b2dfdb 100%)", // Gradient Green to light teal
      quoteColor: "#1b5e20", // Dark Green
    },
    {
      image: "src/assets/International Day of families-pana.svg",
      quote: "Grow stronger together, one shared step at a time.",
      subQuote: "Connection fuels progress and lasting happiness.",
      bgColor: "linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)", // Gradient Orange to light orange
      quoteColor: "#e65100", // Dark Orange
    },
  ];

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Cycle through motivational content every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivation(
        (prevIndex) => (prevIndex + 1) % motivationalContent.length
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [motivationalContent.length]);

  // Open confirmation modal
  const openModal = () => {
    if (message.trim().length === 0) {
      alert("Please write something motivational before sharing.");
      return;
    }
    setModalOpen(true);
  };

  // Simulate sharing and show thank you message
  const confirmShare = () => {
    setModalOpen(false);
    setIsSharing(true);

    setTimeout(() => {
      setIsSharing(false);
      setShared(true);
      setMessage("");
      setTimeout(() => setShared(false), 5000);
    }, 2000);
  };

  // Support Ctrl+Enter for direct sharing
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      openModal();
    }
  };

  // Close modal
  const closeModal = () => setModalOpen(false);

  const currentContent = motivationalContent[currentMotivation];

  return (
    <div style={globalStyles.appContainer}>
      {/* Hero Motivation Board - Full-width and prominent */}
      <section
        style={{
          ...styles.heroBoard,
          background: currentContent.bgColor, // Dynamic gradient background
        }}
      >
        <div style={styles.heroContentWrapper}>
          <div style={styles.heroImageContainer}>
            <img
              src={currentContent.image}
              alt="Motivational illustration"
              style={styles.heroImage}
            />
          </div>
          <div style={styles.heroQuoteContainer}>
            <p style={{ ...styles.heroQuote, color: currentContent.quoteColor }}>
              "{currentContent.quote}"
            </p>
            <p style={styles.heroSubQuote}>{currentContent.subQuote}</p>
          </div>
        </div>
      </section>

      {/* Main content container - Share Progress card */}
      <main style={styles.container}>
        <h1 style={styles.title}>Share Your Progress</h1>

        <textarea
          ref={textareaRef}
          maxLength={MAX_CHARS}
          placeholder="What amazing progress have you made today? Share your journey and inspire others!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.textArea}
          aria-label="Progress message"
          disabled={isSharing}
        />
        <div style={styles.infoRow}>
          <span style={{ color: message.length > MAX_CHARS ? "#d32f2f" : "#555" }}>
            {MAX_CHARS - message.length} characters left
          </span>

          <button
            onClick={openModal}
            style={{
              ...styles.shareButton,
              cursor: message.trim() && !isSharing ? "pointer" : "not-allowed",
              backgroundColor: message.trim() && !isSharing ? "#e91e63" : "#f48fb1",
            }}
            disabled={!message.trim() || isSharing}
            aria-busy={isSharing}
            aria-live="polite"
          >
            {isSharing ? "Sharing..." : shared ? "Shared ✅" : "Share Now"}
          </button>
        </div>

        {/* Thank you message below the button */}
        {shared && !isSharing && (
          <p style={styles.thanksMessage}>Thanks for sharing! Keep inspiring others!</p>
        )}

        {/* Share confirmation modal */}
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            style={styles.modalOverlay}
          >
            <div style={styles.modal}>
              <h2 id="modalTitle" style={{ marginBottom: 20 }}>
                Confirm Your Share
              </h2>
              <p style={{ marginBottom: 30 }}>
                Are you sure you want to share this message with the community?
              </p>
              <div style={styles.modalButtons}>
                <button
                  onClick={confirmShare}
                  style={{ ...styles.modalButton, backgroundColor: "#4caf50" }}
                >
                  Yes, Share
                </button>
                <button
                  onClick={closeModal}
                  style={{ ...styles.modalButton, backgroundColor: "#e0e0e0", color: "#333" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Global styles applied to the app container to achieve full-width background
const globalStyles = {
  appContainer: {
    minHeight: "100vh", // Ensures it takes full viewport height
    width: "100%",
    backgroundColor: "#f0f2f5", // Fallback background color
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2d3748",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content horizontally
    paddingBottom: "4rem", // Add padding at the bottom
  },
};

const styles = {
  // Hero Motivation Board Styles - truly full-width and impactful
  heroBoard: {
    width: "100%", // Full width of the appContainer
    padding: "6rem 0", // More generous vertical padding for grander feel
    marginBottom: "3.5rem", // More space below the hero section
    transition: "background 0.8s ease-in-out", // Smooth gradient transition
    display: "flex",
    justifyContent: "center", // Center content within the full-width section
    alignItems: "center",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)", // Softer, wider shadow for the full section
  },
  heroContentWrapper: {
    display: "flex",
    flexDirection: "row", // Horizontal layout for image and quote
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1100px", // Even wider content constraint for hero section
    width: "100%", // Take full width within max-width
    gap: "4rem", // More space between image and quote
    padding: "0 3rem", // Increased padding for content inside the hero section
    flexWrap: "wrap", // Allow wrapping on smaller screens
    textAlign: "left", // Default text alignment for hero content
  },
  heroImageContainer: {
    width: "280px", // Significantly larger image size
    height: "280px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.98)", // Almost opaque white background
    borderRadius: "50%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)", // Clearer, more pronounced shadow
    padding: "25px", // More padding
    flexShrink: 0,
    border: "4px solid rgba(255, 255, 255, 0.9)", // Thicker, prominent white border
    filter: "drop-shadow(0 0 0.75rem rgba(0,0,0,0.05))", // Subtle glow/drop shadow
  },
  heroImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  heroQuoteContainer: {
    flex: 1, // Allows quote container to take available space
    maxWidth: "700px", // Max width for quote text
    // textAlign: "left" set on wrapper for consistency
  },
  heroQuote: {
    fontSize: "4rem", // Grandest quote size
    fontWeight: "900", // Extra bold
    marginBottom: "1rem",
    lineHeight: "1.15",
    textShadow: "2px 2px 5px rgba(0,0,0,0.1)", // Stronger text shadow for impact
  },
  heroSubQuote: {
    fontSize: "1.7rem", // Larger sub-quote
    color: "#4a5568", // Slightly darker grey
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: "1.4",
  },
  // Main content container (Share Progress card)
  container: {
    maxWidth: 750, // Slightly wider for a more spacious feel
    width: "90%", // Responsive width
    backgroundColor: "#ffffff",
    padding: "3.5rem 4rem", // Generous padding
    borderRadius: "20px", // More rounded corners
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)", // Stronger, more elegant shadow
    textAlign: "center",
    // Adding subtle Neumorphism/Glassmorphism like feel
    // backdropFilter: "blur(10px)", // Requires a transparent background
    // background: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: "3.5rem", // Even larger title
    fontWeight: "800",
    marginBottom: "3rem", // More space
    color: "#e91e63",
    letterSpacing: "-1px", // Tighter letter spacing for a modern look
    textShadow: "1px 1px 2px rgba(0,0,0,0.05)",
  },
  textArea: {
    width: "100%",
    padding: 25, // Even more padding
    fontSize: "1.4rem", // Largest text size
    borderRadius: 20, // Very rounded
    border: "2px solid #e0e0e0", // Clean, light border
    resize: "vertical",
    boxShadow: "inset 0 4px 10px rgba(0, 0, 0, 0.06)", // Softer inner shadow
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    fontFamily: "inherit",
    outline: "none",
    "&:focus": {
      borderColor: "#e91e63",
      boxShadow: "inset 0 4px 10px rgba(0, 0, 0, 0.06), 0 0 0 5px rgba(233, 30, 99, 0.18)", // Wider, slightly stronger glow
    },
    minHeight: 180, // Taller min-height
    backgroundColor: "#fefefe",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem", // More space
  },
  shareButton: {
    border: "none",
    padding: "1.3rem 4rem", // Largest button
    borderRadius: 50, // Fully rounded (pill shape)
    color: "#fff",
    fontWeight: "700",
    fontSize: "1.5rem", // Largest font
    background: "linear-gradient(45deg, #e91e63, #ff4081)", // Gradient background
    boxShadow: "0 12px 30px rgba(233, 30, 99, 0.6)", // Strongest shadow
    transition: "all 0.3s ease", // Smooth transition for all properties
    userSelect: "none",
    "&:hover": {
        transform: "translateY(-5px)", // More dramatic lift
        boxShadow: "0 20px 40px rgba(233, 30, 99, 0.8)", // Deeper shadow on hover
        background: "linear-gradient(45deg, #ff4081, #e91e63)", // Reverse gradient on hover
    },
    "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 8px 20px rgba(233, 30, 99, 0.4)",
    },
  },
  thanksMessage: {
    marginTop: 40, // More space
    fontSize: "1.4rem", // Largest
    fontStyle: "italic",
    color: "#28a745", // Stronger green for positive message
    fontWeight: "600",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.75)", // Very dark, highly immersive overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: 20,
    backdropFilter: "blur(8px)", // Strongest blur effect
  },
  modal: {
    backgroundColor: "#fff",
    padding: 45, // Most padding
    borderRadius: 25, // Most rounded modal
    maxWidth: 550, // Widest modal
    width: "100%",
    boxShadow: "0 25px 70px rgba(0,0,0,0.6)", // Strongest modal shadow
    textAlign: "center",
    border: "1px solid #eee",
    // Neumorphism/Glassmorphism inspired modal
    // background: "rgba(255, 255, 255, 0.85)",
    // backdropFilter: "blur(12px)",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "2.5rem", // Most space
  },
  modalButton: {
    border: "none",
    padding: "1.1rem 2.8rem", // Largest buttons
    borderRadius: 45, // Most rounded
    fontWeight: "700",
    fontSize: 20, // Largest font
    cursor: "pointer",
    userSelect: "none",
    transition: "all 0.3s ease",
    "&:hover": {
        transform: "translateY(-3px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
    },
    "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
  },
};