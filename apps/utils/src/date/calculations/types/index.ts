import {
  DATE_COMPARE_DIRECTIONS,
  DATE_IS_BETWEEN_RANGE,
  DATE_UNITS,
} from '@/date/calculations/constants';
import { DateTimeZoneParams, DateType } from '@/date/core/types';

export type DateCompareDirection =
  (typeof DATE_COMPARE_DIRECTIONS)[keyof typeof DATE_COMPARE_DIRECTIONS];

export type DateIsBetweenRange =
  (typeof DATE_IS_BETWEEN_RANGE)[keyof typeof DATE_IS_BETWEEN_RANGE];

export type DateUnit = (typeof DATE_UNITS)[keyof typeof DATE_UNITS];

export interface DateIsSameParams extends Pick<DateTimeZoneParams, 'date'> {
  target: DateType;
  unit?: DateUnit;
}

export interface DateIsBetweenParams extends Pick<DateTimeZoneParams, 'date'> {
  from: DateType;
  to: DateType;
  unit?: DateUnit;
  range?: DateIsBetweenRange;
}

export interface DateIsAfterParams extends Pick<DateTimeZoneParams, 'date'> {
  target: DateType;
  unit?: DateUnit;
  isInclude?: boolean;
}

export interface DateIsBeforeParams extends Pick<DateTimeZoneParams, 'date'> {
  target: DateType;
  unit?: DateUnit;
  isInclude?: boolean;
}

export interface DateCompareParams {
  target: DateType;
  direction: DateCompareDirection;
  isRelative?: boolean;
}

export interface DateMinMaxParams {
  dates: DateType[];
}

export interface DateMinParams extends DateMinMaxParams {}

export interface DateMaxParams extends DateMinMaxParams {}

export interface DateDiffParams extends Pick<DateTimeZoneParams, 'date'> {
  target: DateType;
  unit?: DateUnit;
}

export interface DateAddParams extends Pick<DateTimeZoneParams, 'date'> {
  value: number;
  unit?: Exclude<DateUnit, 'date'>;
}

export interface DateSubtractParams extends Pick<DateTimeZoneParams, 'date'> {
  value: number;
  unit?: Exclude<DateUnit, 'date'>;
}
