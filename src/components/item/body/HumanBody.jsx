import React, { useState } from 'react';

const HumanBody = () => {
  const [clickedPart, setClickedPart] = useState('');

  const bodyParts = [
    { name: 'Head', style: { top: '12%', left: '50%', width: '80px', height: '80px', borderRadius: '50%' } },
    { name: 'Left Eye', style: { top: '18%', left: '45%', width: '12px', height: '12px', borderRadius: '50%' } },
    { name: 'Right Eye', style: { top: '18%', left: '55%', width: '12px', height: '12px', borderRadius: '50%' } },
    { name: 'Mouth', style: { top: '26%', left: '50%', width: '30px', height: '15px', borderRadius: '15px' } },
    { name: 'Left Ear', style: { top: '14%', left: '36%', width: '16px', height: '25px', borderRadius: '50%' } },
    { name: 'Right Ear', style: { top: '14%', left: '64%', width: '16px', height: '25px', borderRadius: '50%' } },
    { name: 'Neck', style: { top: '32%', left: '50%', width: '20px', height: '25px', borderRadius: '10px' } },
    { name: 'Body', style: { top: '47%', left: '50%', width: '90px', height: '110px', borderRadius: '20px' } },
    { name: 'Belly', style: { top: '52%', left: '50%', width: '50px', height: '40px', borderRadius: '20px' } },
    { name: 'Left Arm', style: { top: '45%', left: '28%', width: '20px', height: '80px', borderRadius: '20px', transform: 'rotate(15deg)' } },
    { name: 'Right Arm', style: { top: '45%', left: '72%', width: '20px', height: '80px', borderRadius: '20px', transform: 'rotate(-15deg)' } },
    { name: 'Left Hand', style: { top: '60%', left: '22%', width: '25px', height: '25px', borderRadius: '50%' } },
    { name: 'Right Hand', style: { top: '60%', left: '78%', width: '25px', height: '25px', borderRadius: '50%' } },
    { name: 'Left Leg', style: { top: '75%', left: '44%', width: '25px', height: '90px', borderRadius: '15px' } },
    { name: 'Right Leg', style: { top: '75%', left: '56%', width: '25px', height: '90px', borderRadius: '15px' } },
    { name: 'Left Knee', style: { top: '82%', left: '44%', width: '20px', height: '20px', borderRadius: '50%' } },
    { name: 'Right Knee', style: { top: '82%', left: '56%', width: '20px', height: '20px', borderRadius: '50%' } },
    { name: 'Left Foot', style: { top: '90%', left: '44%', width: '35px', height: '18px', borderRadius: '10px' } },
    { name: 'Right Foot', style: { top: '90%', left: '56%', width: '35px', height: '18px', borderRadius: '10px' } },
  ];

  const handleClick = (partName) => {
    setClickedPart(partName);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(partName);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '320px',
      height: '520px',
      margin: 'auto',
      background: 'linear-gradient(180deg, #A0E9FF, #E0F7FA)',
      border: '4px solid #90CAF9',
      borderRadius: '30px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    }}>
      {/* Character background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/images/kid-body-outline.svg")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.05
      }} />

      {/* Interactive body parts */}
      {bodyParts.map((part) => (
        <button
          key={part.name}
          onClick={() => handleClick(part.name)}
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            backgroundColor: 'rgba(255, 192, 203, 0.9)',
            border: '2px solid #FF69B4',
            borderRadius: '50%',
            color: 'transparent',
            transition: 'all 0.3s',
            zIndex: 2,
            ...part.style,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 105, 180, 1)';
            e.target.style.transform = 'translate(-50%, -50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 192, 203, 0.9)';
            e.target.style.transform = 'translate(-50%, -50%) scale(1)';
          }}
        >
          {/* invisible but accessible text */}
          {part.name}
        </button>
      ))}

      {/* Label for clicked part */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '12px 16px',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Comic Sans MS, Arial, sans-serif',
        fontSize: '16px',
        color: '#0077B6',
        minWidth: '200px',
        textAlign: 'center'
      }}>
        {clickedPart ? `🎯 ${clickedPart} 🎯` : 'Click on a body part to learn!'}
      </div>
    </div>
  );
};

export default HumanBody;
