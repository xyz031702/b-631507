import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Template2 = ({ data }) => {
  const { billTo, invoice, items, tax, notes } = data;
  const yourCompany = data.yourCompany || {}; // Use an empty object as fallback


  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between mb-4 border-b-2 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-cyan-700">
              {yourCompany.name || "Your Company Name"}
            </h1>
            <p>{yourCompany.address || "Your Company Address"}</p>
            <p>{yourCompany.phone || "Your Company Phone"}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold text-cyan-700">Tax invoice</h2>
            <p>INVOICE NUMBER: {invoice?.number || "N/A"}</p>
            <p>DATE: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2 text-cyan-700">Bill To</h3>
          <p>{billTo?.name || "Client Name"}</p>
          <p>{billTo?.address || "Client Address"}</p>
          <p>{billTo?.phone || "Client Phone"}</p>
        </div>

        <div className="mb-8">
          <table className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="p-2 text-left border border-gray-300">ID</th>
                <th className="p-2 text-left border border-gray-300">
                  Description
                </th>
                <th className="p-2 text-right border border-gray-300">
                  Quantity
                </th>
                <th className="p-2 text-right border border-gray-300">Rate</th>
                <th className="p-2 text-right border border-gray-300">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300">{index + 1}</td>
                  <td className="p-2 border border-gray-300">{item.name}</td>
                  <td className="p-2 text-right border border-gray-300">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="p-2 text-right border border-gray-300">
                    {formatCurrency(item.quantity * item.amount)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="4"
                  className="p-2 text-right border border-gray-300"
                >
                  Sub total:
                </td>
                <td
                  colSpan="2"
                  className="p-2 text-right border border-gray-300"
                >
                  {formatCurrency(calculateSubTotal(items || []))}
                </td>
              </tr>
              {tax > 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-2 text-right border border-gray-300"
                  >
                    Tax:
                  </td>
                  <td
                    colSpan="2"
                    className="p-2 text-right border border-gray-300"
                  >
                    {formatCurrency(tax || 0)}
                  </td>
                </tr>
              )}
              <tr className="font-bold bg-cyan-700 text-white">
                <td
                  colSpan="4"
                  className="p-2 text-right border border-gray-300"
                >
                  Total:
                </td>
                <td
                  colSpan="2"
                  className="p-2 text-right border border-gray-300"
                >
                  {formatCurrency(calculateGrandTotal(items || [], tax || 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {notes && (
          <div className="mt-8 text-sm">
            <p>{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template2;
