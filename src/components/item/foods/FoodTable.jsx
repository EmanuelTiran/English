// DEPRECATED: kept for compatibility; AppRoutes uses the generic ItemTable to avoid duplicate table logic.
import React, { useState } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { foodItems } from '../../../icons'; // נתיב יחסי לקובץ icons.js
import { linksToFoodForTable } from '../../../links';
import NavBar from '../../NavBar';




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
                                role="button"
                                tabIndex={0}
                                onKeyDown={(event) => {
                                    // FIXED: keyboard users can trigger speech with Enter or Space.
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        speakWord(item.name);
                                    }
                                }}
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
            {/* FIXED: use the shared navigation component and centralized food links. */}
            <NavBar navLinks={linksToFoodForTable} />
        </div>
    );
}