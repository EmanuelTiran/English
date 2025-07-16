import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const speakLetter = (letter) => {
  const utter = new SpeechSynthesisUtterance(letter);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

export default function LetterSlider() {
  const [index, setIndex] = useState(0);
  const current = alphabet[index];

  const goPrev = () => setIndex((prev) => (prev === 0 ? alphabet.length - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev + 1) % alphabet.length);

  useEffect(() => {
    speakLetter(current);
  }, [current]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-yellow-100 py-10 px-4">
      {/* כותרת מונפשת */}
      <motion.h2
        className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-10"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.2, 1], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 1 }}
      >
        🎉 Scroll Through the Alphabet 🎉
      </motion.h2>

      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 flex items-center justify-between space-x-4">
        <button onClick={goPrev} className="text-gray-600 hover:text-black transition">
          <ChevronLeft size={36} />
        </button>
        <div className="text-center text-6xl font-bold text-blue-700">
          {current}
          <div className="text-3xl text-gray-400">{current.toLowerCase()}</div>
        </div>
        <button onClick={goNext} className="text-gray-600 hover:text-black transition">
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}