// components/LettersHome.js
import React from "react";
import { Link } from "react-router-dom"; // Make sure you have react-router-dom installed

export default function LettersHome() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
 style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2015/09/01/09/30/abc-916666_640.jpg')",
        backgroundSize: 'cover',       // זה יגרום לתמונה לכסות את כל השטח, ללא שוליים
        backgroundRepeat: 'no-repeat', // זה ימנע את שכפול התמונה
        backgroundPosition: 'center',  // זה ממקם את התמונה במרכז
      }}    >
      <div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-12">Choose a Letter Activity</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <Link
            to="/Letters1"
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-yellow-600 hover:to-yellow-800"
          >
            <span className="text-6xl mb-4">🔠</span>
            <h2 className="text-2xl font-bold mb-2">Letter Matching</h2>
            <p className="text-blue-100">Practice identifying and matching letters</p>
          </Link>

          <Link
            to="/Letters2"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-green-600 hover:to-green-800"
          >
            <span className="text-6xl mb-4">⌨️</span>
            <h2 className="text-2xl font-bold mb-2">Letter Keyboard</h2>
            <p className="text-green-100">Type letters and hear their pronunciation</p>
          </Link>

          <Link
            to="/Letters3"
            className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 hover:from-purple-600 hover:to-purple-800"
          >
            <span className="text-6xl mb-4">🔤</span>
            <h2 className="text-2xl font-bold mb-2">Letter Slider</h2>
            <p className="text-purple-100">Browse through alphabet letters and hear them</p>
          </Link>
        </div>
      </div>
    </div>
  );
}