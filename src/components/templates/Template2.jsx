import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template2 = ({ data }) => {
  const { billTo, invoice, items, tax, notes } = data;
  const yourCompany = data.yourCompany || {}; // Use an empty object as fallback

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cyan-500">{yourCompany.name || 'Your Company Name'}</h1>
            <p>{yourCompany.address || 'Your Company Address'}</p>
            <p>{yourCompany.phone || 'Your Company Phone'}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-cyan-500">Tax invoice</h2>
            <p>INVOICE NUMBER: {invoice?.number || 'N/A'}</p>
            <p>DATE: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold text-lg mb-2 text-cyan-500">Bill To</h3>
          <p>{billTo?.name || 'Client Name'}</p>
          <p>{billTo?.address || 'Client Address'}</p>
          <p>{billTo?.phone || 'Client Phone'}</p>
        </div>

        <div className="mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-right">Quantity</th>
                <th className="p-2 text-right">Rate</th>
                <th className="p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.name}</td>
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
            <p>Account name: {yourCompany.name || 'Your Company Name'}</p>
          </div>
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Sub total:</span>
              <span>₹ {calculateSubTotal(items || [])}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>₹ {tax || 0}</span>
            </div>
            <div className="flex justify-between font-bold bg-cyan-500 text-white p-2">
              <span>Total:</span>
              <span>₹ {calculateGrandTotal(items || [], tax || 0)}</span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-8 text-sm">
            <p>Thank you for your business!</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template2;
