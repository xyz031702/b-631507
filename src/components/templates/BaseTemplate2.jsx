import React from 'react';

const BaseTemplate2 = ({ children, width = "794px", height = "1123px", className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg mx-auto ${className}`}
      style={{ width, height }}
    >
      {children}
    </div>
  );
};

export default BaseTemplate2;
