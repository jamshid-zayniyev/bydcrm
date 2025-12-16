const formatCurrency = (value: number | string): string => {
  const valueString: string = String(value);

  const num: number = parseFloat(valueString.replace(/[^\d.-]/g, ""));

  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: "UZS",
    minimumFractionDigits: 0,
  })
    .format(num)
    .replace("UZS", "")
    .trim();
};

export default formatCurrency;
