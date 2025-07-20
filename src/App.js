import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import LetterMatchingApp from './components/LetterMatchingApp ';
import LetterKeyboard from './components/LetterKeyboard';
import LetterSlider from './components/LetterSlider';
import LettersHome from './components/LettersHome';
import AnimalTable from './components/AnimalTable';
import Items from './components/Items';
import AnimalSlider from './components/AnimalSlider';
import AnimalMatchingApp from "./components/AnimalMatchingApp";
import FoodTable from "./components/FoodTable";
import FoodSlider from "./components/FoodSlider";
import FoodMatchingApp from "./components/FoodMatchingApp ";
import HebrewEnglishTranslator from "./components/HebrewEnglishTranslator";

function App() {
  const [animalsToLearn, setAnimalsToLearn] = useState([]);
  const [foodToLearn, setFoodToLearn] = useState([]);

  const addToLearn = (animal) => {
    if (!animalsToLearn.includes(animal)) {
      setAnimalsToLearn((prev) => [...prev, animal]);
    }
    console.log(animalsToLearn)
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
            <Route path="/Letters1" element={<LetterMatchingApp />} />
            <Route path="/Letters2" element={<LetterKeyboard />} />
            <Route path="/Letters3" element={<LetterSlider />} />
            <Route path="/Items" element={<Items/>} />
            <Route path="/Animal1" element={<AnimalTable onAddToLearn={addToLearn}/>} />
            <Route path="/Animal2" element={<AnimalSlider animals={animalsToLearn}/>} />
            <Route path="/Animal3" element={<AnimalMatchingApp animals={animalsToLearn}/>} />
            <Route path="/Foods" element={<FoodTable onAddToLearn={addToLearnFood}/>} />
            <Route path="/Food2" element={<FoodSlider foodItems={foodToLearn}/>} />
            <Route path="/Food3" element={<FoodMatchingApp foodItems={foodToLearn}/>} />
            <Route path="/123" element={<HebrewEnglishTranslator/>} />
            {/* <Route path="/Hearing" element={<Hearing />} /> */}
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