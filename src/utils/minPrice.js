export const minPrice = (priceList) => {
  const prices = (priceList ?? [])
    .filter((item) => item.stock > 0)
    .map((item) => item.price)
    .filter((price) => price > 0);

  return prices.length ? Math.min(...prices) : null;
};
