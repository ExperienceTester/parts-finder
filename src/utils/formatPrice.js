const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
});

export const formatPrice = (price) => (price ? formatter.format(price) : "-");
