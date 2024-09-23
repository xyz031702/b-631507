import React, { useState } from 'react';
import '../styles.css';
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <form className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
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
          <div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
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
          <div>
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
        </div>

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
        <button type="button" onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4">Add Item</button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
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
          <div>
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Generate Bill</button>
          <button type="button" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default Index;
