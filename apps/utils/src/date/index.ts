import * as calculations from './calculations';
import * as core from './core';
import * as formatting from './formatting';
import * as validation from './validation';

export * from './calculations/constants';
export * from './core/constants';
export * from './formatting/constants';

export type {
  DateAddParams,
  DateCompareParams,
  DateDiffParams,
  DateIsAfterParams,
  DateIsBeforeParams,
  DateIsBetweenParams,
  DateIsSameParams,
  DateMaxParams,
  DateMinMaxParams,
  DateMinParams,
  DateSubtractParams,
  DateUnit,
} from './calculations/types';
export type {
  DateDateParams,
  DateDayParams,
  DateEndOfParams,
  DateGetParams,
  DateMonthParams,
  DateSetParams,
  DateStartOfParams,
  DateTimeZoneParams,
  DateType,
  DateYearParams,
} from './core/types';
export type {
  DateParseType,
  DateToParseDateTypeParams,
  DateToStringParams,
} from './formatting/types';
export type { DateIsValidParams } from './validation/types';

export const date = {
  ...calculations,
  ...core,
  ...formatting,
  ...validation,
};
