import React from 'react';

const Textarea = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      rows={4}
    />
  );
};

export default Textarea;
