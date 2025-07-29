export const DATE_IS_BETWEEN_RANGE = {
  INCLUDE_INCLUDE: 'include_include',
  INCLUDE_EXCLUDE: 'include_exclude',
  EXCLUDE_INCLUDE: 'exclude_include',
  EXCLUDE_EXCLUDE: 'exclude_exclude',
} as const;

export const DATE_IS_BETWEEN_RANGE_ORIGINAL = {
  [DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE]: '[]',
  [DATE_IS_BETWEEN_RANGE.INCLUDE_EXCLUDE]: '[)',
  [DATE_IS_BETWEEN_RANGE.EXCLUDE_INCLUDE]: '(]',
  [DATE_IS_BETWEEN_RANGE.EXCLUDE_EXCLUDE]: '()',
} as const;

export const DATE_COMPARE_DIRECTIONS = {
  FROM_NOW: 'fromNow',
  TO_NOW: 'toNow',
} as const;

/**
 * @description Unit type of dayjs UnitTypeLong
 * @see https://github.com/iamkun/dayjs/blob/dev/types/index.d.ts
 */
export const DATE_UNITS = {
  MILLISECOND: 'millisecond',
  SECOND: 'second',
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
  DATE: 'date',
} as const;
