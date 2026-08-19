import { toPaddedString } from '@bbodek/utils';

import { GetStringDateParams } from '@/components/Calendar/types';

export const getStringDate = ({ year, month, day }: GetStringDateParams) =>
  `${year}-${toPaddedString({ number: month, length: 2 })}-${toPaddedString({ number: day, length: 2 })}`;
