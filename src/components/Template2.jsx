import React from 'react';

const Template2 = ({ data }) => {
  const { billTo, shipTo, invoice, from, items, tax, notes } = data;

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.amount), 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal + parseFloat(tax)).toFixed(2);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg" style={{ width: '210mm', height: '297mm', margin: '0 auto' }}>
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">{from.name}</h1>
          <p>{from.address}</p>
          <p>{from.phone}</p>
        </div>
        <div className="w-1/2 text-right">
          <h2 className="text-2xl font-semibold mb-2">TAX INVOICE</h2>
          <p>Invoice #: {invoice.date}</p>
          <p>Due Date: {invoice.paymentDate}</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <h3 className="font-semibold text-lg mb-2">Bill To:</h3>
          <p>{billTo.name}</p>
          <p>{billTo.address}</p>
          <p>{billTo.phone}</p>
        </div>
        <div className="w-1/2">
          <h3 className="font-semibold text-lg mb-2">Ship To:</h3>
          <p>{shipTo.name}</p>
          <p>{shipTo.address}</p>
          <p>{shipTo.phone}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-right">Quantity</th>
            <th className="p-2 text-right">Amount</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">${item.amount.toFixed(2)}</td>
              <td className="p-2 text-right">${(item.quantity * item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span>${calculateSubTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Tax:</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${calculateGrandTotal()}</span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">Notes:</h3>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
};

export default Template2;