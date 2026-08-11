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
  // FIXED: selection state for every category that previously linked to a 404 page.
  const [furnitureToLearn, setFurnitureToLearn] = useState([]);
  const [vehicleToLearn, setVehicleToLearn] = useState([]);
  const [clothesToLearn, setClothesToLearn] = useState([]);
  const [shapeToLearn, setShapeToLearn] = useState([]);

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

  const addUniqueItem = (setter) => (itemName) => {
    if (itemName !== undefined) {
      setter(prev => prev.includes(itemName) ? prev : [...prev, itemName]);
    }
  };

  const removeItem = (setter) => (itemName) => {
    setter(prev => prev.filter(item => item !== itemName));
  };

  // FIXED: shared add/remove behavior keeps the new category state concise and consistent.
  const addToLearnFurniture = addUniqueItem(setFurnitureToLearn);
  const removeFurniture = removeItem(setFurnitureToLearn);
  const addToLearnVehicle = addUniqueItem(setVehicleToLearn);
  const removeVehicle = removeItem(setVehicleToLearn);
  const addToLearnClothes = addUniqueItem(setClothesToLearn);
  const removeClothes = removeItem(setClothesToLearn);
  const addToLearnShape = addUniqueItem(setShapeToLearn);
  const removeShape = removeItem(setShapeToLearn);

  const value = {
    animalsToLearn,
    foodToLearn,
    colorToLearn,
    wordToLearn,
    furnitureToLearn,
    vehicleToLearn,
    clothesToLearn,
    shapeToLearn,
    addToLearn,
    removeAnimal,
    addToLearnFood,
    removeFood,
    addToLearnColor,
    removeColor,
    removeWord,
    addToLearnWord,
    addToLearnFurniture,
    removeFurniture,
    addToLearnVehicle,
    removeVehicle,
    addToLearnClothes,
    removeClothes,
    addToLearnShape,
    removeShape
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};