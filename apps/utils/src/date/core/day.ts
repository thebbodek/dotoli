import { timezone } from '@/date/core/timezone';
import { DateDayParams } from '@/date/core/types';

export const day = ({ date }: DateDayParams) => timezone({ date }).day();
