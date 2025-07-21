import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// קריאת טקסט בקול
const speakText = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

// השמעת צליל קליק
const playClickSound = () => {
  const audio = new Audio("/sounds/mouse-click.mp3");
  audio.play();
};

export default function ItemSlider({ items = [], itemIcons = {}, letters = false }) {
  const isLettersMode = letters || items.length === 0;
  const content = isLettersMode ? defaultAlphabet : items;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const current = content[index];

  const goPrev = () => {
    playClickSound();
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? content.length - 1 : prev - 1));
  };

  const goNext = () => {
    playClickSound();
    setDirection(1);
    setIndex((prev) => (prev + 1) % content.length);
  };

  useEffect(() => {
    speakText(current);
  }, [current]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100 py-12 px-4">
      <motion.h2
        className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 mb-12"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.2, 1] }}
        transition={{ duration: 1 }}
      >
        {isLettersMode ? "🔤 Scroll Through the Alphabet 🔤" : "🍽 Scroll Through the Items 🍽"}
      </motion.h2>

      <div className="relative max-w-xl mx-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 flex items-center justify-between space-x-4 overflow-hidden">
        {/* Left button */}
        <motion.button
          onClick={goPrev}
          whileTap={{ scale: 0.85, rotate: -15 }}
          className="text-gray-600 hover:text-black transition z-10"
        >
          <ChevronLeft size={38} />
        </motion.button>

        {/* Carousel content */}
        <div className="w-full h-60 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={current}
              className="absolute flex flex-col items-center text-center"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="text-7xl mb-3">
                {itemIcons[current] || (isLettersMode ? "" : "❓")}
              </div>
              <div className="text-5xl font-extrabold text-indigo-700">{current}</div>
              {isLettersMode && (
                <div className="text-2xl mt-2 text-gray-600 italic">{current.toLowerCase()}</div>
              )}
              <motion.button
                onClick={() => {
                  playClickSound();
                  speakText(current);
                }}
                whileTap={{ scale: 0.9 }}
                className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
              >
                <Volume2 size={22} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right button */}
        <motion.button
          onClick={goNext}
          whileTap={{ scale: 0.85, rotate: 15 }}
          className="text-gray-600 hover:text-black transition z-10"
        >
          <ChevronRight size={38} />
        </motion.button>
      </div>
    </div>
  );
}
