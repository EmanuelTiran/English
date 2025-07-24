// PageButton.jsx
import React from 'react';
import styled from 'styled-components';

const PageButton = ({ text, isActive, onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>{text}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-size: 16px; /* התאמת גודל פונט */
    letter-spacing: 1px;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    font-weight: bold;
    padding: 8px 12px; /* שמירה על גודל הכפתור המקורי */
    border: 3px solid #32CD32; /* Kid-friendly green */
    border-radius: 6px; /* התאמה לעיגול הקל של הכפתור המקורי */
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
    color: ${({ isActive }) => (isActive ? 'white' : '#32CD32')};
    background-color: ${({ isActive }) => (isActive ? '#32CD32' : '#f3f4f6')};
    text-decoration: none;
    transition: 0.3s ease all;
    z-index: 1;
    min-width: 40px; /* שמירה על רוחב מינימלי */
  }

  button:before {
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #32CD32;
    z-index: -1;
  }

  button:hover,
  button:focus {
    color: white;
  }

  button:hover:before,
  button:focus:before {
    transition: 0.5s all ease;
    left: 0;
    right: 0;
    opacity: 1;
  }

  button:active {
    transform: scale(0.9);
  }
`;

export default PageButton;