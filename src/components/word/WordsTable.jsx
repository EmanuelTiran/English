import React, { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { words } from "../../words";
import NavBar from "../NavBar";

const speakWord = (word) => {
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
};

export default function WordsTable({
  onAddToLearn = () => {},
  onRemoveFromLearn = () => {},
  navLinks = [],
}) {
  const [addedItems, setAddedItems] = useState(new Map());
  const [orderCounter, setOrderCounter] = useState(1);
  const [visibleCount, setVisibleCount] = useState(30);
  const [searchQuery, setSearchQuery] = useState("");

  // טוען מה-localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedWords") || "[]");
    const initialMap = new Map();
    stored.forEach((word, index) => {
      initialMap.set(word, index + 1);
    });
    setAddedItems(initialMap);
    setOrderCounter(stored.length + 1);
  }, []);

  // שומר ל-localStorage
  useEffect(() => {
    const list = Array.from(addedItems.keys());
    localStorage.setItem("learnedWords", JSON.stringify(list));
  }, [addedItems]);

  const resetSelection = () => {
    setAddedItems(new Map());
    setOrderCounter(1);
    localStorage.removeItem("learnedWords");
  };

  const toggleWord = (word) => {
    const newMap = new Map(addedItems);

    if (newMap.has(word)) {
      newMap.delete(word);
      const updated = Array.from(newMap.entries()).sort((a, b) => a[1] - b[1]);
      const newOrdered = new Map();
      updated.forEach(([w], idx) => newOrdered.set(w, idx + 1));
      setAddedItems(newOrdered);
      setOrderCounter(newOrdered.size + 1);
      onRemoveFromLearn(word);
    } else {
      newMap.set(word, orderCounter);
      setAddedItems(newMap);
      setOrderCounter(orderCounter + 1);
      onAddToLearn(word);
    }
  };

  const isHebrew = (str) => /[\u0590-\u05FF]/.test(str);

  // סינון המילים עם הגנה מפני undefined
  const filteredAllWords = words.filter(({ en, he }) => {
    // מוודאים שיש לנו מילה חוקית
    if (!en && !he) return false;
    
    if (!searchQuery) return true;

    const isHeb = isHebrew(searchQuery);

    return isHeb
      ? (he || '').includes(searchQuery)
      : (en || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  // מיון המילים
  const sortedWords = filteredAllWords.sort((a, b) => {
    const aEn = a.en || '';
    const bEn = b.en || '';
    return aEn.localeCompare(bEn);
  });

  // המילים הנראות (לפי visibleCount)
  const filteredWords = sortedWords.slice(0, visibleCount);
  
  // האם יש עוד מילים להציג
  const hasMoreWords = visibleCount < sortedWords.length;

  return (
    <div className="relative overflow-hidden max-w-7xl mx-auto mt-8 p-6 rounded-3xl border border-gray-200 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-white to-blue-100 animate-pulse opacity-20 z-0" />

      <motion.h1
        className="relative text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: [0.8, 1.1, 1], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 1 }}
      >
        Words we will learn today
      </motion.h1>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by English or Hebrew..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <button
          onClick={resetSelection}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold shadow"
        >
          <RefreshCcw className="w-4 h-4" />
          Reset Selections
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredWords.map((word, index) => {
          const en = word.en || '';
          const he = word.he || '';
          const isAdded = addedItems.has(en);
          const order = addedItems.get(en);

          return (
            <div
              key={`${en}-${index}`}
              className={`group relative flex flex-col items-center justify-center rounded-xl p-4 border transition duration-300 transform hover:scale-[1.03] hover:rotate-[1deg] shadow ${
                isAdded
                  ? "bg-gradient-to-br from-green-200 to-green-100 border-green-300"
                  : "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200"
              } hover:shadow-xl backdrop-blur-md`}
            >
              {isAdded && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow z-20">
                  ✔
                </span>
              )}

              <div
                onClick={() => speakWord(en)}
                className="text-xl font-bold text-indigo-700 mb-1 cursor-pointer hover:scale-110 transition-transform"
                title="Click to speak"
              >
                {en}
              </div>

              <div className="text-sm text-gray-600">{he}</div>

              {isAdded ? (
                <div className="mt-3 flex items-center gap-1">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {order}
                  </div>
                  <button onClick={() => toggleWord(en)} title="Remove">
                    <Trash2 className="w-5 h-5 text-red-600 hover:text-red-800" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleWord(en)}
                  className="mt-3"
                  title="Add"
                >
                  <Plus className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Load more - תוקן */}
      {hasMoreWords && (
        <div className="mt-8 flex justify-center">
          <span
            onClick={() => setVisibleCount(prev => prev + 30)}
            className="px-6 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 font-bold shadow-md cursor-pointer"
          >
            Load More ({filteredWords.length}/{sortedWords.length})
          </span>
        </div>
      )}

      <NavBar navLinks={navLinks} />
    </div>
  );
}