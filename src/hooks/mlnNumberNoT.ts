export const formatPriceNoT = (price: number) => {
  return `${(price / 1000000).toFixed(0)}`;
};
