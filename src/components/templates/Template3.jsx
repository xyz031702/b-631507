import React from 'react';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template3 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, tax } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-blue-500 text-white p-12">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="bg-white text-blue-500 p-2 inline-block rounded">
              <h1 className="text-2xl font-bold">
                {yourCompany?.name || "Your Company Name"}
              </h1>
            </div>
            <p className="mt-2">
              {yourCompany?.address || "Your Company Address"}
            </p>
            <p>{yourCompany?.phone || "Your Company Phone"}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold">BILLED TO</h2>
            <p>{billTo?.name || "Client Name"}</p>
            <p>{billTo?.address || "Client Address"}</p>
            <p>{billTo?.phone || "Client Phone"}</p>
          </div>
        </div>
        <div className="flex justify-between mb-8">
          <div>
            <p>Invoice #: {invoice?.number || "N/A"}</p>
            <p>Invoice Date: {invoice?.date || "N/A"}</p>
          </div>
          <div className="text-right">
            <p>Due Date: {invoice?.paymentDate || "N/A"}</p>
            <p>Due Amount: ₹{calculateGrandTotal(items || [], tax || 0)}</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-300 -mt-12">
        <div className="w-full mb-8">
          <div className="bg-blue-200 flex">
            <div className="p-2 flex-1"></div>
            <div className="p-2 flex-1 text-left">
              ITEM NAME/ITEM DESCRIPTION
            </div>
            <div className="p-2 flex-1 text-right">QTY.</div>
            <div className="p-2 flex-1 text-right">AMOUNT</div>
          </div>
          {(items || []).map((item, index) => (
            <div key={index} className="flex border-t border-b">
              <div className="p-2 flex-1 text-center">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="p-2 flex-1">
                <p className="font-semibold">{item.name || "Item Name"}</p>
                <p className="text-sm text-gray-600">
                  {item.description || "Item Description"}
                </p>
              </div>
              <div className="p-2 flex-1 text-right">{item.quantity || 0}</div>
              <div className="p-2 flex-1 text-right">
                ₹{((item.quantity || 0) * (item.amount || 0)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between mb-2">
              <span>Sub Total:</span>
              <span>₹ {calculateSubTotal(items || [])}</span>
            </div>
            {tax > 0 && (
              <div className="flex justify-between mb-2">
                <span>Tax:</span>
                <span>₹ {tax || 0}</span>
              </div>
            )}
            <div className="flex justify-between font-bold bg-blue-500 text-white p-2 mt-4">
              <span>Total Due Amount</span>
              <span>₹{calculateGrandTotal(items || [], tax || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template3;
