import React from 'react';

function UndoButton() {
    const handleGoBack = () => {
        window.history.back(); // מחזיר את הדפדפן לדף הקודם
    };

    return (
        <button
            className="
              bg-transparent border-none cursor-pointer p-0
        flex items-center justify-center
        hover:opacity-70 transition-opacity duration-200
      "
            onClick={handleGoBack}
        >
            <img
                src="/images/undo.png" // הנתיב לאייקון, ביחס לתיקיית public
                alt="Undo"
                className="w-8 h-8 block" // w-8 ו-h-8 מגדירים רוחב וגובה של 32px (8*4)
            />
        </button>
    );
}

export default UndoButton;