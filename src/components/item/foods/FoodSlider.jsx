// DEPRECATED: kept for compatibility; AppRoutes uses the generic ItemSlider to avoid duplicate slider logic.
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { foodIcons } from '../../../icons';
import { linksToFoodForSlider } from '../../../links';
import NavBar from '../../NavBar';

const speakFoodItem = (foodItem) => {
    const utter = new SpeechSynthesisUtterance(foodItem);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
};

export default function FoodSlider({ foodItems }) {
    const [index, setIndex] = useState(0);

    const goPrev = () =>
        setIndex((prev) => (prev === 0 ? foodItems.length - 1 : prev - 1));
    const goNext = () => setIndex((prev) => (prev + 1) % foodItems.length);

    useEffect(() => {
        if (foodItems.length > 0) speakFoodItem(foodItems[index]);
    }, [index, foodItems]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [foodItems]);

    if (!foodItems || foodItems.length === 0) {
        return (
            <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 text-center">
                <h2 className="text-2xl font-bold text-red-500">No food items to learn yet 😕</h2>
                <p className="text-gray-600 mt-2">Please add food items to start the learning slider.</p>

                {/* FIXED: use the shared navigation component and centralized food links. */}
                <NavBar navLinks={linksToFoodForSlider} />
            </div>
        );
    }

    const current = foodItems[index];
    const icon = foodIcons[current] || "❓";
    const progress = ((index + 1) / foodItems.length) * 100;

    return (
        <>
            <div className="mt-12 max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
                <motion.h2
                    className="text-center text-4xl font-bold text-teal-600 mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0.8, 1.2, 1], rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 1 }}
                >
                    🍔 Food Items To Learn 🥗
                </motion.h2>

                {/* Progress Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-full mb-6 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 text-center text-sm text-gray-600 font-semibold">
                        {index + 1} / {foodItems.length}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={goPrev}>
                        <ChevronLeft size={36} className="text-gray-500 hover:text-black" />
                    </button>
                    <div className="text-center">
                        <div className="text-6xl">{icon}</div>
                        <div className="text-3xl font-semibold text-orange-800">{current}</div>
                    </div>
                    <button onClick={goNext}>
                        <ChevronRight size={36} className="text-gray-500 hover:text-black" />
                    </button>
                </div>

            </div>

            {/* FIXED: use the shared navigation component and centralized food links. */}
            <NavBar navLinks={linksToFoodForSlider} />
        </>
    );
}