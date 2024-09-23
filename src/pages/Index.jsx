import React, { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';

const Index = () => {
  const [billTo, setBillTo] = useState({ name: '', address: '', phone: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', phone: '' });
  const [invoice, setInvoice] = useState({ date: '', paymentDate: '' });
  const [from, setFrom] = useState({ name: '', address: '', phone: '' });
  const [items, setItems] = useState([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState('');
  const [copyBillToShip, setCopyBillToShip] = useState(false);

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

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = subTotal * (tax / 100);
    return (subTotal + taxAmount).toFixed(2);
  };

  const handleCopyBillToShip = (e) => {
    setCopyBillToShip(e.target.checked);
    if (e.target.checked) {
      setShipTo({ ...billTo });
    }
  };

  const templates = [
    { name: 'Template 1', imageUrl: 'https://via.placeholder.com/200x300?text=Template+1' },
    { name: 'Template 2', imageUrl: 'https://via.placeholder.com/200x300?text=Template+2' },
    { name: 'Template 3', imageUrl: 'https://via.placeholder.com/200x300?text=Template+3' },
    { name: 'Template 4', imageUrl: 'https://via.placeholder.com/200x300?text=Template+4' },
    { name: 'Template 5', imageUrl: 'https://via.placeholder.com/200x300?text=Template+5' },
    { name: 'Template 6', imageUrl: 'https://via.placeholder.com/200x300?text=Template+6' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Input Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <form>
            {/* Bill To */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="billToName"
                  label="Name"
                  value={billTo.name}
                  onChange={handleInputChange(setBillTo)}
                  name="name"
                />
                <FloatingLabelInput
                  id="billToPhone"
                  label="Phone"
                  value={billTo.phone}
                  onChange={handleInputChange(setBillTo)}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="billToAddress"
                label="Address"
                value={billTo.address}
                onChange={handleInputChange(setBillTo)}
                name="address"
                className="mt-4"
              />
            </div>

            {/* Ship To */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Ship To</h2>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="copyBillToShip"
                  checked={copyBillToShip}
                  onChange={handleCopyBillToShip}
                  className="mr-2"
                />
                <label htmlFor="copyBillToShip">Same as Bill To</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="shipToName"
                  label="Name"
                  value={shipTo.name}
                  onChange={handleInputChange(setShipTo)}
                  name="name"
                  disabled={copyBillToShip}
                />
                <FloatingLabelInput
                  id="shipToPhone"
                  label="Phone"
                  value={shipTo.phone}
                  onChange={handleInputChange(setShipTo)}
                  name="phone"
                  disabled={copyBillToShip}
                />
              </div>
              <FloatingLabelInput
                id="shipToAddress"
                label="Address"
                value={shipTo.address}
                onChange={handleInputChange(setShipTo)}
                name="address"
                className="mt-4"
                disabled={copyBillToShip}
              />
            </div>

            {/* Invoice Information */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Invoice Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* From */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">From</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="fromName"
                  label="Name"
                  value={from.name}
                  onChange={handleInputChange(setFrom)}
                  name="name"
                />
                <FloatingLabelInput
                  id="fromPhone"
                  label="Phone"
                  value={from.phone}
                  onChange={handleInputChange(setFrom)}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="fromAddress"
                label="Address"
                value={from.address}
                onChange={handleInputChange(setFrom)}
                name="address"
                className="mt-4"
              />
            </div>

            {/* Item Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <FloatingLabelInput
                    id={`itemName${index}`}
                    label="Name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                  />
                  <FloatingLabelInput
                    id={`itemDescription${index}`}
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                  <FloatingLabelInput
                    id={`itemQuantity${index}`}
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                  />
                  <FloatingLabelInput
                    id={`itemAmount${index}`}
                    label="Amount"
                    type="number"
                    value={item.amount}
                    onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value))}
                  />
                  <FloatingLabelInput
                    id={`itemTotal${index}`}
                    label="Total"
                    type="number"
                    value={item.total}
                    disabled
                  />
                </div>
              ))}
              <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Item</button>
            </div>

            {/* Totals */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span>{calculateSubTotal()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax (%):</span>
                <input
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(parseFloat(e.target.value))}
                  className="w-24 p-2 border rounded"
                />
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>{calculateGrandTotal()}</span>
              </div>
            </div>

            {/* Notes */}
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
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Generate Bill</button>
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Form</button>
            </div>
          </form>
        </div>

        {/* Right Section - Template Gallery */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
          <h2 className="text-2xl font-semibold mb-4">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="template-card bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300">
                <img src={template.imageUrl} alt={`Template ${index + 1}`} className="w-full h-40 object-cover rounded mb-2" />
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
