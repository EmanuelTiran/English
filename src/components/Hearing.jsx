import React, { useState, useEffect } from 'react';
import { Volume2, RotateCcw, Star, Trophy, Play, VolumeX } from 'lucide-react';
import { defaultSentences } from '../icons';

const playSound = (type) => {
    const sounds = {
        correct: "/sounds/correct.mp3",
        incorrect: "/sounds/wrong.mp3",
        win: "/sounds/win.mp3"
    };
    try {
        const audio = new Audio(sounds[type]);
        audio.play();
    } catch (e) {
        console.warn("Could not play sound:", e);
    }
};

function selectRandomSentences(sentencesArray, numberOfSentences = 10) {
    const shuffled = [...sentencesArray];
    let currentIndex = shuffled.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffled[currentIndex], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[currentIndex],
        ];
    }

    return shuffled.slice(0, numberOfSentences);
}

const Hearing = ({ sentences }) => {
    const randomTenSentences = selectRandomSentences(defaultSentences);

    const sentencesList = sentences || randomTenSentences;

    const getRandomSentence = (completedSet) => {
        const available = sentencesList.filter(s => !completedSet.has(s));
        return available.length === 0 ? null : available[Math.floor(Math.random() * available.length)];
    };

    const [currentSentence, setCurrentSentence] = useState(() => getRandomSentence(new Set()));
    const [options, setOptions] = useState(() => currentSentence ? generateOptions(currentSentence) : []);
    const [backgroundAudio] = useState(() => {
        try {
            return new Audio('/sounds/background.mp3');
        } catch (e) {
            return null;
        }
    });
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [showFeedback, setShowFeedback] = useState('');
    const [completedSentences, setCompletedSentences] = useState(new Set());
    const [gameComplete, setGameComplete] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(true);

    const speakSentence = (sentence) => {
        if ('speechSynthesis' in window) {
            // עצור דיבור קודם אם יש
            speechSynthesis.cancel();

            setIsPlaying(true);
            const utterance = new SpeechSynthesisUtterance(sentence);
            utterance.lang = 'en-US';
            utterance.rate = 0.6;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            utterance.onend = () => {
                setIsPlaying(false);
                setShowOptions(true);
            };

            speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        if (backgroundAudio) {
            backgroundAudio.loop = true;
            backgroundAudio.volume = 0.3;

            if (isMusicOn) {
                backgroundAudio.play().catch(e => {
                    console.warn("Autoplay failed. User interaction is required.", e);
                });
            } else {
                backgroundAudio.pause();
            }

            return () => {
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0;
            };
        }
    }, [backgroundAudio, isMusicOn]);

    const toggleMusic = () => {
        setIsMusicOn(prev => {
            const newState = !prev;
            if (backgroundAudio) {
                if (newState) {
                    backgroundAudio.play().catch(e => {
                        console.warn("Could not play background music:", e);
                    });
                } else {
                    backgroundAudio.pause();
                }
            }
            return newState;
        });
    };

    function generateOptions(correct) {
        const options = [correct];
        const others = sentencesList.filter(s => s !== correct);
        while (options.length < 4 && others.length > 0) {
            const rand = others[Math.floor(Math.random() * others.length)];
            if (!options.includes(rand)) options.push(rand);
        }
        return options.sort(() => Math.random() - 0.5);
    }

    const handleAnswer = (selected) => {
        const isCorrect = selected === currentSentence;
        setTotalQuestions(prev => prev + 1);

        if (isCorrect) {
            playSound("correct");
            const newCompleted = new Set([...completedSentences, currentSentence]);
            setCompletedSentences(newCompleted);
            setScore(prev => prev + 1);
            setShowFeedback('correct');
            if (newCompleted.size >= sentencesList.length) {
                setGameComplete(true);
                if (backgroundAudio) backgroundAudio.pause();
                playSound("win");
            }
        } else {
            playSound("incorrect");
            setShowFeedback('incorrect');
        }

        setTimeout(() => {
            setShowFeedback('');
            setShowOptions(false);
            if (isCorrect) {
                const next = getRandomSentence(new Set([...completedSentences, currentSentence]));
                setCurrentSentence(next);
                setOptions(next ? generateOptions(next) : []);
            }
        }, 2000);
    };

    const resetGame = () => {
        const fresh = new Set();
        const first = getRandomSentence(fresh);
        if (backgroundAudio && isMusicOn) backgroundAudio.play();
        setCurrentSentence(first);
        setOptions(first ? generateOptions(first) : []);
        setScore(0);
        setTotalQuestions(0);
        setCompletedSentences(fresh);
        setShowFeedback('');
        setShowOptions(false);
        setGameComplete(false);
        speechSynthesis.cancel();
        setIsPlaying(false);
    };

    const progress = (completedSentences.size / sentencesList.length) * 100;

    if (!sentencesList || sentencesList.length === 0) {
        return <div className="text-center p-10 text-red-600 font-bold">❗ No sentences provided</div>;
    }

    if (gameComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-200 p-6">
                <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full">
                    <div className="text-6xl mb-4">🎉</div>
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Perfect Hearing!</h2>
                    <p className="text-lg text-gray-600 mb-2">Score: {score}/{totalQuestions}</p>
                    <p className="text-sm text-gray-500 mb-4">
                        You've completed all {sentencesList.length} sentences!
                    </p>
                    <button
                        onClick={resetGame}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">🎧 Hearing Game</h1>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-500 w-5 h-5" />
                            <span className="text-gray-700 font-semibold">Score: {score}/{totalQuestions}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={toggleMusic}
                                className={`p-2 rounded-full transition-colors ${isMusicOn
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                    }`}
                                title={isMusicOn ? "Turn off background music" : "Turn on background music"}
                            >
                                {isMusicOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={resetGame}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600">Progress: {completedSentences.size}/{sentencesList.length} sentences</p>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl text-gray-700 mb-6">Listen and choose the correct sentence</h2>
                    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-6">
                        <div className="text-6xl mb-4">
                            {isPlaying ? '🎵' : '👂'}
                        </div>
                        <button
                            onClick={() => speakSentence(currentSentence)}
                            disabled={isPlaying || showFeedback !== ''}
                            className={`
                bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto
                ${isPlaying || showFeedback !== '' ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}
              `}
                            title="Play sentence"
                        >
                            {isPlaying ? (
                                <>
                                    <Volume2 className="w-6 h-6 animate-pulse" />
                                    Playing...
                                </>
                            ) : (
                                <>
                                    <Play className="w-6 h-6" />
                                    Play Sentence
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
                    {showOptions ? (
                        options.map((sentence, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(sentence)}
                                disabled={showFeedback !== ''}
                                className={`
                  text-lg font-medium py-4 px-6 rounded-xl border-2 transition-all duration-200 text-left
                  ${showFeedback === ''
                                        ? 'bg-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:scale-98'
                                        : 'opacity-50 cursor-not-allowed'}
                  ${showFeedback === 'correct' && sentence === currentSentence ? 'bg-green-100 border-green-400 text-green-700' : ''}
                  ${showFeedback === 'incorrect' && sentence === currentSentence ? 'bg-green-100 border-green-400 text-green-700' : ''}
                `}
                            >
                                <span className="text-blue-500 font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                                {sentence}
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">🤔</div>
                            <p className="text-xl text-gray-600 font-medium">
                                {isPlaying ? "Listen carefully..." : "Click 'Play Sentence' to hear the audio"}
                            </p>
                        </div>
                    )}
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
                            {showFeedback === 'correct' ? 'Excellent hearing!' : 'Not quite right!'}
                        </p>
                        {showFeedback === 'incorrect' && (
                            <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">The correct answer was:</p>
                                <p className="font-bold text-lg text-gray-800 bg-white p-2 rounded-lg mx-4">
                                    "{currentSentence}"
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hearing;