// components/LettersHome.js
import React from "react";
import { Link } from "react-router-dom"; // ודא שיש לך את react-router-dom מותקן

export default function LettersHome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">בחר פעילות אותיות</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <Link
          to="/Letters"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800"
        >
          <span className="text-6xl mb-4">🅰️</span>
          <h2 className="text-2xl font-bold mb-2">התאמת אותיות</h2>
          <p className="text-blue-100">תרגל זיהוי והתאמה של אותיות</p>
        </Link>

        <Link
          to="/Letters2"
          className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-green-600 hover:to-green-800"
        >
          <span className="text-6xl mb-4">⌨️</span>
          <h2 className="text-2xl font-bold mb-2">מקלדת אותיות</h2>
          <p className="text-green-100">הקלד אותיות ושמע את הגייתן</p>
        </Link>

        <Link
          to="/Letters3"
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-800"
        >
          <span className="text-6xl mb-4">🔠</span>
          <h2 className="text-2xl font-bold mb-2">סליידר אותיות</h2>
          <p className="text-purple-100">עבור בין אותיות האלפבית ושמע אותן</p>
        </Link>
      </div>
    </div>
  );
}