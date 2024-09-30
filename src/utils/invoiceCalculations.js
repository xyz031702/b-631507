export const calculateSubTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.quantity * item.amount), 0).toFixed(2);
};

export const calculateTaxAmount = (subTotal, taxPercentage) => {
  return (parseFloat(subTotal) * (taxPercentage / 100)).toFixed(2);
};

export const calculateGrandTotal = (subTotal, taxAmount) => {
  return (parseFloat(subTotal) + parseFloat(taxAmount)).toFixed(2);
};
