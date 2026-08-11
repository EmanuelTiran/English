import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AboutPage from "./AboutPage";
import Hearing from "./Hearing";
import HebrewEnglishTranslator from "./HebrewEnglishTranslator";
import HomePage from "./HomePage";
import NavStory from "./NavStory1.jsx";

import ItemSlider from "./ItemSlider";
import ItemTable from "./ItemTable";
import Items from "./Items";
import LetterKeyboard from "./LetterKeyboard";
import LettersHome from "./LettersHome";
import HumanBody from "./item/body/HumanBody";
import { useAppContext } from "./useAppContext";
import MatchingGame from "../components/ItemMatchingApp";

import {
  animalIcons, animals, colorIcons, colorsItem, foodIcons, foodItems,
  furnitureIcons, furnitureItems, vehicleIcons, vehicleItems,
  clothesIcons, clothesItems, shapeIcons, shapeItems
} from '../icons';
import {
  linksToAnimalForTable, linksToColorsForTable, linksToFoodForTable,
  linksToAnimalForSlider, linksToColorsForSlider, linksToFoodForSlider,
  linksToAnimalForGame, linksToColorsForGame, linksToFoodForGame,
  linksToWordsForTable, linksToWordsForSlider, linksToWordsForGame,
  linksToLettersForGame,
  linksToFurnitureForTable, linksToFurnitureForSlider, linksToFurnitureForGame,
  linksToVehicleForTable, linksToVehicleForSlider, linksToVehicleForGame,
  linksToClothesForTable, linksToClothesForSlider, linksToClothesForGame,
  linksToShapesForTable, linksToShapesForSlider, linksToShapesForGame
} from '../links';
import StoryTranslator from './StoryTranslator';
import CustomStoryBuilder from './CustomStoryBuilder';
import WordsTable from './word/WordsTable.jsx';
import WordsGame from './word/WordsGame.jsx';
import WordsSlider from './word/WordsSlider.jsx';

const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const allLetters = [...upperCaseLetters, ...lowerCaseLetters];
const getMatchingLetter = (letter) =>
  letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toUpperCase();
const getOppositeCaseLetters = (letter) =>
  letter === letter.toUpperCase() ? lowerCaseLetters : upperCaseLetters;

