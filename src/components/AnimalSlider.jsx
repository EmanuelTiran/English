import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const animalIcons = {
    "Dog": "🐶",
    "Cat": "🐱",
    "Lion": "🦁",
    "Elephant": "🐘",
    "Tiger": "🐯",
    "Horse": "🐎",
    "Bird": "🐦",
    "Fish": "🐟",
    "Rabbit": "🐰",
    "Chicken": "🐔",
    "Wolf": "🐺",
    "Monkey": "🐵",
    "Bear": "🐻",
    "Dolphin": "🐬",
    "Shark": "🦈",
    "Cow": "🐄",
    "Pig": "🐷",
    "Sheep": "🐑",
    "Goat": "🐐",
    "Deer": "🦌",
    "Fox": "🦊",
    "Panda": "🐼",
    "Penguin": "🐧",
    "Giraffe": "🦒",
    "Zebra": "🦓",
    "Kangaroo": "🦘",
    "Owl": "🦉",
    "Duck": "🦆",
    "Snake": "🐍",
    "Crocodile": "🐊",
    "Turtle": "🐢",
    "Frog": "🐸",
    "Lizard": "🦎",
    "Spider": "🕷️",
    "Bee": "🐝",
    "Ant": "🐜",
    "Butterfly": "🦋",
    "Whale": "🐳",
    "Octopus": "🐙",
    "Crab": "🦀",
    "Lobster": "🦞",
    "Shrimp": "🦐",
    "Pigeon": "🕊️",
    "Eagle": "🦅",
    "Flamingo": "🦩",
    "Rhino": "🦏",
    "Hippo": "🦛",
    "Snail": "🐌",
    "Hedgehog": "🦔",
    "Squirrel": "🐿️",
    "Otter": "🦦",
    "Raccoon": "🦝",
    "Bat": "🦇"
  };

const speakAnimal = (animal) => {
  const utter = new SpeechSynthesisUtterance(animal);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

export default function AnimalSlider({ animals }) {
  const [index, setIndex] = useState(0);

  const goPrev = () => setIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev + 1) % animals.length);

  useEffect(() => {
    if (animals.length > 0) speakAnimal(animals[index]);
  }, [index, animals]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [animals]);

  if (animals.length === 0) return null;

  const current = animals[index];
  const icon = animalIcons[current] || "❓"; // Fallback to a question mark if no icon is found
  return (
    <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
      <motion.h2
        className="text-center text-4xl font-bold text-purple-600 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.2, 1], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 1 }}
      >
        🐾 Animals To Learn 🐾
      </motion.h2>
      <div className="flex items-center justify-between">
        <button onClick={goPrev}>
          <ChevronLeft size={36} className="text-gray-500 hover:text-black" />
        </button>
        <div className="text-center">
          <div className="text-6xl">{icon}</div>
          <div className="text-3xl font-semibold text-blue-800">{current}</div>
        </div>
        <button onClick={goNext}>
          <ChevronRight size={36} className="text-gray-500 hover:text-black" />
        </button>
      </div>
    </div>
  );
}