import { timezone } from '@/date/core/timezone';
import { DateYearParams } from '@/date/core/types';

export const year = ({ date }: DateYearParams) => timezone({ date }).year();
