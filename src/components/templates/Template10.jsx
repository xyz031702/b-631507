import React from 'react';

const Template10 = ({ formData }) => {
  const { billTo, invoice, items, tax } = formData;

  const calculateTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    return (subtotal + tax).toFixed(2);
  };

  return (
    <div className="bg-white p-4" style={{ width: '57mm', height: '38mm', fontSize: '6px' }}>
      <div className="text-center font-bold mb-1">RECEIPT</div>
      <div className="flex justify-between mb-1">
        <span>Invoice: {invoice.number}</span>
        <span>Date: {invoice.date}</span>
      </div>
      <div className="mb-1">Customer: {billTo.name}</div>
      <div className="border-t border-b py-1 mb-1">
        <div className="flex justify-between">
          <span>Item</span>
          <span>Total</span>
        </div>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span>${item.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${calculateTotal()}</span>
      </div>
      <div className="text-center mt-1">Thank You!</div>
    </div>
  );
};

export default Template10;
