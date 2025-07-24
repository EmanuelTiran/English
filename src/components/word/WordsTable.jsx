import React, { useEffect, useState } from "react";
import { Plus, Trash2, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { words } from "../../words";
import NavBar from "../NavBar";
import Button from "./Button";

const speakWord = (word) => {
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
};

export default function WordsTable({
    onAddToLearn = () => { },
    onRemoveFromLearn = () => { },
    navLinks = [],
}) {
    const [addedItems, setAddedItems] = useState(new Map());
    const [orderCounter, setOrderCounter] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 30;

    // טוען מה-localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("learnedWords") || "[]");
        const initialMap = new Map();
        stored.forEach((wordObj, index) => {
            if (typeof wordObj === 'string') {
                // תמיכה בפורמט ישן - מחרוזת בלבד
                const fullWord = words.find(word => word.en === wordObj) || { en: wordObj, he: "" };
                initialMap.set(wordObj, index + 1);
            } else if (wordObj && wordObj.en) {
                // פורמט חדש - אובייקט עם en ו-he
                initialMap.set(wordObj.en, index + 1);
            }
        });
        setAddedItems(initialMap);
        setOrderCounter(stored.length + 1);
        console.log("Loaded from localStorage:", stored); // לוג לבדיקת הנתונים שנטענו
    }, []);

    // שומר ל-localStorage
    useEffect(() => {
        const list = Array.from(addedItems.keys()).map(enWord => {
            const fullWord = words.find(word => word.en === enWord) || { en: enWord, he: "" };
            return { en: fullWord.en, he: fullWord.he }; // מבטיח ששני השדות נשמרים
        });
        localStorage.setItem("learnedWords", JSON.stringify(list));
        console.log("Saved to localStorage:", list); // לוג לבדיקת הנתונים שנשמרו
    }, [addedItems]);

    const resetSelection = () => {
        setAddedItems(new Map());
        setOrderCounter(1);
        setCurrentPage(1);
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

    // סינון המילים
    const filteredAllWords = words.filter(({ en, he }) => {
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

    // המילים הנראות (לפי pagination)
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredWords = sortedWords.slice(startIndex, endIndex);

    // חישוב pagination
    const totalWords = sortedWords.length;
    const totalPages = Math.ceil(totalWords / itemsPerPage);
    const showingStart = startIndex + 1;
    const showingEnd = Math.min(endIndex, totalWords);

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
                            className={`group relative flex flex-col items-center justify-center rounded-xl p-4 border transition duration-300 transform hover:scale-[1.03] hover:rotate-[1deg] shadow ${isAdded
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

                            <div className="text-sm text-gray-600" dir="rtl">{he}</div> {/* הוספת dir="rtl" לעברית */}

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

            {/* Pagination */}
            <div className="mt-8 mb-20 flex flex-col items-center relative z-50">
                <p className="text-sm text-gray-600 mb-4">
                    Showing {showingStart}-{showingEnd} of {totalWords} words
                </p>

                {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: currentPage === 1 ? '#9ca3af' : '#374151',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Previous
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    type="button"
                                    onClick={() => setCurrentPage(pageNum)}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: currentPage === pageNum ? '#ef4444' : '#f3f4f6',
                                        color: currentPage === pageNum ? 'white' : '#374151',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        minWidth: '40px'
                                    }}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: currentPage === totalPages ? '#9ca3af' : '#374151',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            Next
                        </button>


                    </div>
                )}
            </div>

            <NavBar navLinks={navLinks} />
        </div>
    );
}