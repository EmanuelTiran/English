import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

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
  
    const goPrev = () =>
      setIndex((prev) => (prev === 0 ? animals.length - 1 : prev - 1));
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
  
    if (!animals || animals.length === 0) {
      return (
        <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">No animals to learn yet 😕</h2>
          <p className="text-gray-600 mt-2">Please add animals to start the learning slider.</p>

          <NavLink
                    to="/Animal1"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600"

                    end
                >
                    <span className="text-lg">📚</span>
                    <span className="text-lg"> English Animal Vocabulary</span>        </NavLink>
        </div>
      );
    }
  
    const current = animals[index];
    const icon = animalIcons[current] || "❓";
    const progress = ((index + 1) / animals.length) * 100;
  
    return (<>
      <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
        <motion.h2
          className="text-center text-4xl font-bold text-purple-600 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: [0.8, 1.2, 1], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 1 }}
        >
          🐾 Animals To Learn 🐾
        </motion.h2>
  
        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 text-center text-sm text-gray-600 font-semibold">
            {index + 1} / {animals.length}
          </div>
        </div>
  
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

       <nav className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center text-center">
                <NavLink
                    to="/Animal2"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600"

                    end
                >
                    <span className="text-lg">📚</span>
                    <span className="text-lg">My English Animal Vocabulary</span>        </NavLink>
                <NavLink
                    to="/Animal3"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-cyan-600"

                    end
                >
                    <span className="text-lg">🎯</span>
                    <span className="text-lg">Matching Animal Game</span>        </NavLink>
            </nav>
      </>
    );
  }