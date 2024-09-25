import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import InvoiceTemplate from '../components/InvoiceTemplate';
import { generatePDF } from '../utils/pdfGenerator';

const TemplatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(1);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    }
  }, [location.state]);

  const templates = [
    { name: 'Template 1' },
    { name: 'Template 2' },
    { name: 'Template 3' },
  ];

  const handleTemplateChange = (templateNumber) => {
    setCurrentTemplate(templateNumber);
  };

  const handleDownloadPDF = () => {
    if (formData) {
      generatePDF(formData, currentTemplate);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

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
          {templates.map((template, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 border rounded ${
                currentTemplate === index + 1 ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => handleTemplateChange(index + 1)}
            >
              {template.name}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[210mm] h-[297mm] mx-auto border shadow-lg">
        <InvoiceTemplate data={formData} templateNumber={currentTemplate} />
      </div>
    </div>
  );
};

export default TemplatePage;
