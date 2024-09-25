import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template5 = ({ data }) => {
  const { billTo, invoice, from, items, tax, notes } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const discount = subTotal * 0.1; // 10% discount
  const taxableAmount = subTotal - discount;
  const sgst = taxableAmount * 0.09; // 9% SGST
  const cgst = taxableAmount * 0.09; // 9% CGST
  const total = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-green-600">Invoice</h1>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">{from.name}</h2>
            <p>{from.address}</p>
            <p>Surat, Gujarat, India - 394210</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>GST: 29VGCED1234K2Z6</p>
            <p>PAN: VGCED1234K</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Invoice Details</h3>
              <p><span className="font-semibold">Invoice #:</span> {invoice.number}</p>
              <p><span className="font-semibold">Invoice Date:</span> {format(new Date(invoice.date), 'MMM dd, yyyy')}</p>
              <p><span className="font-semibold">Due Date:</span> {format(new Date(invoice.paymentDate), 'MMM dd, yyyy')}</p>
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
              <th className="p-2 text-left">HSN</th>
              <th className="p-2 text-right">Qty.</th>
              <th className="p-2 text-right">GST</th>
              <th className="p-2 text-right">Taxable Amount</th>
              <th className="p-2 text-right">SGST</th>
              <th className="p-2 text-right">CGST</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{item.name}</td>
                <td className="p-2">06</td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">9%</td>
                <td className="p-2 text-right">{formatCurrency(item.amount)}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount * 0.09)}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount * 0.09)}</td>
                <td className="p-2 text-right">{formatCurrency(item.quantity * item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <p><span className="font-semibold">Country of supply:</span> India</p>
            <p><span className="font-semibold">Place of supply:</span> Gujarat</p>
            <h3 className="text-lg font-semibold text-green-600 mt-4 mb-2">Invoice total in words</h3>
            <p className="text-green-600">Forty Two thousand Four Hundred and Eighty</p>
            <h3 className="text-lg font-semibold text-green-600 mt-4 mb-2">Payments</h3>
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Mode</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-right">Amount</th>
                  <th className="p-2 text-right">Transaction Charge</th>
                  <th className="p-2 text-right">TDS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">May 06, 2020</td>
                  <td className="p-2">Net Banking</td>
                  <td className="p-2"><span className="bg-green-200 text-green-800 px-2 py-1 rounded">Approved</span></td>
                  <td className="p-2 text-right">{formatCurrency(3000)}</td>
                  <td className="p-2 text-right">{formatCurrency(0)}</td>
                  <td className="p-2 text-right">{formatCurrency(0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-1/3">
            <p className="flex justify-between"><span>Sub Total:</span> <span>{formatCurrency(subTotal)}</span></p>
            <p className="flex justify-between text-green-600"><span>Discount (10%):</span> <span>- {formatCurrency(discount)}</span></p>
            <p className="flex justify-between"><span>Taxable Amount:</span> <span>{formatCurrency(taxableAmount)}</span></p>
            <p className="flex justify-between"><span>SGST:</span> <span>{formatCurrency(sgst)}</span></p>
            <p className="flex justify-between"><span>CGST:</span> <span>{formatCurrency(cgst)}</span></p>
            <p className="flex justify-between font-bold text-lg mt-2"><span>Total Due:</span> <span className="text-green-600">{formatCurrency(total)}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Terms and Conditions</h3>
            <ol className="list-decimal list-inside">
              <li>Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</li>
              <li>Please quote invoice number when remitting funds.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Bank & Payment Details</h3>
            <p><span className="font-semibold">Account Holder Name:</span> {from.name}</p>
            <p><span className="font-semibold">Account Number:</span> 45366287987</p>
            <p><span className="font-semibold">IFSC:</span> SBIN0018159</p>
            <p><span className="font-semibold">Account Type:</span> Savings</p>
            <p><span className="font-semibold">Bank:</span> State Bank of India</p>
            <p><span className="font-semibold">UPI:</span> foobarlabs@oksbi</p>
          </div>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-green-600 mb-2">Additional Notes</h3>
            <p>{notes}</p>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>For any enquiries, email us on foobarlabs@gmail.com or call us on +91 98765 43210</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template5;