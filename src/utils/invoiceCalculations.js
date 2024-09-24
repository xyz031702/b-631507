export const calculateSubTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.quantity * item.amount), 0).toFixed(2);
};

export const calculateGrandTotal = (items, tax) => {
  const subTotal = parseFloat(calculateSubTotal(items));
  return (subTotal + parseFloat(tax)).toFixed(2);
};