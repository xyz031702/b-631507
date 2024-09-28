import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Template10 from '../components/templates/Template10';
import { generateReceiptPDF } from '../utils/receiptPDFGenerator';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ItemDetails from '../components/ItemDetails';

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  const [billTo, setBillTo] = useState('');
  const [invoice, setInvoice] = useState({ date: '', number: generateRandomInvoiceNumber() });
  const [yourCompany, setYourCompany] = useState({ name: '', address: '', phone: '' });
  const [items, setItems] = useState([
    { name: '', description: '', quantity: 0, amount: 0, total: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [theme, setTheme] = useState('classic');
  const [notes, setNotes] = useState('');
  const [footer, setFooter] = useState('');

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem('receiptFormData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo);
      setInvoice(parsedData.invoice);
      setYourCompany(parsedData.yourCompany);
      setItems(parsedData.items);
      setTax(parsedData.tax || 0);
      setNotes(parsedData.notes);
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = { billTo, invoice, yourCompany, items, tax, notes, footer };
    localStorage.setItem('receiptFormData', JSON.stringify(formData));
  }, [billTo, invoice, yourCompany, items, tax, notes]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
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

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'amount') {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal + parseFloat(tax)).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Receipt Generator</h1>
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

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={yourCompany.name}
                  onChange={handleInputChange(setYourCompany)}
                  name="name"
                />
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={yourCompany.phone}
                  onChange={handleInputChange(setYourCompany)}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyAddress"
                label="Address"
                value={yourCompany.address}
                onChange={handleInputChange(setYourCompany)}
                name="address"
                className="mt-4"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
              <FloatingLabelInput
                id="billTo"
                label="Bill To"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                name="billTo"
              />
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Invoice Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Invoice Number"
                  value={invoice.number}
                  onChange={handleInputChange(setInvoice)}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Invoice Date"
                  type="date"
                  value={invoice.date}
                  onChange={handleInputChange(setInvoice)}
                  name="date"
                />
              </div>
            </div>


            <ItemDetails
              items={items}
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
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Footer</h3>
              <textarea
                value={footer}
                onChange={(e) => setFooter(e.target.value)}
                className="w-full p-2 border rounded"
                rows="2"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Receipt Preview</h2>
          <div className="mb-4 flex items-center">
            <h3 className="text-lg font-medium mr-4">Theme</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="classic"
                  checked={theme === 'classic'}
                  onChange={() => setTheme('classic')}
                  className="mr-2"
                />
                Classic
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="vintage"
                  checked={theme === 'vintage'}
                  onChange={() => setTheme('vintage')}
                  className="mr-2"
                />
                Vintage
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="modern"
                  checked={theme === 'modern'}
                  onChange={() => setTheme('modern')}
                  className="mr-2"
                />
                Modern
              </label>
            </div>
          </div>
          <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
            <Template10 data={{ billTo, invoice, yourCompany, items, tax, notes, footer }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
