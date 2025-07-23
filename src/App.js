import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { AppProvider, useAppContext } from "./components/useAppContext";
import { AppRoutes } from "./components/AppRoutes";



function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto p-8 mt-8 bg-white rounded shadow-lg">
            <AppRoutes />
          </main>
          <footer className="bg-gray-700 text-white p-4 mt-8 text-center">
            <p>&copy; 2025 My English App. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;