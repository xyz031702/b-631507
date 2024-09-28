import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Template10 from '../components/templates/Template10';
import { generateReceiptPDF } from '../utils/receiptPDFGenerator';

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.formData) {
      setFormData(location.state.formData);
    } else {
      const savedFormData = localStorage.getItem('formData');
      if (savedFormData) {
        setFormData(JSON.parse(savedFormData));
      }
    }
  }, [location.state]);

  const handleDownloadPDF = async () => {
    if (formData && !isDownloading && receiptRef.current) {
      setIsDownloading(true);
      try {
        await generateReceiptPDF(receiptRef.current);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleDownloadPDF} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            "Download Receipt PDF"
          )}
        </Button>
      </div>

      <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
        <Template10 data={formData} />
      </div>
    </div>
  );
};

export default ReceiptPage;
