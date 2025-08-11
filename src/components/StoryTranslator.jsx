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
  const [speechRate, setSpeechRate] = useState(1.0); // קצב דיבור רגיל
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

  // פונקציה מעודכנת להשמעת טקסט עם קצב משתנה
  const speakText = (text) => {
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    } else {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = speechRate; // הגדרת קצב הדיבור
      utter.pitch = 1.0;
      utter.volume = 1.0;
      
      synthRef.current.speak(utter);
      setIsSpeaking(true);
      
      utter.onend = () => setIsSpeaking(false);
      utter.onerror = () => setIsSpeaking(false);
    }
  };

  // פונקציות לשינוי קצב הדיבור
  const increaseSpeechRate = () => {
    setSpeechRate(prev => Math.min(prev + 0.25, 2.0));
  };

  const decreaseSpeechRate = () => {
    setSpeechRate(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetSpeechRate = () => {
    setSpeechRate(1.0);
  };

  // קבלת תיאור קצב הדיבור
  const getSpeechRateDescription = () => {
    if (speechRate <= 0.75) return 'איטי מאוד';
    if (speechRate <= 1.0) return 'איטי';
    if (speechRate <= 1.25) return 'רגיל';
    if (speechRate <= 1.5) return 'מהיר';
    return 'מהיר מאוד';
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

        {/* בקרת קצב דיבור */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
            🎵 שליטה בקצב הדיבור
          </h3>
          
          <div className="flex flex-col items-center space-y-4">
            {/* כפתורי מהירות */}
            <div className="flex items-center gap-4">
              <button
                onClick={decreaseSpeechRate}
                disabled={speechRate <= 0.5}
                className="bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded shadow font-bold"
              >
                🐌 האט
              </button>
              
              <div className="text-center min-w-32">
                <div className="text-lg font-semibold text-gray-700">
                  {speechRate.toFixed(2)}x
                </div>
                <div className="text-sm text-gray-500">
                  {getSpeechRateDescription()}
                </div>
              </div>
              
              <button
                onClick={increaseSpeechRate}
                disabled={speechRate >= 2.0}
                className="bg-green-400 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded shadow font-bold"
              >
                🚀 האץ
              </button>
            </div>

            {/* סליידר */}
            <div className="w-full max-w-md">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.25"
                value={speechRate}
                onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>1.5x</span>
                <span>2.0x</span>
              </div>
            </div>

            {/* כפתור איפוס */}
            <button
              onClick={resetSpeechRate}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
            >
              🔄 איפוס לקצב רגיל
            </button>
          </div>
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
          <p className="text-gray-500 text-xs mb-2">משתמש ב-MyMemory Translation API</p>
          <p className="text-gray-500 text-xs">
            🎵 השתמש בבקרות המהירות כדי להתאים את קצב הדיבור לצרכים שלך
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryTranslator;