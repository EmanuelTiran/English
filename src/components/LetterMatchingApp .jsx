import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Star, Trophy } from 'lucide-react';

const LetterMatchingApp = () => {
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const allLetters = [...upperCaseLetters, ...lowerCaseLetters];

  // Function to get random letter that hasn't been completed
  const getRandomLetter = (completedSet) => {
    const availableLetters = allLetters.filter(letter => !completedSet.has(letter));
    if (availableLetters.length === 0) return 'A'; // Fallback if all are completed
    return availableLetters[Math.floor(Math.random() * availableLetters.length)];
  };

  const [currentLetter, setCurrentLetter] = useState(() => getRandomLetter(new Set()));
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showFeedback, setShowFeedback] = useState('');
  const [completedLetters, setCompletedLetters] = useState(new Set());
  const [gameComplete, setGameComplete] = useState(false);

  // Generate random letters for options based on currentLetter case
  const generateOptions = (correctLetter) => {
    const isUpperCase = correctLetter === correctLetter.toUpperCase() && correctLetter !== correctLetter.toLowerCase();
    let optionsPool;
    let correctOption;

    if (isUpperCase) {
      optionsPool = lowerCaseLetters;
      correctOption = correctLetter.toLowerCase();
    } else {
      optionsPool = upperCaseLetters;
      correctOption = correctLetter.toUpperCase();
    }

    const options = [correctOption];
    const otherLettersInPool = optionsPool.filter(l => l !== correctOption);

    // Add 3 random wrong options from the correct pool (uppercase or lowercase)
    while (options.length < 4) {
      const randomLetter = otherLettersInPool[Math.floor(Math.random() * otherLettersInPool.length)];
      if (!options.includes(randomLetter)) {
        options.push(randomLetter);
      }
    }

    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const [options, setOptions] = useState(() => generateOptions(currentLetter));

  // Text-to-speech function
  const speakLetter = (letter) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-play letter sound when new letter appears
  useEffect(() => {
    const timer = setTimeout(() => {
      speakLetter(currentLetter);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentLetter]);

  const handleAnswer = (selectedLetter) => {
    const isUpperCase = currentLetter === currentLetter.toUpperCase() && currentLetter !== currentLetter.toLowerCase();
    const correctMatchingLetter = isUpperCase ? currentLetter.toLowerCase() : currentLetter.toUpperCase();

    const isCorrect = selectedLetter === correctMatchingLetter;
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      setScore(prev => prev + 1);
      setCompletedLetters(prev => new Set([...prev, currentLetter]));
      setShowFeedback('correct');

      // Check if game is complete
      if (completedLetters.size + 1 >= 52) { // +1 because currentLetter is not yet added to completedLetters
        setGameComplete(true);
      }
    } else {
      setShowFeedback('incorrect');
    }

    // Show feedback for 1.5 seconds, then move to next letter
    setTimeout(() => {
      setShowFeedback('');
      if (isCorrect) {
        // Move to next random letter
        const newCompletedLetters = new Set([...completedLetters, currentLetter]);
        const nextLetter = getRandomLetter(newCompletedLetters);
        setCurrentLetter(nextLetter);
        setOptions(generateOptions(nextLetter));
      }
    }, 1500);
  };

  const resetGame = () => {
    const newCompletedLetters = new Set();
    const startingLetter = getRandomLetter(newCompletedLetters);
    setCurrentLetter(startingLetter);
    setScore(0);
    setTotalQuestions(0);
    setCompletedLetters(newCompletedLetters);
    setShowFeedback('');
    setGameComplete(false);
    setOptions(generateOptions(startingLetter));
  };

  const progressPercentage = (completedLetters.size / 52) * 100;

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-600 mb-2">You completed all 52 letters!</p>
          <p className="text-lg text-gray-500 mb-6">Final Score: {score}/{totalQuestions}</p>
          <button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Letter Matching Game</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">Score: {score}/{totalQuestions}</span>
            </div>
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">Progress: {completedLetters.size}/52 letters completed</p>
        </div>

        {/* Current Letter Display */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Find the matching letter:</h2>
          <div className="relative">
            <div className="text-8xl font-bold text-blue-600 mb-4 animate-pulse">
              {currentLetter}
            </div>
            <button
              onClick={() => speakLetter(currentLetter)}
              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
              title="Play sound"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== ''}
              className={`
                text-6xl font-bold py-8 px-4 rounded-2xl border-4 transition-all duration-200
                ${showFeedback === ''
                  ? 'bg-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
                  : 'opacity-50 cursor-not-allowed'
                }
                ${showFeedback === 'correct' && ((option.toLowerCase() === currentLetter.toLowerCase() && option !== currentLetter) || (option.toUpperCase() === currentLetter.toUpperCase() && option !== currentLetter))
                  ? 'bg-green-100 border-green-400 text-green-700'
                  : ''
                }
                ${showFeedback === 'incorrect' && ((option.toLowerCase() === currentLetter.toLowerCase() && option !== currentLetter) || (option.toUpperCase() === currentLetter.toUpperCase() && option !== currentLetter))
                  ? 'bg-green-100 border-green-400 text-green-700'
                  : ''
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center py-4 rounded-2xl ${
            showFeedback === 'correct'
              ? 'bg-green-100 border-2 border-green-400'
              : 'bg-red-100 border-2 border-red-400'
          }`}>
            <div className="text-4xl mb-2">
              {showFeedback === 'correct' ? '🎉' : '❌'}
            </div>
            <p className={`text-xl font-semibold ${
              showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'
            }`}>
              {showFeedback === 'correct' ? 'Great job!' : 'Try again!'}
            </p>
            {showFeedback === 'incorrect' && (
              <p className="text-sm text-gray-600 mt-2">
                The correct answer is: <span className="font-bold text-2xl">{currentLetter === currentLetter.toUpperCase() ? currentLetter.toLowerCase() : currentLetter.toUpperCase()}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterMatchingApp;