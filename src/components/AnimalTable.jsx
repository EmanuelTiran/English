import React, { useState } from "react";
import { SpeakerWaveIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
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
    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">

            <motion.h1
                className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1 }}
            >
                 What animals will we learn about today?       </motion.h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {animals.map((animal) => (
                    <div
                        key={animal.name}
                        className="flex flex-col items-center justify-center bg-yellow-100 rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
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
                            onClick={() => onAddToLearn(animal.name)}
                            className="mt-2 text-green-600 hover:text-green-800"
                            title="Add to learning"
                        >
                            <PlusCircleIcon className="w-6 h-6" />
                        </button>
                    </div>
                ))}
            </div>
            <NavLink
                to="/Animal2"
                end // חשוב עבור נתיב הבסיס כדי למנוע התאמה חלקית
            >
                <span className="text-2xl font-bold">My English Animal Vocabularry</span>
            </NavLink>
            <NavLink
                to="/Animal3"
                end // חשוב עבור נתיב הבסיס כדי למנוע התאמה חלקית
            >
                <span className="text-2xl font-bold">My English Animal Slider</span>
            </NavLink>
        </div>
    );
}