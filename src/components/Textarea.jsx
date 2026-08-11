import React from 'react';

const Textarea = ({ placeholder, value, onChange, rows = 4, className = '' }) => {
  // FIXED: honor a caller-provided row count and keep 4 as the default.
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${className}`}
      rows={rows}
    />
  );
};

export default Textarea;
