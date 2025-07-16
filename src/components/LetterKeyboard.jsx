import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const speakLetter = (letter) => {
  const utter = new SpeechSynthesisUtterance(letter);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

export default function LetterKeyboard() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  const handleClick = (char) => {
    setSelectedLetter(char);
    speakLetter(char);

    // מיקום אקראי במסך
    const randTop = `${Math.floor(Math.random() * 80) + 10}%`;
    const randLeft = `${Math.floor(Math.random() * 80) + 10}%`;
    setPosition({ top: randTop, left: randLeft });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 py-8 px-4">
      {/* כותרת אנימטיבית */}
      <motion.h1
        className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 1 }}
      >
        🎉 Tap a Letter to Learn It! 🎉
      </motion.h1>

      {/* הצגת אות במיקום אקראי */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            key={selectedLetter}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "fixed", top: position.top, left: position.left, transform: "translate(-50%, -50%)" }}
            className="z-50 text-9xl font-extrabold text-blue-600 pointer-events-none"
          >
            {selectedLetter}
          </motion.div>
        )}
      </AnimatePresence>

      {/* מקלדת */}
      <div className="max-w-3xl mx-auto space-y-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            {[...row].map((char) => (
              <button
                key={char}
                onClick={() => handleClick(char)}
                className="bg-white border-2 border-blue-300 text-blue-800 text-xl font-bold rounded-xl px-5 py-3 hover:bg-blue-100 shadow-md transition active:scale-95"
              >
                {char}
                <div className="text-sm text-gray-500">{char.toLowerCase()}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}