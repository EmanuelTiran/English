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
  const [wordToLearn, setWordToLearn] = useState([]);

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
    if (!wordToLearn.includes(colorItem)) {
      setColorToLearn((prev) => [...prev, colorItem]);
    }
    console.log(wordToLearn);
  };

  const removeColor = (itemName) => {
    setColorToLearn(prev => prev.filter(item => item !== itemName));
  };

  const addToLearnWord = (word) => {
    if (!wordToLearn.includes(word)) {
      setWordToLearn((prev) => [...prev, word]);
    }
    console.log(wordToLearn);
  };

  const removeWord = (anyWord) => {
    setWordToLearn(prev => prev.filter(word => word !== anyWord));
  };

  const value = {
    animalsToLearn,
    foodToLearn,
    colorToLearn,
    wordToLearn,
    addToLearn,
    removeAnimal,
    addToLearnFood,
    removeFood,
    addToLearnColor,
    removeColor,
    removeWord,
    addToLearnWord
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};