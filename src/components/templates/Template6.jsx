import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template6 = ({ data }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], tax = 0, notes = '' } = data || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const totalDueAmount = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">{yourCompany.name || 'Company Name'}</h2>
            <p>{yourCompany.address || 'Company Address'}</p>
            <p>{yourCompany.phone || 'Company Phone'}</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-4">Tax Invoice</h1>
            <p><span className="font-semibold">Invoice No:</span> {invoice.number || 'N/A'}</p>
            <p><span className="font-semibold">Invoice Date:</span> {invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A'}</p>
            <p><span className="font-semibold">Due Date:</span> {invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name || 'Client Name'}</p>
            <p>{billTo.address || 'Client Address'}</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item #/Item description</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">
                  <p className="font-semibold">{item.name || 'Item Name'}</p>
                  <p className="text-sm text-gray-600">{item.description || 'Item Description'}</p>
                </td>
                <td className="p-2 text-right">{item.quantity || 0}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount || 0)}</td>
                <td className="p-2 text-right">{formatCurrency((item.amount || 0) * (item.quantity || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-1/3">
            <table className="w-full text-right">
              <tbody>
                <tr>
                  <td className="p-2">Sub Total</td>
                  <td className="p-2 font-semibold">{formatCurrency(subTotal)}</td>
                </tr>
                <tr>
                  <td className="p-2">Tax</td>
                  <td className="p-2 font-semibold">{formatCurrency(tax)}</td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="p-2">Total Due Amount</td>
                  <td className="p-2 font-semibold">{formatCurrency(totalDueAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {notes && (
          <div className="text-center text-sm border-t pt-4">
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template6;
