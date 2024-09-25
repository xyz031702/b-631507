import React from 'react';

const BaseTemplate = ({ data, children }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg mx-auto" style={{ width: '794px', height: '1123px' }}>
      {children}
    </div>
  );
};

export default BaseTemplate;
