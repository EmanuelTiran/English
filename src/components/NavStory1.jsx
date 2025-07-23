import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PencilLine, ArrowRight } from 'lucide-react';

const NavStory = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">Story Tools</h1>

      <div className="grid gap-6 w-full max-w-md">
        <Link
          to="/story"
          className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105"
        >
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-blue-800">Story Translator</h2>
              <p className="text-sm text-gray-500">Translate and listen to stories interactively</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-blue-400" />
        </Link>

        <Link
          to="/myStory"
          className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition hover:scale-105"
        >
          <div className="flex items-center space-x-4">
            <PencilLine className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-green-800">Custom Story Builder</h2>
              <p className="text-sm text-gray-500">Build your own story with interactive tools</p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-green-400" />
        </Link>
      </div>
    </div>
  );
};

export default NavStory;
