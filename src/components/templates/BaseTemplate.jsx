import React from 'react';

const BaseTemplate = ({ data, children }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      {children}
    </div>
  );
};

export default BaseTemplate;