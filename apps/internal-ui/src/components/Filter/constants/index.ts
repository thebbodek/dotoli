export const FILTER_TYPES = {
  MULTI_SELECT: 'multi_select',
  SINGLE_SELECT: 'single_select',
  DATE_SINGLE: 'date',
  DATE_RANGE: 'date_range',
  NUMERIC_INPUT: 'numeric_input',
  TEXT_INPUT: 'text_input',
} as const;

export const FILTER_STEPS = {
  IDLE: 'idle',
  SELECT_OPTION: 'select_option',
} as const;

export const FILTER_SELECT_OPTION_MAX_COUNT = 2;
