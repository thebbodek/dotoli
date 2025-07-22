import { ToPaddedStringParams } from './types';

export const toPaddedString = ({ number, length = 8 }: ToPaddedStringParams) =>
  String(number).padStart(length, '0');
