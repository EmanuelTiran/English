import React, { useState } from 'react';
import { Languages, ArrowLeftRight, Wifi, WifiOff } from 'lucide-react';

export default function HebrewEnglishTranslator() {
  const [inputWord, setInputWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // פונקציה לזיהוי שפה מקומית
  const detectLanguage = (text) => {
    const hebrewPattern = /[\u0590-\u05FF]/;
    if (hebrewPattern.test(text)) {
      return { code: 'he', name: 'Hebrew', displayName: 'עברית' };
    }
    return { code: 'en', name: 'English', displayName: 'אנגלית' };
  };

  // פונקציה לתרגום באמצעות API חיצוני
  const translateText = async (text, fromLang, toLang) => {
    try {
      // שימוש ב-MyMemory Translation API (חינמי)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200 || data.responseStatus === "200") {
        return {
          translatedText: data.responseData.translatedText,
          confidence: data.responseData.match
        };
      } else {
        throw new Error('Translation service returned an error');
      }
    } catch (error) {
      console.error('Translation API Error:', error);
      throw error;
    }
  };

  const handleTranslate = async () => {
    if (!inputWord.trim()) {
      setTranslation('');
      setError('אנא הזן מילה לתרגום');
      setDetectedLanguage('');
      return;
    }

    if (!isOnline) {
      setError('אין חיבור לאינטרנט. אנא בדוק את החיבור שלך.');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslation('');

    try {
      const cleanWord = inputWord.trim();
      const sourceLang = detectLanguage(cleanWord);
      const targetLang = sourceLang.code === 'he' 
        ? { code: 'en', name: 'English', displayName: 'אנגלית' }
        : { code: 'he', name: 'Hebrew', displayName: 'עברית' };

      setDetectedLanguage(sourceLang.displayName);
      setTargetLanguage(targetLang.displayName);

      const result = await translateText(
        cleanWord, 
        sourceLang.code, 
        targetLang.code
      );

      if (result.translatedText) {
        setTranslation(result.translatedText);
      } else {
        setError(`לא הצלחתי לתרגם את המילה "${cleanWord}"`);
      }

    } catch (error) {
      console.error('Translation error:', error);
      
      if (error.message.includes('network') || error.message.includes('fetch')) {
        setError('שגיאת רשת - אנא בדוק את החיבור לאינטרנט');
      } else if (error.message.includes('HTTP error')) {
        setError('שירות התרגום אינו זמין כרגע. נסה שוב מאוחר יותר');
      } else {
        setError('אירעה שגיאה בתרגום. נסה שוב');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTranslate();
    }
  };

  const clearAll = () => {
    setInputWord('');
    setTranslation('');
    setDetectedLanguage('');
    setTargetLanguage('');
    setError('');
  };

  // מאזין לשינויים בסטטוס החיבור
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* כותרת */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Languages className="text-blue-600" size={32} />
              <ArrowLeftRight className="text-gray-400" size={24} />
              <Languages className="text-green-600" size={32} />
              {isOnline ? (
                <Wifi className="text-green-500" size={20} />
              ) : (
                <WifiOff className="text-red-500" size={20} />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              מתרגם עברית ⇄ אנגלית
            </h1>
            <p className="text-gray-600">
              מתרגם מתקדם עם API חיצוני - זיהוי שפה אוטומטי ותרגום מדויק
            </p>
            <div className="mt-2 text-xs text-gray-500">
              מופעל על ידי MyMemory Translation API
            </div>
          </div>

          {/* התראת חיבור */}
          {!isOnline && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <WifiOff size={16} />
                <span className="font-medium">אין חיבור לאינטרנט</span>
              </div>
              <p className="text-red-600 text-sm mt-1">
                התרגום דורש חיבור לאינטרנט כדי לגשת לשירות התרגום החיצוני
              </p>
            </div>
          )}

          {/* שדה קלט */}
          <div className="mb-6">
            <label htmlFor="word-input" className="block text-sm font-medium text-gray-700 mb-2">
              הזן מילה או משפט לתרגום:
            </label>
            <div className="relative">
              <input
                id="word-input"
                type="text"
                value={inputWord}
                onChange={(e) => setInputWord(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="לדוגמה: שלום עולם, Hello world..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                dir="auto"
                disabled={!isOnline}
              />
            </div>
          </div>

          {/* כפתורים */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !isOnline || !inputWord.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  מתרגם...
                </>
              ) : (
                <>
                  <Languages size={20} />
                  תרגם
                </>
              )}
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors duration-200"
            >
              נקה הכל
            </button>
          </div>

          {/* הצגת שגיאות */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* תוצאות */}
          {(translation || detectedLanguage) && !error && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-400">
              {detectedLanguage && (
                <div className="mb-3 flex items-center gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600">שפת המקור: </span>
                    <span className="text-sm font-semibold text-blue-600">
                      {detectedLanguage}
                    </span>
                  </div>
                  <ArrowLeftRight className="text-gray-400" size={16} />
                  <div>
                    <span className="text-sm font-medium text-gray-600">שפת היעד: </span>
                    <span className="text-sm font-semibold text-green-600">
                      {targetLanguage}
                    </span>
                  </div>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-gray-600">תרגום: </span>
                <div className="text-xl font-bold text-gray-800 mt-2" dir="auto">
                  {translation}
                </div>
              </div>
            </div>
          )}

          {/* הדרכה */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">💡 תכונות המתרגם:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• זיהוי אוטומטי של שפת המקור (עברית/אנגלית)</li>
              <li>• תרגום מדויק באמצעות API חיצוני מתקדם</li>
              <li>• תמיכה במילים ומשפטים שלמים</li>
              <li>• עבודה בזמן אמת עם חיבור לאינטרנט</li>
              <li>• אינדיקטור סטטוס חיבור</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}