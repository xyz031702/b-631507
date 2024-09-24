import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';

const ShipToSection = ({ shipTo, handleInputChange, copyBillToShip, handleCopyBillToShip }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Ship To</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="copyBillToShip"
            checked={copyBillToShip}
            onChange={handleCopyBillToShip}
            className="mr-2"
          />
          <label htmlFor="copyBillToShip">Same as Bill To</label>
        </div>
      </div>
      {!copyBillToShip && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="shipToName"
              label="Name"
              value={shipTo.name}
              onChange={handleInputChange}
              name="name"
            />
            <FloatingLabelInput
              id="shipToPhone"
              label="Phone"
              value={shipTo.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>
          <FloatingLabelInput
            id="shipToAddress"
            label="Address"
            value={shipTo.address}
            onChange={handleInputChange}
            name="address"
            className="mt-4"
          />
        </>
      )}
    </div>
  );
};

export default ShipToSection;