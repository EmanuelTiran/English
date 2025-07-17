import React, { useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { Plus, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";


const animals = [
    { name: "Dog", icon: "🐶" },
    { name: "Cat", icon: "🐱" },
    { name: "Lion", icon: "🦁" },
    { name: "Elephant", icon: "🐘" },
    { name: "Tiger", icon: "🐯" },
    { name: "Horse", icon: "🐎" },
    { name: "Bird", icon: "🐦" },
    { name: "Fish", icon: "🐟" },
    { name: "Rabbit", icon: "🐰" },
    { name: "Chicken", icon: "🐔" },
    { name: "Wolf", icon: "🐺" },
    { name: "Monkey", icon: "🐵" },
    { name: "Bear", icon: "🐻" },
    { name: "Dolphin", icon: "🐬" },
    { name: "Shark", icon: "🦈" },
    { name: "Cow", icon: "🐄" },
    { name: "Pig", icon: "🐷" },
    { name: "Sheep", icon: "🐑" },
    { name: "Goat", icon: "🐐" },
    { name: "Deer", icon: "🦌" },
    { name: "Fox", icon: "🦊" },
    { name: "Panda", icon: "🐼" },
    { name: "Penguin", icon: "🐧" },
    { name: "Giraffe", icon: "🦒" },
    { name: "Zebra", icon: "🦓" },
    { name: "Kangaroo", icon: "🦘" },
    { name: "Owl", icon: "🦉" },
    { name: "Duck", icon: "🦆" },
    { name: "Snake", icon: "🐍" },
    { name: "Crocodile", icon: "🐊" },
    { name: "Turtle", icon: "🐢" },
    { name: "Frog", icon: "🐸" },
    { name: "Lizard", icon: "🦎" },
    { name: "Spider", icon: "🕷️" },
    { name: "Bee", icon: "🐝" },
    { name: "Ant", icon: "🐜" },
    { name: "Butterfly", icon: "🦋" },
    { name: "Whale", icon: "🐳" },
    { name: "Octopus", icon: "🐙" },
    { name: "Crab", icon: "🦀" },
    { name: "Lobster", icon: "🦞" },
    { name: "Shrimp", icon: "🦐" },
    { name: "Pigeon", icon: "🕊️" },
    { name: "Eagle", icon: "🦅" },
    { name: "Flamingo", icon: "🦩" },
    { name: "Rhino", icon: "🦏" },
    { name: "Hippo", icon: "🦛" },
    { name: "Snail", icon: "🐌" },
    { name: "Hedgehog", icon: "🦔" },
    { name: "Squirrel", icon: "🐿️" },
    { name: "Otter", icon: "🦦" },
    { name: "Raccoon", icon: "🦝" },
    { name: "Bat", icon: "🦇" },
];


const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
};

export default function AnimalTable({ onAddToLearn }) {
    const [addedAnimals, setAddedAnimals] = useState(new Set());

    const handleAddAnimal = (name) => {
        const newSet = new Set(addedAnimals);
        newSet.add(name);
        setAddedAnimals(newSet);
        onAddToLearn(name);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">

            <motion.h1
                className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1 }}
            >
                What animals will we learn about today?
            </motion.h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {animals.map((animal) => {
                    const isAdded = addedAnimals.has(animal.name);
                    return (
                        <div
                            key={animal.name}
                            className={`flex flex-col items-center justify-center rounded-xl p-4 shadow transition cursor-pointer 
                ${isAdded ? "bg-green-200" : "bg-yellow-100"} hover:shadow-lg`}
                        >
                            <div
                                onClick={() => speakWord(animal.name)}
                                className="text-5xl mb-2"
                                title="Click to speak"
                            >
                                {animal.icon}
                            </div>
                            <div className="text-xl font-semibold text-blue-800">{animal.name}</div>
                            <button
                                onClick={() => handleAddAnimal(animal.name)}
                                className="mt-2 transition-colors"
                                title={isAdded ? "Already added" : "Add to learning"}
                                disabled={isAdded}
                            >
                                {isAdded ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <Plus className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                                )}
                            </button>
                        </div>
                    );
                })}
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
                    <span className="text-lg">Matching Animal Game</span>
                </NavLink>
            </nav>
        </div>
    );
}
