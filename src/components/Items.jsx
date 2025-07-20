import React from 'react';
import { Link } from 'react-router-dom'; // נניח שאתה משתמש ב-react-router-dom לניווט

const Items = () => {
  const categories = [
    {
      name: 'Animals',
      path: '/Animal1',
      emoji: '🦁',
      description: 'Discover a wide variety of animals',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700',
      hoverFrom: 'hover:from-blue-600',
      hoverTo: 'hover:to-blue-800',
      textColor: 'text-blue-100'
    },
    {
      name: 'Furniture',
      path: '/furniture',
      emoji: '🛋️',
      description: 'A world of home design',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700',
      hoverFrom: 'hover:from-green-600',
      hoverTo: 'hover:to-green-800',
      textColor: 'text-green-100'
    },
    {
      name: 'Vehicle',
      path: '/Vehicle',
      emoji: '🚁',
      description: 'all kinds of vehicle',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700',
      hoverFrom: 'hover:from-purple-600',
      hoverTo: 'hover:to-purple-800',
      textColor: 'text-purple-100'
    },
    {
      name: 'clothes',
      path: '/Clothes',
      emoji: '👚',
      description: 'Fashion for every season',
      gradientFrom: 'from-red-500',
      gradientTo: 'to-red-700',
      hoverFrom: 'hover:from-red-600',
      hoverTo: 'hover:to-red-800',
      textColor: 'text-red-100'
    },
    {
      name: 'Foods',
      path: '/Foods',
      emoji: '🍔',
      description: 'all kinds of foods',
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-yellow-700',
      hoverFrom: 'hover:from-yellow-600',
      hoverTo: 'hover:to-yellow-800',
      textColor: 'text-yellow-100'
    },
  {
    name: 'Shapes',
    path: '/Shapes',
    emoji: '🔺',
    description: 'Learn various geometric shapes',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-pink-700',
    hoverFrom: 'hover:from-pink-600',
    hoverTo: 'hover:to-pink-800',
    textColor: 'text-pink-100'
  },
  {
    name: 'Colors',
    path: '/Colors',
    emoji: '🌈',
    description: 'Explore the world of colors',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-700',
    hoverFrom: 'hover:from-indigo-600',
    hoverTo: 'hover:to-indigo-800',
    textColor: 'text-indigo-100'
  }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6"
     style={{
        backgroundImage: "url('/images/ITEM.jpg')", // נתיב לתמונה שלך
        backgroundSize: 'cover',       
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center',  
      }}
    >
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">בחר קטגוריית פריטים</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className={`bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 ${category.hoverFrom} ${category.hoverTo}`}
          >  
            <span className="text-6xl mb-4">{category.emoji}</span>
            <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
            <p className={category.textColor}>{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Items;