export const AppRoutes = () => {
  const {
    animalsToLearn,
    foodToLearn,
    colorToLearn,
    furnitureToLearn,
    vehicleToLearn,
    clothesToLearn,
    shapeToLearn,
    addToLearn,
    wordToLearn,
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
  } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />

      <Route path="/Letters" element={<LettersHome />} />
      <Route path="/Letters2" element={<LetterKeyboard />} />
      <Route path="/Letters3" element={<ItemSlider letters={true} />} />
      {/* FIXED: the letter game now reuses ItemMatchingApp while preserving upper/lower-case matching. */}
      <Route path="/Letters1" element={<MatchingGame
        items={allLetters}
        navLinks={linksToLettersForGame}
        getCorrectOption={getMatchingLetter}
        getOptionPool={getOppositeCaseLetters}
        renderCurrentItem={(letter) => letter}
        title="Letter Matching Game"
        prompt="Which letter matches?"
        completionTitle="All letters matched!"
        progressLabel="letters"
        optionClassName="text-4xl"
      />} />

      <Route path="/Items" element={<Items />} />

      <Route path="/Animal1" element={<ItemTable
        items={animals}
        title="What animal items will we learn about today?"
        nameField="name"
        iconField="icon"
        onAddToLearn={addToLearn}
        onRemoveFromLearn={removeAnimal}
        existingItems={animalsToLearn}
        navLinks={linksToAnimalForTable}
      />} />
      <Route path="/Animal2" element={<ItemSlider items={animalsToLearn} itemIcons={animalIcons} navLinks={linksToAnimalForSlider} />} />
      <Route path="/Animal3" element={<MatchingGame items={animalsToLearn} navLinks={linksToAnimalForGame} />} />

      <Route path="/Foods" element={<ItemTable
        items={foodItems}
        title="What food items will we learn about today?"
        nameField="name"
        iconField="icon"
        onAddToLearn={addToLearnFood}
        onRemoveFromLearn={removeFood}
        existingItems={foodToLearn}
        navLinks={linksToFoodForTable}
      />} />
      <Route path="/Food2" element={<ItemSlider items={foodToLearn} itemIcons={foodIcons} navLinks={linksToFoodForSlider} />} />
      <Route path="/Food3" element={<MatchingGame items={foodToLearn} navLinks={linksToFoodForGame} />} />

      <Route path="/colors" element={<ItemTable
        items={colorsItem}
        title="What colors will we learn about today?"
        nameField="name"
        iconField="icon"
        onAddToLearn={addToLearnColor}
        onRemoveFromLearn={removeColor}
        existingItems={colorToLearn}
        navLinks={linksToColorsForTable}
      />} />
      <Route path="/color2" element={<ItemSlider items={colorToLearn} itemIcons={colorIcons} navLinks={linksToColorsForSlider} />} />
      <Route path="/color3" element={<MatchingGame items={colorToLearn} navLinks={linksToColorsForGame} />} />

      {/* FIXED: complete Furniture with selection, slider, and matching routes. */}
      <Route path="/furniture" element={<ItemTable
        items={furnitureItems}
        title="What furniture will we learn about today?"
        onAddToLearn={addToLearnFurniture}
        onRemoveFromLearn={removeFurniture}
        existingItems={furnitureToLearn}
        navLinks={linksToFurnitureForTable}
      />} />
      <Route path="/furniture2" element={<ItemSlider
        items={furnitureToLearn}
        itemIcons={furnitureIcons}
        navLinks={linksToFurnitureForSlider}
      />} />
      <Route path="/furniture3" element={<MatchingGame
        items={furnitureToLearn}
        navLinks={linksToFurnitureForGame}
      />} />

      {/* FIXED: complete Vehicle with selection, slider, and matching routes. */}
      <Route path="/Vehicle" element={<ItemTable
        items={vehicleItems}
        title="What vehicles will we learn about today?"
        onAddToLearn={addToLearnVehicle}
        onRemoveFromLearn={removeVehicle}
        existingItems={vehicleToLearn}
        navLinks={linksToVehicleForTable}
      />} />
      <Route path="/Vehicle2" element={<ItemSlider
        items={vehicleToLearn}
        itemIcons={vehicleIcons}
        navLinks={linksToVehicleForSlider}
      />} />
      <Route path="/Vehicle3" element={<MatchingGame
        items={vehicleToLearn}
        navLinks={linksToVehicleForGame}
      />} />

      {/* FIXED: complete Clothes with selection, slider, and matching routes. */}
      <Route path="/Clothes" element={<ItemTable
        items={clothesItems}
        title="What clothes will we learn about today?"
        onAddToLearn={addToLearnClothes}
        onRemoveFromLearn={removeClothes}
        existingItems={clothesToLearn}
        navLinks={linksToClothesForTable}
      />} />
      <Route path="/Clothes2" element={<ItemSlider
        items={clothesToLearn}
        itemIcons={clothesIcons}
        navLinks={linksToClothesForSlider}
      />} />
      <Route path="/Clothes3" element={<MatchingGame
        items={clothesToLearn}
        navLinks={linksToClothesForGame}
      />} />

      {/* FIXED: complete Shapes with selection, slider, and matching routes. */}
      <Route path="/Shapes" element={<ItemTable
        items={shapeItems}
        title="What shapes will we learn about today?"
        onAddToLearn={addToLearnShape}
        onRemoveFromLearn={removeShape}
        existingItems={shapeToLearn}
        navLinks={linksToShapesForTable}
      />} />
      <Route path="/Shapes2" element={<ItemSlider
        items={shapeToLearn}
        itemIcons={shapeIcons}
        navLinks={linksToShapesForSlider}
      />} />
      <Route path="/Shapes3" element={<MatchingGame
        items={shapeToLearn}
        navLinks={linksToShapesForGame}
      />} />

      <Route path="/123" element={<HebrewEnglishTranslator />} />
      <Route path="/body" element={<HumanBody />} />
      <Route path="/Hearing" element={<Hearing />} />

      <Route path="/words" element={<WordsTable onAddToLearn={addToLearnWord}
        onRemoveFromLearn={removeWord}
        existingItems={wordToLearn}
        navLinks={linksToWordsForTable} />} />
      <Route path="/words2" element={<WordsSlider  navLinks={linksToWordsForSlider} />} />
      <Route path="/words3" element={<WordsGame navLinks={linksToWordsForGame}/>} />

      <Route path="/navStory" element={<NavStory />} />
      <Route path="/story" element={<StoryTranslator />} />
      <Route path="/myStory" element={<CustomStoryBuilder />} />
      <Route path="*" element={<h2 className="text-red-500 text-2xl">404 - Page Not Found</h2>} />


      <Route path="/stam" element={<StoryTranslator />} />
    </Routes>
  );
};