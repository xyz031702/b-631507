import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from '../components/ItemDetails';
import { Button } from "@/components/ui/button";
import { templates } from '../utils/templateRegistry';

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

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [billTo, setBillTo] = useState({ name: '', address: '', phone: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', phone: '' });
  const [invoice, setInvoice] = useState({ date: '', paymentDate: '', number: generateRandomInvoiceNumber() });
  const [yourCompany, setYourCompany] = useState({ name: '', address: '', phone: '' });
  const [items, setItems] = useState([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo);
      setShipTo(parsedData.shipTo);
      setInvoice(parsedData.invoice);
      setYourCompany(parsedData.yourCompany);
      setItems(parsedData.items);
      setTax(parsedData.tax);
      setNotes(parsedData.notes);
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = { billTo, shipTo, invoice, yourCompany, items, tax, notes };
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [billTo, shipTo, invoice, yourCompany, items, tax, notes]);

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

  const handleTemplateClick = (templateNumber) => {
    const formData = { billTo, shipTo, invoice, yourCompany, items, tax, notes };
    navigate('/template', { state: { formData, selectedTemplate: templateNumber } });
  };

  const fillDummyData = () => {
    setBillTo({ name: 'John Doe', address: '123 Main St, Anytown, USA', phone: '(555) 123-4567' });
    setShipTo({ name: 'Jane Smith', address: '456 Elm St, Othertown, USA', phone: '(555) 987-6543' });
    setInvoice({ 
      date: new Date().toISOString().split('T')[0], 
      paymentDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      number: generateRandomInvoiceNumber()
    });
    setYourCompany({ name: 'Your Company', address: '789 Oak St, Businessville, USA', phone: '(555) 555-5555' });
    setItems([
      { name: 'Product A', description: 'High-quality item', quantity: 2, amount: 50, total: 100 },
      { name: 'Service B', description: 'Professional service', quantity: 1, amount: 200, total: 200 }
    ]);
    setTax(30);
    setNotes('Thank you for your business!');
  };

  const clearForm = () => {
    setBillTo({ name: '', address: '', phone: '' });
    setShipTo({ name: '', address: '', phone: '' });
    setInvoice({ date: '', paymentDate: '', number: generateRandomInvoiceNumber() });
    setYourCompany({ name: '', address: '', phone: '' });
    setItems([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
    setTax(0);
    setNotes('');
    localStorage.removeItem('formData');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <Button onClick={fillDummyData} className="mb-4">Fill with Dummy Data</Button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            <BillToSection billTo={billTo} handleInputChange={handleInputChange(setBillTo)} />
            <ShipToSection
              shipTo={shipTo}
              handleInputChange={handleInputChange(setShipTo)}
              billTo={billTo}
            />

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
                <FloatingLabelInput
                  id="paymentDate"
                  label="Payment Date"
                  type="date"
                  value={invoice.paymentDate}
                  onChange={handleInputChange(setInvoice)}
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
                  onChange={(e) => setTax(parseFloat(e.target.value))}
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

            <div className="flex justify-between">
              <Button onClick={clearForm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Form</Button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <div
                key={index}
                className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleTemplateClick(index + 1)}
              >
                <img 
                  src={`/template${index + 1}-preview.png`}
                  alt={template.name} 
                  className="w-full h-40 object-cover rounded mb-2" 
                />
                <p className="text-center font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
