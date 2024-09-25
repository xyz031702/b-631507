import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template1 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, tax, notes } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  };

  return (
    <BaseTemplate data={data}>
      <div className="flex justify-between items-center mb-8">
        <div className="text-right">
          <h2 className="text-3xl font-semibold">INVOICE</h2>
        </div>
      </div>

      <div className="flex justify-between mb-12">
        <div>
          <h1 className="text-2xl font-bold">{yourCompany.name}</h1>
          <p>{yourCompany.address}</p>
          <p>{yourCompany.phone}</p>
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
          <tr className="border-t border-b bg-gray-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-center">Quantity</th>
            <th className="p-2 text-right">Unit Price</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={`border-t border-b ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
              <td className="p-2">
                {item.name}
                <div className="text-sm text-gray-500">{item.description}</div>
              </td>
              <td className="p-2 text-right">{item.quantity}</td>
              <td className="p-2 text-right">{formatCurrency(item.amount)}</td>
              <td className="p-2 text-right">{formatCurrency(item.quantity * item.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>{formatCurrency(calculateSubTotal(items))}</span>
          </div>
          {tax > 0 && (
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{formatCurrency(tax)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(calculateGrandTotal(items, tax))}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold mb-2">Thank you!</h3>
        <p>We appreciate your business.</p>
      </div>

    </BaseTemplate>
  );
};

export default Template1;
