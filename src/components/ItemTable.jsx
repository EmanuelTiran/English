import React, { useState } from "react";
import { Plus, XCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const speakWord = (word) => {
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

export default function ItemTable({
  items = [],
  title = "What items will we learn about today?",
  iconField = "icon",
  nameField = "name",
  onAddToLearn = () => {},
  navLinks = [],
}) {
  const [addedItems, setAddedItems] = useState(new Set());

  const toggleItem = (itemName) => {
    const newSet = new Set(addedItems);
    if (newSet.has(itemName)) {
      newSet.delete(itemName);
    } else {
      newSet.add(itemName);
      onAddToLearn(itemName);
    }
    setAddedItems(newSet);
  };

  return (
    <div className="relative overflow-hidden max-w-6xl mx-auto mt-8 p-6 rounded-3xl border border-gray-200 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Background wave animation */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-white to-blue-100 animate-pulse opacity-20 z-0" />

      <motion.h1
        className="relative text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-10"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h1>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item) => {
          const itemName = item[nameField];
          const itemIcon = item[iconField];
          const isAdded = addedItems.has(itemName);

          return (
            <div
              key={itemName}
              className={`group relative flex flex-col items-center justify-center rounded-2xl p-6 border transition duration-300 transform hover:scale-[1.05] hover:rotate-[1deg] shadow-xl ${
                isAdded
                  ? "bg-gradient-to-br from-green-200 to-green-100 border-green-300"
                  : "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200"
              } hover:shadow-2xl hover:shadow-purple-200 backdrop-blur-md`}
            >
              {isAdded && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md z-20">
                  Collected
                </span>
              )}

              <div
                onClick={() => speakWord(itemName)}
                className="text-6xl mb-3 cursor-pointer hover:scale-110 transition-transform"
                title="Click to speak"
              >
                {itemIcon}
              </div>

              <div className="text-xl font-semibold text-indigo-800 group-hover:text-indigo-900 transition">
                {itemName}
              </div>

              <button
                onClick={() => toggleItem(itemName)}
                className="mt-4 transition-all"
                title={isAdded ? "Remove from learning" : "Add to learning"}
              >
                {isAdded ? (
                  <XCircle className="w-7 h-7 text-red-600 hover:text-red-800" />
                ) : (
                  <Plus className="w-7 h-7 text-blue-600 hover:text-blue-800" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {navLinks.length > 0 && (
        <nav className="mt-10 relative z-10 flex flex-col md:flex-row gap-4 justify-center items-center text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600"
              end
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-lg">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
