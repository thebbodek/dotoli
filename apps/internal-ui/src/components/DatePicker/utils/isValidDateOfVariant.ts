import { CALENDAR_VARIANTS } from '@/components/Calendar';
import { IsValidDateOfVariantParams } from '@/components/DatePicker/types';

export const isValidDateOfVariant = ({
  value,
  variant,
}: IsValidDateOfVariantParams) => {
  if (!value) return true;

  const { startDate, endDate } = value;

  if (variant === CALENDAR_VARIANTS.UNBOUNDED) {
    return startDate !== null && endDate === null;
  }

  return startDate !== null && endDate !== null;
};
