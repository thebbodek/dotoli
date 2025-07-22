export const toPaddedString = (number: number, length?: number) => {
  console.log(number, length);
  return String(number).padStart(length || 8, '0');
};
