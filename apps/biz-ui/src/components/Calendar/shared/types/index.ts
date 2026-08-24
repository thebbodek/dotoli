export interface CalendarMonthValue {
  year: number;
  month: number;
}

export interface FormatCalendarYearProps
  extends Pick<CalendarMonthValue, 'year'> {}

export interface FormatCalendarDateLabelProps extends CalendarMonthValue {
  date: number;
}
