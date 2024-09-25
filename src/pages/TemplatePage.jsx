import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import { generatePDF } from '../utils/pdfGenerator';

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  const handleTemplateChange = (templateNumber) => {
    setSelectedTemplate(templateNumber);
  };

  const handleDownloadPDF = () => {
    generatePDF(formData, selectedTemplate);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 border rounded ${
                selectedTemplate === index ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => handleTemplateChange(index)}
            >
              Template {index}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[210mm] h-[297mm] mx-auto border shadow-lg">
        <InvoiceTemplate data={formData} templateNumber={selectedTemplate} />
      </div>
    </div>
  );
};

export default TemplatePage;
