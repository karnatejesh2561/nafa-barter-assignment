export const generateRandomPrice = (basePrice = 1.2) => {
  return +(basePrice + (Math.random() - 0.5) * 0.01).toFixed(5);
};