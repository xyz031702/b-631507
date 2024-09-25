import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template5 = ({ data = {} }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], tax = 0, notes = '' } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-600">Invoice</h1>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{yourCompany.name || 'Company Name'}</h2>
            <p>{yourCompany.address || 'Company Address'}</p>
            <p>{yourCompany.phone || 'Company Phone'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name || 'Client Name'}</p>
            <p>{billTo.address || 'Client Address'}</p>
            <p>{billTo.phone || 'Client Phone'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Invoice Details</h3>
              <p><span className="font-semibold">Invoice #:</span> {invoice.number || 'N/A'}</p>
              <p><span className="font-semibold">Invoice Date:</span> {invoice.date ? format(new Date(invoice.date), 'MMM dd, yyyy') : 'N/A'}</p>
              <p><span className="font-semibold">Due Date:</span> {invoice.paymentDate ? format(new Date(invoice.paymentDate), 'MMM dd, yyyy') : 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Record</h3>
              <p><span className="font-semibold">Paid Amount:</span> {formatCurrency(0)}</p>
              <p><span className="font-semibold">Due Amount:</span> {formatCurrency(total)}</p>
            </div>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 text-left">Item #/Item description</th>
              <th className="p-2 text-right">Qty.</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{item.name || 'Item Name'}</td>
                <td className="p-2 text-right">{item.quantity || 0}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount || 0)}</td>
                <td className="p-2 text-right">{formatCurrency((item.quantity || 0) * (item.amount || 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-1/3">
            <p className="flex justify-between"><span>Sub Total:</span> <span>{formatCurrency(subTotal)}</span></p>
            <p className="flex justify-between"><span>Tax:</span> <span>{formatCurrency(tax)}</span></p>
            <p className="flex justify-between font-bold text-lg mt-2"><span>Total Due:</span> <span className="text-green-600">{formatCurrency(total)}</span></p>
          </div>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Additional Notes</h3>
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template5;
