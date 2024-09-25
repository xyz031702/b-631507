import React from 'react';
import { format } from 'date-fns';
import BaseTemplate from './BaseTemplate';
import { calculateSubTotal, calculateGrandTotal } from '../../utils/invoiceCalculations';

const Template6 = ({ data }) => {
  const { billTo, invoice, from, items, tax, notes } = data;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const subTotal = calculateSubTotal(items);
  const discount = subTotal * 0.1; // 10% discount
  const taxableAmount = subTotal - discount;
  const totalDueAmount = calculateGrandTotal(items, tax);

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <img src="/placeholder.svg" alt="Foobar Labs Logo" className="w-32 h-auto mb-4" />
            <h2 className="text-2xl font-bold text-blue-600">Foobar Labs</h2>
            <p>46, Raghuveer Dham Society</p>
            <p>Surat, Gujarat, India - 394210</p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold mb-4">Tax Invoice</h1>
            <p><span className="font-semibold">Invoice No:</span> {invoice.number}</p>
            <p><span className="font-semibold">Invoice Date:</span> {format(new Date(invoice.date), 'MMM dd, yyyy')}</p>
            <p><span className="font-semibold">Due Date:</span> {format(new Date(invoice.paymentDate), 'MMM dd, yyyy')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Billed to</h3>
            <p className="font-bold">{billTo.name}</p>
            <p>{billTo.address}</p>
            <p><span className="font-semibold">GST No:</span> 29VGCED1234K2Z6</p>
            <p><span className="font-semibold">PAN No:</span> VGCED1234K</p>
          </div>
          <div>
            <p><span className="font-semibold">Country of supply:</span> India</p>
            <p><span className="font-semibold">Place of supply:</span> Gujarat</p>
          </div>
        </div>

        <table className="w-full mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item #/Item description</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Rate</th>
              <th className="p-2 text-right">Discount</th>
              <th className="p-2 text-right">Amount</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </td>
                <td className="p-2 text-right">{item.quantity}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount)}</td>
                <td className="p-2 text-right">12%</td>
                <td className="p-2 text-right">{formatCurrency(item.amount * item.quantity * 0.88)}</td>
                <td className="p-2 text-right">{formatCurrency(item.amount * item.quantity * 0.88)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mb-8">
          <div className="w-1/2">
            <h3 className="text-lg font-semibold mb-2">Terms and Conditions</h3>
            <ol className="list-decimal list-inside text-sm">
              <li>Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.</li>
              <li>Please quote invoice number when remitting funds.</li>
            </ol>

            <h3 className="text-lg font-semibold mt-4 mb-2">Additional Notes</h3>
            <p className="text-sm">{notes || "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'."}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Attachments</h3>
            <ul className="list-disc list-inside text-sm">
              <li>filename.png</li>
              <li>invoice%402x.png</li>
              <li>verified-bank%402x.png</li>
            </ul>
          </div>
          <div className="w-1/3">
            <table className="w-full text-right">
              <tbody>
                <tr>
                  <td className="p-2">Sub Total</td>
                  <td className="p-2 font-semibold">{formatCurrency(subTotal)}</td>
                </tr>
                <tr>
                  <td className="p-2">Discount(10%)</td>
                  <td className="p-2 font-semibold">{formatCurrency(discount)}</td>
                </tr>
                <tr>
                  <td className="p-2">Taxable Amount</td>
                  <td className="p-2 font-semibold">{formatCurrency(taxableAmount)}</td>
                </tr>
                <tr className="bg-blue-600 text-white">
                  <td className="p-2">Total Due Amount</td>
                  <td className="p-2 font-semibold">{formatCurrency(totalDueAmount)}</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm mt-2">
              <span className="font-semibold">Invoice Total in Words:</span><br />
              Forty Two thousand Four Hundred and Eighty Five
            </p>
          </div>
        </div>

        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Bank & Payment Details</h3>
            <table className="text-sm">
              <tbody>
                <tr>
                  <td className="pr-4">Account Holder Name</td>
                  <td>Maurya Sandeep Ramehschandra</td>
                </tr>
                <tr>
                  <td className="pr-4">Account Number</td>
                  <td>34745215203</td>
                </tr>
                <tr>
                  <td className="pr-4">IFSC</td>
                  <td>SBIN0018159</td>
                </tr>
                <tr>
                  <td className="pr-4">Account Type</td>
                  <td>Savings</td>
                </tr>
                <tr>
                  <td className="pr-4">Bank Name</td>
                  <td>State Bank of India</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-2">Authorized Signature</h3>
            <img src="/placeholder.svg" alt="Signature" className="w-32 h-auto ml-auto" />
            <p className="mt-2">Sandeep Maurya</p>
          </div>
        </div>

        <div className="text-center text-sm border-t pt-4">
          <p>For any enquiries, email us on info@foobarlabs.com or call us on +91 98765-43210</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template6;