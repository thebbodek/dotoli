import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { timezone } from '@/date/core/timezone';
import { DATE_FORMATS } from '@/date/formatting/constants';
import { DateIsValidParams } from '@/date/validation/types';

dayjs.extend(customParseFormat);

export const isValid = ({
  date,
  format = DATE_FORMATS['YYYY-MM-DD'],
}: DateIsValidParams) => timezone({ date, format, isStrict: true }).isValid();
