import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

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
  onAddToLearn = () => { },
  onRemoveFromLearn = () => { }, // פונקציה חדשה למחיקה מה-existingItems
  navLinks = [],
  existingItems = [], // רשימת הפריטים שכבר נבחרו
}) {
  const [addedItems, setAddedItems] = useState(() => {
    // אתחול ה-state על בסיס הפריטים הקיימים
    const initialMap = new Map();
    existingItems.forEach((item, index) => {
      initialMap.set(item, index + 1);
    });
    return initialMap;
  });
  const [orderCounter, setOrderCounter] = useState(existingItems.length + 1);

  const toggleItem = (itemName) => {
    const newMap = new Map(addedItems);
    if (newMap.has(itemName)) {
      newMap.delete(itemName);
      // עדכון מספרי הסידור של הפריטים שנותרו
      const remainingItems = Array.from(newMap.entries()).sort((a, b) => a[1] - b[1]);
      const updatedMap = new Map();
      remainingItems.forEach(([name], index) => {
        updatedMap.set(name, index + 1);
      });
      setAddedItems(updatedMap);
      setOrderCounter(updatedMap.size + 1);

      // קריאה לפונקציה למחיקה מה-existingItems
      onRemoveFromLearn(itemName);
    } else {
      newMap.set(itemName, orderCounter);
      setAddedItems(newMap);
      setOrderCounter(orderCounter + 1);
      onAddToLearn(itemName);
    }
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
          const orderNumber = addedItems.get(itemName);

          return (
            <div
              key={itemName}
              className={`group relative flex flex-col items-center justify-center rounded-2xl p-6 border transition duration-300 transform hover:scale-[1.05] hover:rotate-[1deg] shadow-xl ${isAdded
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

              {isAdded ? (
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {orderNumber}
                  </div>
                  <button
                    onClick={() => toggleItem(itemName)}
                    className="transition-all"
                    title="Remove from learning"
                  >
                    <Trash2 className="w-6 h-6 text-red-600 hover:text-red-800" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleItem(itemName)}
                  className="mt-4 transition-all"
                  title="Add to learning"
                >
                  <Plus className="w-7 h-7 text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      <NavBar navLinks={navLinks} />

    </div>
  );
}