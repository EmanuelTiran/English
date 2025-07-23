import React from 'react';
import { NavLink } from 'react-router-dom'; // שיניתי מ-Link ל-NavLink

const NavBar = ({ navLinks }) => {
  return (
    <> {/* הוספתי Fragment כדי לעטוף את התנאי */}
      {navLinks.length > 0 && (
        <nav className="mt-10 relative z-10 flex flex-col md:flex-row gap-4 justify-center items-center text-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600"
              // הוסף את הקלאסים עבור מצב פעיל (active) אם תרצה ש-NavLink יחיל אותם
              // לדוגמה:
              // activeClassName="border-b-2 border-white" // עבור v5
              // className={({ isActive }) => 
              //   isActive 
              //     ? "group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" // סגנון למצב פעיל
              //     : "group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-purple-600 hover:to-pink-600" // סגנון רגיל
              // }
              end
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-lg">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </>
  );
};

export default NavBar;