// AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [animalsToLearn, setAnimalsToLearn] = useState([]);
  const [foodToLearn, setFoodToLearn] = useState([]);
  const [colorToLearn, setColorToLearn] = useState([]);

  const addToLearn = (animal) => {
    if (animal !== undefined) {
      if (!animalsToLearn.includes(animal)) {
        setAnimalsToLearn((prev) => [...prev, animal]);
      }
    }
    console.log( [...animalsToLearn] );
  };

  const removeAnimal = (itemName) => {
    setAnimalsToLearn(prev => prev.filter(item => item !== itemName));
  };

  const addToLearnFood = (foodItem) => {
    if (!foodToLearn.includes(foodItem)) {
      setFoodToLearn((prev) => [...prev, foodItem]);
    }
    console.log(foodToLearn);
  };

  const removeFood = (itemName) => {
    setFoodToLearn(prev => prev.filter(item => item !== itemName));
  };

  const addToLearnColor = (colorItem) => {
    if (!colorToLearn.includes(colorItem)) {
      setColorToLearn((prev) => [...prev, colorItem]);
    }
    console.log(colorToLearn);
  };

  const removeColor = (itemName) => {
    setColorToLearn(prev => prev.filter(item => item !== itemName));
  };

  const value = {
    animalsToLearn,
    foodToLearn,
    colorToLearn,
    addToLearn,
    removeAnimal,
    addToLearnFood,
    removeFood,
    addToLearnColor,
    removeColor
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};