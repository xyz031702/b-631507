import React, { useState } from 'react';
import '../styles.css';

const Index = () => {
  const [billTo, setBillTo] = useState({ name: '', address: '', phone: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', phone: '' });
  const [invoice, setInvoice] = useState({ date: '', paymentDate: '' });
  const [from, setFrom] = useState({ name: '', address: '', phone: '' });
  const [items, setItems] = useState([{ sno: 1, name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState('');
  const [templates] = useState([
    { name: 'Template 1', imageUrl: 'https://via.placeholder.com/200x300?text=Template+1' },
    { name: 'Template 2', imageUrl: 'https://via.placeholder.com/200x300?text=Template+2' },
    { name: 'Template 3', imageUrl: 'https://via.placeholder.com/200x300?text=Template+3' },
    { name: 'Template 4', imageUrl: 'https://via.placeholder.com/200x300?text=Template+4' },
    { name: 'Template 5', imageUrl: 'https://via.placeholder.com/200x300?text=Template+5' },
    { name: 'Template 6', imageUrl: 'https://via.placeholder.com/200x300?text=Template+6' },
  ]);

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
    setItems([...items, { sno: items.length + 1, name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = subTotal * (tax / 100);
    return (subTotal + taxAmount).toFixed(2);
  };

  const saveData = (e) => {
    e.preventDefault();
    const data = { billTo, shipTo, invoice, from, items, tax, notes };
    localStorage.setItem('billData', JSON.stringify(data));
    alert('Data saved successfully!');
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      localStorage.removeItem('billData');
      setBillTo({ name: '', address: '', phone: '' });
      setShipTo({ name: '', address: '', phone: '' });
      setInvoice({ date: '', paymentDate: '' });
      setFrom({ name: '', address: '', phone: '' });
      setItems([{ sno: 1, name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
      setTax(0);
      setNotes('');
    }
  };

  const selectTemplate = (template) => {
    alert(`Selected template: ${template.name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Input Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bill Information</h2>
          <form onSubmit={saveData}>
            {/* Bill To */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Bill To</h3>
              <input type="text" name="name" value={billTo.name} onChange={handleInputChange(setBillTo)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="address" value={billTo.address} onChange={handleInputChange(setBillTo)} placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="phone" value={billTo.phone} onChange={handleInputChange(setBillTo)} placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Ship To */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Ship To</h3>
              <input type="text" name="name" value={shipTo.name} onChange={handleInputChange(setShipTo)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="address" value={shipTo.address} onChange={handleInputChange(setShipTo)} placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="phone" value={shipTo.phone} onChange={handleInputChange(setShipTo)} placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Invoice Information */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Invoice Information</h3>
              <input type="date" name="date" value={invoice.date} onChange={handleInputChange(setInvoice)} className="w-full p-2 border rounded mb-2" />
              <input type="date" name="paymentDate" value={invoice.paymentDate} onChange={handleInputChange(setInvoice)} className="w-full p-2 border rounded" />
            </div>

            {/* From */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">From</h3>
              <input type="text" name="name" value={from.name} onChange={handleInputChange(setFrom)} placeholder="Name" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="address" value={from.address} onChange={handleInputChange(setFrom)} placeholder="Address" className="w-full p-2 border rounded mb-2" />
              <input type="text" name="phone" value={from.phone} onChange={handleInputChange(setFrom)} placeholder="Phone" className="w-full p-2 border rounded" />
            </div>

            {/* Item Details */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Item Details</h3>
              {items.map((item, index) => (
                <div key={index} className="flex flex-wrap -mx-2 mb-2">
                  <input type="text" value={item.sno} onChange={(e) => handleItemChange(index, 'sno', e.target.value)} placeholder="S.No" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="text" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} placeholder="Name" className="w-full sm:w-1/4 p-2 border rounded mx-2 mb-2" />
                  <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} placeholder="Description" className="w-full sm:w-1/4 p-2 border rounded mx-2 mb-2" />
                  <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))} placeholder="Quantity" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="number" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value))} placeholder="Amount" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" />
                  <input type="number" value={item.total} placeholder="Total" className="w-full sm:w-1/6 p-2 border rounded mx-2 mb-2" disabled />
                </div>
              ))}
              <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Item</button>
            </div>

            {/* Sub Total Area */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span>{calculateSubTotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <input type="number" value={tax} onChange={(e) => setTax(parseFloat(e.target.value))} className="w-24 p-2 border rounded" />
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>{calculateGrandTotal()}</span>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Notes</h3>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded" rows="4"></textarea>
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save Data</button>
              <button type="button" onClick={clearData} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Data</button>
            </div>
          </form>
        </div>

        {/* Right Section - Template Gallery */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => selectTemplate(template)}>
                <img src={template.imageUrl} alt="Template Preview" className="w-full h-40 object-cover rounded mb-2" />
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
