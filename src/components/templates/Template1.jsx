import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template1 = ({ data }) => {
  const { billTo, shipTo, invoice, from, items, tax, notes } = data;

  return (
    <BaseTemplate data={data}>
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">{from.name}</h1>
          <p>{from.address}</p>
          <p>{from.phone}</p>
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
            <span>Subtotal:</span>
            <span>${calculateSubTotal(items)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax:</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${calculateGrandTotal(items, tax)}</span>
          </div>
        </div>
      </div>

      {notes && (
        <div className="mt-8 border-t pt-4">
          <h3 className="font-semibold mb-2">Notes:</h3>
          <p>{notes}</p>
        </div>
      )}
    </BaseTemplate>
  );
};

export default Template1;
