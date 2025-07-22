import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { animalIcons, animals, foodIcons, foodItems } from "./icons";
import { linksToAnimal, linksToFood } from "./links";

import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LetterMatchingApp from './components/LetterMatchingApp ';
import LetterKeyboard from './components/LetterKeyboard';
import LettersHome from './components/LettersHome';
import Items from './components/Items';
import HebrewEnglishTranslator from "./components/HebrewEnglishTranslator";
import HumanBody from "./components/item/body/HumanBody";
import MatchingGame from "./components/ItemMatchingApp";
import ItemSlider from "./components/ItemSlider";
import ItemTable from "./components/ItemTable";
import Hearing from "./components/Hearing";
import UndoButton from "./components/UndoButton";

function App() {
  const [animalsToLearn, setAnimalsToLearn] = useState([]);
  const [foodToLearn, setFoodToLearn] = useState([]);



  const addToLearn = (animal) => {
    if (animal !== undefined) {
      if (!animalsToLearn.includes(animal)) {
        setAnimalsToLearn((prev) => [...prev, animal]);
      }
    }

    console.log({ animalsToLearn })
  };

  const addToLearnFood = (foodItem) => {
    if (!foodToLearn.includes(foodItem)) {
      setFoodToLearn((prev) => [...prev, foodItem]);
    }
    console.log(foodToLearn);
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-8 mt-8 bg-white rounded shadow-lg">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/Letters" element={<LettersHome />} />
            <Route path="/Letters2" element={<LetterKeyboard />} />
            <Route path="/Letters3" element={<ItemSlider letters={true} />} />
            <Route path="/Letters1" element={<LetterMatchingApp />} />

            <Route path="/Items" element={<Items />} />

            <Route path="/Animal1" element={<ItemTable
              items={animals}
              title="What animal items will we learn about today?"
              nameField="name"
              iconField="icon"
              onAddToLearn={addToLearn}
              existingItems={animalsToLearn}
              navLinks={linksToAnimal}
            />} />
            <Route path="/Animal2" element={<ItemSlider items={animalsToLearn} itemIcons={animalIcons} />} />
            <Route path="/Animal3" element={<MatchingGame items={animalsToLearn} />} />

            <Route path="/Foods" element={<ItemTable
              items={foodItems}
              title="What food items will we learn about today?"
              nameField="name"
              iconField="icon"
              onAddToLearn={addToLearnFood}
              existingItems={foodToLearn}
              navLinks={linksToFood}
            />} />
            <Route path="/Food2" element={<ItemSlider items={foodToLearn} itemIcons={foodIcons} />} />
            <Route path="/Food3" element={<MatchingGame items={foodToLearn} />} />

            <Route path="/123" element={<HebrewEnglishTranslator />} />
            <Route path="/body" element={<HumanBody />} />
            <Route path="/Hearing" element={<Hearing />} />
            <Route path="*" element={<h2 className="text-red-500 text-2xl">404 - Page Not Found</h2>} />
          </Routes>
        </main>
        <footer className="bg-gray-700 text-white p-4 mt-8 text-center">
          <p>&copy; 2025 My English App. All rights reserved.</p>
        </footer>

      </div>
    </Router>
  );
}

export default App;