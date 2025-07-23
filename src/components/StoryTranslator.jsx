import React, { useState, useEffect, useRef } from 'react';
import { stories } from '../stories';

const StoryTranslator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStory, setCurrentStory] = useState({ title: "", text: "" });
  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  // טוען את הסיפור לפי האינדקס
  useEffect(() => {
    if (stories.length > 0) {
      setCurrentStory(stories[currentIndex]);
    }
  }, [currentIndex]);

  // דפדוף לסיפור הבא
  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    resetTranslation();
  };

  // דפדוף לסיפור הקודם
  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    resetTranslation();
  };

  const resetTranslation = () => {
    setSelectedWord('');
    setTranslation('');
    setError('');
  };

  const speakText = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    } else {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      synthRef.current.speak(utter);
      setIsSpeaking(true);
      utter.onend = () => setIsSpeaking(false);
    }
  };

  const handleWordClick = (word) => {
    const cleanWord = word.replace(/[.,!?;]/g, '');
    setSelectedWord(cleanWord);
    translateWord(cleanWord);
  };

  const translateWord = async (word) => {
    setIsLoading(true);
    setError('');

    try {
      const cleanWord = word.replace(/[.,!?;]/g, '');
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|he`
      );

      if (!response.ok) throw new Error('שגיאה בקריאה ל-API');

      const data = await response.json();
      if (data.responseStatus === 200) {
        setTranslation(data.responseData.translatedText);
      } else {
        throw new Error('לא ניתן לתרגם את המילה');
      }
    } catch (err) {
      setError('שגיאה בתרגום: ' + err.message);
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderClickableText = (text) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,!?;]/g, '');
      const isSelected = cleanWord === selectedWord;

      return (
        <span
          key={index}
          className={`cursor-pointer transition-all duration-200 rounded px-1 py-0.5 ${
            isSelected
              ? 'bg-blue-500 text-white shadow-md'
              : 'hover:bg-blue-100 hover:text-blue-800'
          }`}
          onClick={() => handleWordClick(word)}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          📚 אפליקציית תרגום סיפור אינטראקטיבית
        </h1>

        {/* כפתורי דפדוף */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={prevStory}
            className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded shadow"
          >
            ⬅️ סיפור קודם
          </button>
          <button
            onClick={nextStory}
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            סיפור הבא ➡️
          </button>
        </div>

        {/* סיפור וכפתור השמעה */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 relative">
          <button
            onClick={() => speakText(currentStory.title + '. ' + currentStory.text)}
            className="absolute top-4 right-4 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded"
          >
            {isSpeaking ? '⏸️ עצור' : '🔊 השמע סיפור'}
          </button>

          {/* כותרת */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
            {renderClickableText(currentStory.title)}
          </h2>

          {/* תוכן הסיפור */}
          <div className="text-lg leading-relaxed text-gray-800 font-serif mb-6">
            {renderClickableText(currentStory.text)}
          </div>
        </div>

        {/* אזור תרגום */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            🔄 תרגום
          </h3>

          {!selectedWord && (
            <div className="text-center text-gray-500">
              👆 לחץ על מילה בכותרת או בסיפור כדי לראות תרגום
            </div>
          )}

          {selectedWord && (
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex justify-center items-center gap-2">
                  <div className="text-lg font-medium text-blue-800">📖 המילה שנבחרה:</div>
                  <div className="text-2xl font-bold text-blue-900">{selectedWord}</div>
                  <button
                    onClick={() => speakText(selectedWord)}
                    className="bg-blue-200 text-blue-800 px-2 py-1 rounded hover:bg-blue-300"
                  >
                    🔊
                  </button>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-lg font-medium text-green-800 mb-2">
                  🇮🇱 תרגום לעברית:
                </div>

                {isLoading && (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-2"></div>
                    <span className="text-green-700">מתרגם...</span>
                  </div>
                )}

                {error && (
                  <div className="text-red-600 font-medium">
                    ❌ {error}
                  </div>
                )}

                {translation && !isLoading && !error && (
                  <div className="text-2xl font-bold text-green-900">{translation}</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 text-center">
          <p className="text-gray-600 text-sm mb-2">
            💡 לחץ על כל מילה בכותרת או בסיפור כדי לקבל תרגום באמצעות API חיצוני
          </p>
          <p className="text-gray-500 text-xs">משתמש ב-MyMemory Translation API</p>
        </div>
      </div>
    </div>
  );
};

export default StoryTranslator;
