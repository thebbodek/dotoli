import { DateValue, toParseDateType } from '@bbodek/utils';

import { CalendarDateStringParams } from '@/components/Calendar/types';

export const getDateValue = ({
  dateString,
}: CalendarDateStringParams): DateValue =>
  toParseDateType({ date: dateString, type: 'dayjs' });
