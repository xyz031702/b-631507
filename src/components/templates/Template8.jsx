import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template8 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, tax, notes } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const totalDue = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-gray-100 p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">Invoice</h1>
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">Unpaid</span>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{yourCompany.name}</h2>
            <p>{yourCompany.address}</p>
            <p>{yourCompany.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>{billTo.phone}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Invoice Details</h3>
            <p><span className="font-semibold">Invoice #:</span> {invoice.number}</p>
            <p><span className="font-semibold">Invoice Date:</span> {invoice.date}</p>
            <p><span className="font-semibold">Due Date:</span> {invoice.paymentDate}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount)}</td>
                <td className="p-2 text-right">{formatCurrency(item.quantity * item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-1/2">
            <div className="flex justify-between mb-2">
              <span>Sub Total:</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total Due:</span>
              <span className="text-blue-600">{formatCurrency(totalDue)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Notes:</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template8;
