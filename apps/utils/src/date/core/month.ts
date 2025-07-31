import { timezone } from '@/date/core/timezone';
import { DateMonthParams } from '@/date/core/types';

export const month = ({ date }: DateMonthParams) => timezone({ date }).month();
