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
import LetterMatchingApp from "./LetterMatchingApp ";
import LettersHome from "./LettersHome";
import HumanBody from "./item/body/HumanBody";
import { useAppContext } from "./useAppContext";
import MatchingGame from "../components/ItemMatchingApp";

import { animalIcons, animals, colorIcons, colorsItem, foodIcons, foodItems } from '../icons';
import {
  linksToAnimalForTable, linksToColorsForTable, linksToFoodForTable,
  linksToAnimalForSlider, linksToColorsForSlider, linksToFoodForSlider,
  linksToAnimalForGame, linksToColorsForGame, linksToFoodForGame,
  linksToWordsForTable , linksToWordsForSlider,linksToWordsForGame
} from '../links';
import StoryTranslator from './StoryTranslator';
import CustomStoryBuilder from './CustomStoryBuilder';
import WordsTable from './word/WordsTable.jsx';
import WordsGame from './word/WordsGame.jsx';
import WordsSlider from './word/WordsSlider.jsx';

export const AppRoutes = () => {
  const {
    animalsToLearn,
    foodToLearn,
    colorToLearn,
    addToLearn,
    wordToLearn,
    removeAnimal,
    addToLearnFood,
    removeFood,
    addToLearnColor,
    removeColor,
    removeWord,
    addToLearnWord
  } = useAppContext();

  return (
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
    </Routes>
  );
};