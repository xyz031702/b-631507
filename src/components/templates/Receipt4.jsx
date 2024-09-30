import React from 'react';

const Receipt4 = ({ data }) => {
  const { billTo, invoice, yourCompany, items, tax, footer, cashier } = data;
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="p-4 font-['Courier_New',_monospace]">
      <h2 className="text-center font-bold">{yourCompany.name}</h2>
      <p className="text-center">{yourCompany.address}</p>
      <p className="text-center">Phone Number: {yourCompany.phone}</p>
      <p className="text-center">GST No: {yourCompany.gst}</p>
      <hr className="my-4" />
      <div>
        <p>Invoice Number: {invoice.number}</p>
        <p>Created By: {data.cashier}</p>
        <p>
          Date & Time: {invoice.date} {currentTime}
        </p>
      </div>
      <hr className="my-4" />
      <div>
        <h3>Bill to:</h3>
        <p>{billTo}</p>
        <span>Place of supply: Chhattisgarh-22</span>
      </div>
      <hr className="my-4" />
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Item</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="align-bottom">
                <td>{item.name}</td>
                <td className="text-right text-sm">{item.quantity}</td>
                <td className="text-right text-sm">{item.amount}</td>
              </tr>
              <tr className="align-top">
                <td colSpan="2" className="text-left text-sm pb-2">
                  HSN Code: {item.description}
                </td>
                <td className="text-right pb-2">Total: {item.total}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr className="my-4" />
      <div className="flex justify-between">
        <span>TOTAL:</span>
        <span>
          INR {items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
        </span>
      </div>
      <hr className="my-4" />
      <p className="text-center">{footer}</p>
    </div>
  );
};

export default Receipt4;
