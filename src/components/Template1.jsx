import React from 'react';

const Template1 = ({ data }) => {
  const { billTo, shipTo, invoice, from, items, tax, notes } = data;

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.amount), 0).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal + parseFloat(tax)).toFixed(2);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-right">
          <h2 className="text-3xl font-semibold">INVOICE</h2>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Invoice</h2>
          <p>Date: {invoice.date}</p>
          <p>Due Date: {invoice.paymentDate}</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h3 className="font-semibold">Bill To:</h3>
          <p>{billTo.name}</p>
          <p>{billTo.address}</p>
          <p>{billTo.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold">Ship To:</h3>
          <p>{shipTo.name}</p>
          <p>{shipTo.address}</p>
          <p>{shipTo.phone}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-center">Quantity</th>
            <th className="p-2 text-right">Unit Price</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="p-2">
                {item.name}
                <div className="text-sm text-gray-500">{item.description}</div>
              </td>
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
            <span>Subtotal:</span>
            <span>${calculateSubTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${calculateGrandTotal()}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Thank you!</h3>
        <p>We appreciate your business.</p>
      </div>

    </div>
  );
};

export default Template1;
