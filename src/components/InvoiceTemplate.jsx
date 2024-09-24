import React from 'react';
import Template1 from './Template1';
import Template2 from './Template2';

const InvoiceTemplate = ({ data, templateNumber }) => {
  if (templateNumber === 2) {
    return <Template2 data={data} />;
  }
  return <Template1 data={data} />;
};

export default InvoiceTemplate;
