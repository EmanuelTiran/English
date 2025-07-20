import React from 'react';
import { Link } from 'react-router-dom';

const NavigationCards = () => {
  const navigationItems = [
    {
      name: 'Letters',
      path: '/Letters',
      emoji: '🔠',
      description: 'Practice recognizing and typing letters.',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-700',
      hoverFrom: 'hover:from-purple-600',
      hoverTo: 'hover:to-purple-800',
      textColor: 'text-purple-100'
    },
    {
      name: 'Items',
      path: '/Items',
      emoji: '🛒',
      description: 'Learn about different items and their sounds.',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-700',
      hoverFrom: 'hover:from-green-600',
      hoverTo: 'hover:to-green-800',
      textColor: 'text-green-100'
    },
    {
      name: 'Hearing',
      path: '/Hearing',
      emoji: '👂',
      description: 'Enhance your auditory recognition skills.',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-700',
      hoverFrom: 'hover:from-blue-600',
      hoverTo: 'hover:to-blue-800',
      textColor: 'text-blue-100'
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center  bg-transparent">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">Choose a Learning Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} text-white rounded-lg shadow-xl p-8 flex flex-col items-center justify-center text-center transform transition-transform duration-300 hover:scale-105 ${item.hoverFrom} ${item.hoverTo}`}
          >
            <span className="text-6xl mb-4">{item.emoji}</span>
            <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
            <p className={item.textColor}>{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationCards;