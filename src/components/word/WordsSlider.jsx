import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../NavBar";

const speakText = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

const playClickSound = () => {
  const audio = new Audio("/sounds/mouse-click.mp3");
  audio.play();
};

export default function WordsSlider({ navLinks = [] }) {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Load words from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedWords") || "[]");
    setWords(stored);
  }, []);

  const current = words[index] || { en: "", he: "" };

  const goPrev = () => {
    if (words.length === 0) return;
    playClickSound();
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? words.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (words.length === 0) return;
    playClickSound();
    setDirection(1);
    setIndex((prev) => (prev + 1) % words.length);
  };

  useEffect(() => {
    if (current.en) {
      speakText(current.en);
    }
  }, [current.en]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [words]);

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
        Scroll Through Your Words
      </motion.h2>

      {words.length === 0 ? (
        <div className="text-center text-2xl text-gray-600">
          No words added yet. Add some words to start learning!
        </div>
      ) : (
        <div className="relative max-w-xl mx-auto bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-2xl p-8 flex items-center justify-between space-x-4 overflow-hidden">
          {/* Left button */}
          <motion.button
            onClick={goPrev}
            whileTap={{ scale: 0.85, rotate: -15 }}
            className="text-gray-600 hover:text-black transition z-10"
            disabled={words.length <= 1}
          >
            <ChevronLeft size={38} />
          </motion.button>

          {/* Carousel content */}
          <div className="w-full h-60 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={index}
                className="absolute flex flex-col items-center text-center"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="text-5xl font-extrabold text-indigo-700 mb-2">
                  {current.en}
                </div>
                <div className="text-3xl text-gray-600 italic" dir="rtl">
                  {current.he}
                </div>
                <motion.button
                  onClick={() => {
                    playClickSound();
                    speakText(current.en);
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
            disabled={words.length <= 1}
          >
            <ChevronRight size={38} />
          </motion.button>
        </div>
      )}

      <NavBar navLinks={navLinks} />
    </div>
  );
}