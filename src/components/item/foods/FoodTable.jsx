import React, { useState } from "react";
import { SpeakerWaveIcon } from "@heroicons/react/24/solid"; // Not used in this component, but kept for consistency if needed later
import { Plus, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { foodItems } from '../../../icons'; // נתיב יחסי לקובץ icons.js




const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
};

export default function FoodTable({ onAddToLearn }) {
    const [addedFoodItems, setAddedFoodItems] = useState(new Set());

    const handleAddFoodItem = (name) => {
        const newSet = new Set(addedFoodItems);
        newSet.add(name);
        setAddedFoodItems(newSet);
        onAddToLearn(name);
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">

            <motion.h1
                className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-600 mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1 }}
            >
                What food items will we learn about today?
            </motion.h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {foodItems.map((item) => {
                    const isAdded = addedFoodItems.has(item.name);
                    return (
                        <div
                            key={item.name}
                            className={`flex flex-col items-center justify-center rounded-xl p-4 shadow transition cursor-pointer 
                ${isAdded ? "bg-green-200" : "bg-blue-100"} hover:shadow-lg`}
                        >
                            <div
                                onClick={() => speakWord(item.name)}
                                className="text-5xl mb-2"
                                title="Click to speak"
                            >
                                {item.icon}
                            </div>
                            <div className="text-xl font-semibold text-purple-800">{item.name}</div>
                            <button
                                onClick={() => handleAddFoodItem(item.name)}
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
                    to="/Food2"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600"
                    end
                >
                    <span className="text-lg">📚</span>
                    <span className="text-lg">My English Food Vocabulary</span>
                </NavLink>
                <NavLink
                    to="/Food3"
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-cyan-600"
                    end
                >
                    <span className="text-lg">🎯</span>
                    <span className="text-lg">Matching Food Game</span>
                </NavLink>
            </nav>
        </div>
    );
}