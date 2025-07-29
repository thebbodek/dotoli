import { timezone } from '@/date/core/timezone';
import { DateDateParams } from '@/date/core/types';

export const date = ({ date }: DateDateParams) => timezone({ date }).date();
