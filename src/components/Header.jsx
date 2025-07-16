import React, { useState } from 'react'; // ייבוא useState לניהול מצב
import { NavLink } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false); // מצב לניהול פתיחה/סגירה של תפריט נייד

  const getNavLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition duration-300 ${isActive ? 'text-blue-400 font-bold' : 'text-white'}`;

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center flex-wrap">
        {/* לוגו / כותרת האפליקציה */}
        <NavLink
          to="/"
          className="text-2xl font-bold hover:text-blue-400 transition duration-300"
          end
        >
          My English App
        </NavLink>

        {/* כפתור המבורגר לתפריט נייד */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 01-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 01-1.414-1.414L10.586 12 5.722 7.136a1 1 0 011.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* תפריט ניווט - מוסתר בנייד ומוצג בדסקטופ, או מוצג בנייד כש-isOpen נכון */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 lg:mt-0 mt-4">
            <li>
              <NavLink to="/" className={getNavLinkClass} end onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/Letters" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                Letters
              </NavLink>
            </li>
            <li>
              <NavLink to="/Items" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                Items
              </NavLink>
            </li>
            <li>
              <NavLink to="/Hearing" className={getNavLinkClass} onClick={() => setIsOpen(false)}>
                Hearing
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;