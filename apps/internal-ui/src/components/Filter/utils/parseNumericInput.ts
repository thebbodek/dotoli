interface ParseNumericInputParams {
  value: string;
  isDecimal?: boolean;
  min?: number;
  max?: number;
}

const parseDecimalValue = (value: string) => {
  const onlyNumberAndDot = value.replace(/[^\d.]/g, '');
  const firstDotIndex = onlyNumberAndDot.indexOf('.');

  if (firstDotIndex === -1) return onlyNumberAndDot;

  const integerPart = onlyNumberAndDot.slice(0, firstDotIndex);
  const decimalPart = onlyNumberAndDot
    .slice(firstDotIndex + 1)
    .replace(/\./g, '');

  return `${integerPart}.${decimalPart}`;
};

export const parseNumericInput = ({
  value,
  isDecimal = false,
  min,
  max,
}: ParseNumericInputParams) => {
  const parsedValue = isDecimal
    ? parseDecimalValue(value)
    : value.replace(/[^\d]/g, '');

  if (parsedValue === '' || parsedValue === '.') return parsedValue;

  const numberValue = Number(parsedValue);

  if (Number.isNaN(numberValue)) return parsedValue;

  if (max !== undefined && numberValue > max) return `${max}`;

  if (min !== undefined && numberValue < min) return `${min}`;

  return parsedValue;
};
