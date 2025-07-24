import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Star, Trophy } from 'lucide-react';
import NavBar from '../NavBar';

const playSound = (type) => {
  const sounds = {
    correct: "/sounds/correct.mp3",
    incorrect: "/sounds/wrong.mp3",
    win: "/sounds/win.mp3"
  };
  const audio = new Audio(sounds[type]);
  audio.play();
};

const speakWord = (word) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    speechSynthesis.speak(utterance);
  }
};

export default function WordsGame({ navLinks = [] }) {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [backgroundAudio] = useState(() => new Audio('/sounds/background.mp3'));
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showFeedback, setShowFeedback] = useState('');
  const [completedWords, setCompletedWords] = useState(new Set());
  const [gameComplete, setGameComplete] = useState(false);

  // Load words from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedWords") || "[]");
    setWords(stored);
    const firstWord = getRandomWord(new Set(), stored);
    setCurrentWord(firstWord);
    setOptions(firstWord ? generateOptions(firstWord, stored) : []);
  }, []);

  // Play background audio
  useEffect(() => {
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.4;
    backgroundAudio.play().catch(e => {
      console.warn("Autoplay failed. User interaction is required.", e);
    });
    return () => {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    };
  }, [backgroundAudio]);

  const getRandomWord = (completedSet, wordList) => {
    const available = wordList.filter(w => !completedSet.has(w.en));
    return available.length === 0 ? null : available[Math.floor(Math.random() * available.length)];
  };

  const generateOptions = (correct, wordList) => {
    const options = [correct.he];
    const others = wordList.filter(w => w.he !== correct.he && w.he).map(w => w.he);
    while (options.length < 4 && others.length > 0) {
      const randIndex = Math.floor(Math.random() * others.length);
      const rand = others[randIndex];
      if (!options.includes(rand)) {
        options.push(rand);
        others.splice(randIndex, 1); // Remove used option to avoid duplicates
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selected) => {
    const isCorrect = selected === currentWord.he;
    setTotalQuestions(prev => prev + 1);

    if (isCorrect) {
      playSound("correct");
      const newCompleted = new Set([...completedWords, currentWord.en]);
      setCompletedWords(newCompleted);
      setScore(prev => prev + 1);
      setShowFeedback('correct');
      if (newCompleted.size >= words.length) {
        setGameComplete(true);
        backgroundAudio.pause();
        playSound("win");
      }
    } else {
      playSound("incorrect");
      setShowFeedback('incorrect');
    }

    setTimeout(() => {
      setShowFeedback('');
      if (isCorrect) {
        const next = getRandomWord(new Set([...completedWords, currentWord.en]), words);
        setCurrentWord(next);
        setOptions(next ? generateOptions(next, words) : []);
      }
    }, 1500);
  };

  const resetGame = () => {
    const fresh = new Set();
    const first = getRandomWord(fresh, words);
    backgroundAudio.play().catch(e => console.warn("Autoplay failed.", e));
    setCurrentWord(first);
    setOptions(first ? generateOptions(first, words) : []);
    setScore(0);
    setTotalQuestions(0);
    setCompletedWords(fresh);
    setShowFeedback('');
    setGameComplete(false);
  };

  const progress = words.length > 0 ? (completedWords.size / words.length) * 100 : 0;

  if (words.length === 0) {
    return (
      <>
        <div className="text-center p-10 text-red-600 font-bold">❗ No words added yet</div>
        <NavBar navLinks={navLinks} />
      </>
    );
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-200 p-6">
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">All words matched!</h2>
          <p className="text-lg text-gray-600 mb-2">Score: {score}/{totalQuestions}</p>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
        <NavBar navLinks={navLinks} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Word Matching Game</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <span className="text-gray-700 font-semibold">Score: {score}/{totalQuestions}</span>
            </div>
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">Progress: {completedWords.size}/{words.length} words</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-700 mb-4">What is the Hebrew translation?</h2>
          <div className="relative">
            <div className="text-4xl font-bold text-indigo-700 mb-4">{currentWord.en}</div>
            <button
              onClick={() => speakWord(currentWord.en)}
              className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
              title="Play sound"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {options.map((hebrew, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(hebrew)}
              disabled={showFeedback !== ''}
              className={`
                text-xl font-bold py-6 px-4 rounded-xl border-4 transition-all duration-200
                ${showFeedback === ''
                  ? 'bg-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
                  : 'opacity-50 cursor-not-allowed'}
                ${showFeedback === 'correct' && hebrew === currentWord.he ? 'bg-green-100 border-green-400 text-green-700' : ''}
                ${showFeedback === 'incorrect' && hebrew === currentWord.he ? 'bg-green-100 border-green-400 text-green-700' : ''}
              `}
              dir="rtl"
            >
              {hebrew}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`text-center py-4 rounded-2xl animate__animated ${showFeedback === 'correct'
              ? 'bg-green-100 border-2 border-green-400 animate__bounceIn'
              : 'bg-red-100 border-2 border-red-400 animate__shakeX'
            }`}>
            <div className="text-4xl mb-2">
              {showFeedback === 'correct' ? '🎉' : '❌'}
            </div>
            <p className={`text-xl font-semibold ${showFeedback === 'correct' ? 'text-green-700' : 'text-red-700'}`}>
              {showFeedback === 'correct' ? 'Great job!' : 'Try again!'}
            </p>
            {showFeedback === 'incorrect' && (
              <p className="text-sm text-gray-600 mt-2" dir="rtl">
                The correct answer was: <span className="font-bold text-lg">{currentWord.he}</span>
              </p>
            )}
          </div>
        )}
      </div>
      <NavBar navLinks={navLinks} />
    </div>
  );
}