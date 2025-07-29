import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import _timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { DATE_UNIX_CORRECTION_TIME } from '@/date/core/constants';
import { DateTimeZoneParams } from '@/date/core/types';

dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(_timezone);
dayjs.tz.setDefault('Asia/Seoul');

export const timezone = (params?: DateTimeZoneParams) => {
  const { date, format, isStrict } = params ?? {};

  const _date =
    typeof date !== 'number' ? date : date * DATE_UNIX_CORRECTION_TIME;

  return dayjs(_date, format, isStrict).tz();
};
