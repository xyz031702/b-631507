import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from '../components/ItemDetails';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [billTo, setBillTo] = useState({ name: '', address: '', phone: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', phone: '' });
  const [invoice, setInvoice] = useState({ date: '', paymentDate: '' });
  const [from, setFrom] = useState({ name: '', address: '', phone: '' });
  const [items, setItems] = useState([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState('');

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
    return (subTotal + parseFloat(tax)).toFixed(2);
  };

  const handleGenerateBill = () => {
    const formData = { billTo, shipTo, invoice, from, items, tax, notes };
    navigate('/template', { state: { formData } });
  };

  const handleClearForm = () => {
    setBillTo({ name: '', address: '', phone: '' });
    setShipTo({ name: '', address: '', phone: '' });
    setInvoice({ date: '', paymentDate: '' });
    setFrom({ name: '', address: '', phone: '' });
    setItems([{ name: '', description: '', quantity: 0, amount: 0, total: 0 }]);
    setTax(0);
    setNotes('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bill Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={(e) => e.preventDefault()}>
          <BillToSection billTo={billTo} handleInputChange={handleInputChange(setBillTo)} />
          <ShipToSection
            shipTo={shipTo}
            handleInputChange={handleInputChange(setShipTo)}
            billTo={billTo}
          />

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

          <ItemDetails items={items} handleItemChange={handleItemChange} addItem={addItem} />

          {/* Totals */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Totals</h3>
            <div className="flex justify-between mb-2">
              <span>Sub Total:</span>
              <span>{calculateSubTotal()}</span>
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
            <Button onClick={handleGenerateBill}>Generate Bill</Button>
            <Button variant="destructive" onClick={handleClearForm}>Clear Form</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
