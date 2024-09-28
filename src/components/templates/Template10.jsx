import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatCurrency';

const Template10 = ({ data }) => {
  const { billTo = {}, invoice = {}, yourCompany = {}, items = [], tax = 0 } = data || {};

  const subTotal = calculateSubTotal(items);
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-4" style={{ width: '57mm', height: '38mm', fontSize: '6px' }}>
        <div className="text-center font-bold mb-1">RECEIPT</div>
        <div className="flex justify-between mb-1">
          <span>Invoice: {invoice.number || 'N/A'}</span>
          <span>Date: {invoice.date ? format(new Date(invoice.date), "MM/dd/yyyy") : 'N/A'}</span>
        </div>
        <div className="mb-1">Customer: {billTo.name || 'N/A'}</div>
        <div className="border-t border-b py-1 mb-1">
          <div className="flex justify-between">
            <span>Item</span>
            <span>Total</span>
          </div>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.name || 'N/A'}</span>
              <span>{formatCurrency((item.quantity || 0) * (item.amount || 0))}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="text-center mt-1">Thank You!</div>
      </div>
    </BaseTemplate>
  );
};

export default Template10;
