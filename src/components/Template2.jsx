import React from 'react';

const Template2 = ({ data }) => {
  const { from, billTo, invoice, items, tax, notes } = data;

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.amount), 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal + parseFloat(tax)).toFixed(2);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-cyan-500">{from.name}</h1>
          <p>{from.address}</p>
          <p>{from.phone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-semibold text-cyan-500">Tax invoice</h2>
          <p>INVOICE NUMBER: {invoice.date}</p>
          <p>DATE: {new Date().toLocaleDateString()}</p>
          <p>GST NUMBER: [GST NUMBER]</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2 text-cyan-500">Bill To</h3>
        <p>{billTo.name}</p>
        <p>{billTo.address}</p>
        <p>{billTo.phone}</p>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">HSN code</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">[HSN CODE]</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">₹ {item.amount.toFixed(2)}</td>
                <td className="p-2 text-right">₹ {(item.quantity * item.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div className="w-1/2">
          <h3 className="font-semibold mb-2">Payment Details</h3>
          <p>Account name: COMPANY NAME</p>
          <p>Account number: 9876543210</p>
          <p>Bank name: ABCD Bank</p>
          <p>IFSC code: ABCD12345678</p>
        </div>
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span>Sub total:</span>
            <span>₹ {calculateSubTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount:</span>
            <span>₹ 0</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax Rate:</span>
            <span>18%</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>₹ {tax}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>₹ 0</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Previous dues:</span>
            <span>₹ 0</span>
          </div>
          <div className="flex justify-between font-bold bg-cyan-500 text-white p-2">
            <span>Total:</span>
            <span>₹ {calculateTotal()}</span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mt-8 text-sm">
          <p>Thank you for your business!</p>
        </div>
      )}
    </div>
  );
};

export default Template2;
