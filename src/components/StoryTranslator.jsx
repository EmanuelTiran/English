import React, { useState, useEffect } from 'react';
import { Book, Play, Pause, RotateCcw } from 'lucide-react';
// וודא שקובץ הסטוריז קיים בנתיב הזה
import { stories } from '../stories'; 

const StoryReaderApp = () => {
  // הגדרת המצבים (States) בתוך הפונקציה
  const [selectedStory, setSelectedStory] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    return () => {
      if (utterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [utterance]);

  const readStory = () => {
    if (!selectedStory) return;

    const words = selectedStory.text.split(' ');
    setCurrentWordIndex(0);
    setIsReading(true);

    const synth = window.speechSynthesis;
    synth.cancel();

    const utteranceInstance = new SpeechSynthesisUtterance(selectedStory.text);
    utteranceInstance.lang = 'he-IL';
    utteranceInstance.rate = 0.8;

    let wordIndex = 0;

    utteranceInstance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordIndex);
        wordIndex++;
      }
    };

    utteranceInstance.onend = () => {
      setIsReading(false);
      setCurrentWordIndex(-1);
    };

    setUtterance(utteranceInstance);
    synth.speak(utteranceInstance);
  };

  const pauseReading = () => {
    window.speechSynthesis.pause();
    setIsReading(false);
  };

  const resumeReading = () => {
    window.speechSynthesis.resume();
    setIsReading(true);
  };

  const resetReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setCurrentWordIndex(-1);
  };

  const renderStoryWithHighlight = () => {
    if (!selectedStory) return null;
    const words = selectedStory.text.split(' ');
    return (
      <div className="text-2xl leading-relaxed text-right">
        {words.map((word, index) => (
          <span
            key={index}
            className={`${
              index === currentWordIndex
                ? 'bg-yellow-300 font-bold px-1 rounded'
                : ''
            } transition-all duration-200`}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    );
  };

  // ה-return המרכזי של הקומפוננטה
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-3">
            <Book size={40} />
            ספריית סיפורים מוקראים
          </h1>
          <p className="text-gray-600">בחר סיפור ותהנה מקריאה מוקראת עם הדגשת מילים</p>
        </div>

        {/* לוגיקת הצגת הסיפורים או הסיפור הנבחר */}
        {!selectedStory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FIXED: render every imported story as an accessible selection card. */}
            {stories.map((story, index) => (
              <button
                key={`${story.title}-${index}`}
                type="button"
                onClick={() => setSelectedStory(story)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-right border-2 border-transparent hover:border-purple-300"
              >
                <h2 className="text-2xl font-bold text-purple-800 mb-2">
                  {story.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {story.text.slice(0, 160)}{story.text.length > 160 ? '…' : ''}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <div className="mb-6">
              <button
                onClick={() => {
                  setSelectedStory(null);
                  resetReading();
                }}
                className="text-purple-600 hover:text-purple-800 mb-4"
              >
                ← חזרה לרשימת הסיפורים
              </button>
              <h2 className="text-3xl font-bold text-purple-800 mb-4">
                {selectedStory.title}
              </h2>
            </div>

            <div className="mb-6 flex gap-3 justify-center">
              {!isReading && currentWordIndex === -1 && (
                <button
                  onClick={readStory}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
                >
                  <Play size={24} />
                  התחל קריאה
                </button>
              )}
              
              {isReading && (
                <button
                  onClick={pauseReading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
                >
                  <Pause size={24} />
                  השהה
                </button>
              )}
              
              {!isReading && currentWordIndex >= 0 && (
                <button
                  onClick={resumeReading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
                >
                  <Play size={24} />
                  המשך
                </button>
              )}
              
              {currentWordIndex >= 0 && (
                <button
                  onClick={resetReading}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold"
                >
                  <RotateCcw size={24} />
                  אתחל
                </button>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border-2 border-purple-200">
              {renderStoryWithHighlight()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryReaderApp;