import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Template10 from '../components/templates/Template10';
import { generateReceiptPDF } from '../utils/receiptPDFGenerator';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from '../components/ItemDetails';

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

  const handleInputChange = (section) => (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'amount') {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', description: '', quantity: 0, amount: 0, total: 0 }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateSubTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal + parseFloat(formData.tax)).toFixed(2);
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

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            <BillToSection
              billTo={formData.billTo}
              handleInputChange={handleInputChange('billTo')}
            />
            <ShipToSection
              shipTo={formData.shipTo}
              handleInputChange={handleInputChange('shipTo')}
              billTo={formData.billTo}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Invoice Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Invoice Number"
                  value={formData.invoice.number}
                  onChange={handleInputChange('invoice')}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Invoice Date"
                  type="date"
                  value={formData.invoice.date}
                  onChange={handleInputChange('invoice')}
                  name="date"
                />
                <FloatingLabelInput
                  id="paymentDate"
                  label="Payment Date"
                  type="date"
                  value={formData.invoice.paymentDate}
                  onChange={handleInputChange('invoice')}
                  name="paymentDate"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={formData.yourCompany.name}
                  onChange={handleInputChange('yourCompany')}
                  name="name"
                />
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={formData.yourCompany.phone}
                  onChange={handleInputChange('yourCompany')}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyAddress"
                label="Address"
                value={formData.yourCompany.address}
                onChange={handleInputChange('yourCompany')}
                name="address"
                className="mt-4"
              />
            </div>

            <ItemDetails
              items={formData.items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
            />

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span>₹ {calculateSubTotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (Amount):</span>
                <input
                  type="number"
                  value={formData.tax}
                  onChange={(e) => setFormData(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))}
                  className="w-24 p-2 border rounded"
                />
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>₹ {calculateGrandTotal()}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Receipt Preview</h2>
          <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
            <Template10 data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
