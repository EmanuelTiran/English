import React from 'react';
import { Link } from 'react-router-dom'; // נניח שאתה משתמש ב-react-router-dom לניווט

const Items = () => {
  const categories = [
    { name: 'חיות', path: '/animals' },
    { name: 'רהיטים', path: '/furniture' },
    { name: 'מזון', path: '/toys' },
    { name: 'בגדים', path: '/clothes' },
  ];

  return (
    <div className="items-container">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">קטגוריות פריטים</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <li key={category.name} className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <Link to={category.path} className="block text-center text-2xl font-semibold text-green-600 hover:text-green-800">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;