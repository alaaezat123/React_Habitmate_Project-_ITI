import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Your custom images and motivational text
const slides = [
  {
    image: "src/assets/boost-immune2.svg",
    text: "Take that first step. Every journey begins with a single step.",
  },
  {
    image: "src/assets/Skincare-bro.svg",
    text: "Believe in yourself — you have the power to create change.",
  },
  {
    image: "src/assets/Questions-cuate.svg",
    text: "Success is a journey, not a destination.",
  },
  {
    image: "src/assets/Thesis-pana.svg",
    text: "Dream big. Start small. Act now.",
  }
];

export default function MotivationalSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000); // Transition between slides every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100vh", // Makes the slider fill the screen
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Slide container with changing background image */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${slides[index].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out", // Smooth background image transition
        }}
        key={index}
        initial={{ scale: 1.1 }} // Zoom effect when the image appears
        animate={{ scale: 1 }}
        exit={{ scale: 1.1 }}
        transition={{ duration: 1 }}
      >
        {/* Text container with fade-in animation */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            fontSize: "2.2rem",
            fontWeight: "700",
            maxWidth: "80%",
            background: "rgba(0, 0, 0, 0.5)", // Dark overlay for better text contrast
            padding: "1rem",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)", // Added shadow for text contrast
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1 }}
        >
          <p>{slides[index].text}</p>
        </motion.div>
      </motion.div>

      {/* Navigation arrows */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={() => setIndex(index === 0 ? slides.length - 1 : index - 1)}
      >
        &#8592; {/* Left arrow */}
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={() => setIndex((index + 1) % slides.length)}
      >
        &#8594; {/* Right arrow */}
      </div>
    </div>
  );
}
