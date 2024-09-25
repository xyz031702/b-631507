import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template4 = ({ data }) => {
  const { billTo, shipTo, invoice, from, items, tax, notes } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const discount = subTotal * 0.1; // 10% discount
  const taxableAmount = subTotal - discount;
  const cgst = taxableAmount * 0.09; // 9% CGST
  const sgst = taxableAmount * 0.09; // 9% SGST
  const total = taxableAmount + cgst + sgst;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-600 mb-4">Invoice</h1>
            <p><span className="font-semibold">Invoice#:</span> {invoice.number}</p>
            <p><span className="font-semibold">Invoice Date:</span> {format(new Date(invoice.date), 'MMM dd, yyyy')}</p>
            <p><span className="font-semibold">Due Date:</span> {format(new Date(invoice.paymentDate), 'MMM dd, yyyy')}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">{from.name}</h2>
            <img src="/placeholder.svg" alt="Company Logo" className="w-24 h-24 ml-auto" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Billed by</h3>
            <p>{from.name}</p>
            <p>{from.address}</p>
            <p>GSTIN: 29ABCED1234F2Z5</p>
            <p>PAN: ABCED1234F</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Billed to</h3>
            <p>{billTo.name}</p>
            <p>{billTo.address}</p>
            <p>GSTIN: 29VGCED1234K2Z6</p>
            <p>PAN: VGCED1234K</p>
          </div>
        </div>

        <div className="mb-8">
          <p><span className="font-semibold">Place of Supply:</span> Karnataka</p>
          <p><span className="font-semibold">Country of Supply:</span> India</p>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-2 text-left">Item #/Item Description</th>
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
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
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
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Bank & Payment Details</h3>
            <p><span className="font-semibold">Account Holder Name:</span> {from.name}</p>
            <p><span className="font-semibold">Account Number:</span> 45366287987</p>
            <p><span className="font-semibold">IFSC:</span> HDFC0018159</p>
            <p><span className="font-semibold">Account Type:</span> Savings</p>
            <p><span className="font-semibold">Bank:</span> HDFC Bank</p>
            <p><span className="font-semibold">UPI:</span> foobarlabs@okhdfcbank</p>
          </div>
          <div className="w-1/3">
            <p className="flex justify-between"><span>Sub Total:</span> <span>{formatCurrency(subTotal)}</span></p>
            <p className="flex justify-between text-green-600"><span>Discount (10%):</span> <span>- {formatCurrency(discount)}</span></p>
            <p className="flex justify-between"><span>Taxable Amount:</span> <span>{formatCurrency(taxableAmount)}</span></p>
            <p className="flex justify-between"><span>CGST:</span> <span>{formatCurrency(cgst)}</span></p>
            <p className="flex justify-between"><span>SGST:</span> <span>{formatCurrency(sgst)}</span></p>
            <p className="flex justify-between font-bold text-lg mt-2"><span>Total:</span> <span>{formatCurrency(total)}</span></p>
            <p className="text-sm mt-2">Invoice Total (in words): {numberToWords(total)} Rupees Only</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">Terms and Conditions</h3>
          <ol className="list-decimal list-inside">
            <li>Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</li>
            <li>Please quote invoice number when remitting funds.</li>
          </ol>
        </div>

        {notes && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-purple-600 mb-2">Additional Notes</h3>
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

// Helper function to convert number to words
function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  function convertLessThanOneThousand(n) {
    if (n >= 100) {
      return ones[Math.floor(n / 100)] + ' Hundred ' + convertLessThanOneThousand(n % 100);
    }
    if (n >= 20) {
      return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
    }
    if (n >= 10) {
      return teens[n - 10];
    }
    return ones[n];
  }

  if (num === 0) return 'Zero';

  let result = '';
  if (num >= 100000) {
    result += convertLessThanOneThousand(Math.floor(num / 100000)) + ' Lakh ';
    num %= 100000;
  }
  if (num >= 1000) {
    result += convertLessThanOneThousand(Math.floor(num / 1000)) + ' Thousand ';
    num %= 1000;
  }
  if (num > 0) {
    result += convertLessThanOneThousand(num);
  }

  return result.trim();
}

export default Template4;