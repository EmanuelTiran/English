import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './word/Button';
import Input from './Input1';
import Textarea from './Textarea';

const CustomStoryBuilder = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

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
    const clean = word.replace(/[.,!?;]/g, '');
    setSelectedWord(clean);
    translateWord(clean);
  };

  const translateWord = async (word) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|he`
      );
      const data = await response.json();
      if (data.responseStatus === 200) {
        setTranslation(data.responseData.translatedText);
      } else {
        throw new Error('Translation failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderClickableText = (text) => {
    return text.split(' ').map((word, i) => {
      const clean = word.replace(/[.,!?;]/g, '');
      const isSelected = clean === selectedWord;
      return (
        <motion.span
          whileHover={{ scale: 1.1 }}
          key={i}
          className={`cursor-pointer mx-0.5 px-1 py-0.5 rounded transition ${
            isSelected
              ? 'bg-blue-600 text-white shadow'
              : 'hover:bg-blue-100 hover:text-blue-800'
          }`}
          onClick={() => handleWordClick(word)}
        >
          {word}{' '}
        </motion.span>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-gray-800"
      >
        📝 בנה סיפור בעצמך עם תרגום והשמעה
      </motion.h1>

      <div className="grid gap-4">
        <Input
          placeholder="כותרת הסיפור"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="כתוב כאן את הסיפור שלך..."
          rows={6}
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <div className="flex gap-4 justify-center">
          <Button onClick={() => speakText(title + '. ' + story)}>
            {isSpeaking ? '⏸️ עצור השמעה' : '🔊 השמע סיפור'}
          </Button>
          <Button variant="outline" onClick={() => {
            setSelectedWord('');
            setTranslation('');
            setError('');
          }}>
            🔄 איפוס תרגום
          </Button>
        </div>
      </div>

      {(title || story) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-700 text-center">
            {renderClickableText(title)}
          </h2>
          <div className="text-lg text-gray-800 font-serif leading-relaxed">
            {renderClickableText(story)}
          </div>
        </motion.div>
      )}

      {selectedWord && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-blue-800 text-lg">
              המילה שנבחרה: {selectedWord}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => speakText(selectedWord)}
            >
              🔊 השמע מילה
            </Button>
          </div>

          {isLoading ? (
            <div className="text-blue-700">🔄 מתרגם...</div>
          ) : error ? (
            <div className="text-red-600">❌ {error}</div>
          ) : (
            translation && (
              <div className="text-green-800 text-xl font-bold">
                🇮🇱 {translation}
              </div>
            )
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CustomStoryBuilder;
