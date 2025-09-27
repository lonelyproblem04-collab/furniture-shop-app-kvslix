
export const formatCurrency = (amount: number): string => {
  return `₵${amount.toFixed(2)}`;
};

export const formatCurrencyWithoutDecimals = (amount: number): string => {
  return `₵${Math.round(amount)}`;
};
