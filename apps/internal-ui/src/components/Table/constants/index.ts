export const TABLE_ROW_GROUP_COMMON_STYLE = 'w-full min-w-fit';

export const TABLE_ROW_VARIANTS = {
  HEAD: 'head',
  BODY: 'body',
} as const;

export const TABLE_CELL_ROLES = {
  COLUMN_HEADER: 'columnheader',
  CELL: 'cell',
  ROW_HEADER: 'rowheader',
} as const;

export const TABLE_ROW_COMMON_STYLE = 'in-flex-h-stack min-w-fit';

export const TABLE_ROW_GROUP_MERGE_STYLE =
  'border-in-gray-03 border-b last:border-0';

export const TABLE_FIXED_LEFT_GROUP_STYLE =
  'sticky left-0 in-flex-h-stack shrink-0';

export const TABLE_ROW_STYLES = {
  [TABLE_ROW_VARIANTS.HEAD]:
    'border-in-gray-03 border-b first:[&_.cell:first-child]:rounded-tl-in-8 first:[&>.cell:last-child]:rounded-tr-in-8 h-8',
  [TABLE_ROW_VARIANTS.BODY]:
    'group hover:bg-in-gray-01 last:[&_.cell]:border-0 [&_.cell]:border-b',
} as const;

export const TABLE_CELL_ROLE_COMMON_STYLES = {
  [TABLE_ROW_VARIANTS.HEAD]: 'h-full py-1.5',
  [TABLE_ROW_VARIANTS.BODY]: 'py-2.5 min-h-full in-flex-h-stack items-center',
} as const;

export const TABLE_CELL_STYLES = {
  [TABLE_CELL_ROLES.COLUMN_HEADER]: TABLE_CELL_ROLE_COMMON_STYLES.head,
  [TABLE_CELL_ROLES.CELL]: TABLE_CELL_ROLE_COMMON_STYLES.body,
  [TABLE_CELL_ROLES.ROW_HEADER]: TABLE_CELL_ROLE_COMMON_STYLES.body,
} as const;

export const TABLE_CELL_DEFAULT_BORDER_STYLES = {
  [TABLE_CELL_ROLES.COLUMN_HEADER]: '',
  [TABLE_CELL_ROLES.ROW_HEADER]: 'border-in-gray-03',
  [TABLE_CELL_ROLES.CELL]: 'border-in-gray-01',
} as const;

export const TABLE_CELL_DEFAULT_BACKGROUND_STYLES = {
  [TABLE_CELL_ROLES.COLUMN_HEADER]: 'bg-in-gray-02',
  [TABLE_CELL_ROLES.ROW_HEADER]: 'bg-in-gray-02',
  [TABLE_CELL_ROLES.CELL]: '',
} as const;

export const TABLE_CELL_DEFAULT_TEXT_STYLES = {
  [TABLE_CELL_ROLES.COLUMN_HEADER]: 'text-in-gray-06',
  [TABLE_CELL_ROLES.ROW_HEADER]: 'text-in-gray-06',
  [TABLE_CELL_ROLES.CELL]: 'text-in-black',
} as const;

export const TABLE_CELL_TEXT_TONES = {
  DEFAULT: 'default',
  DANGER: 'danger',
} as const;

export const TABLE_CELL_TEXT_TONE_STYLES = {
  [TABLE_CELL_TEXT_TONES.DANGER]: 'text-in-red-04',
} as const;

export const TABLE_CELL_HIGHLIGHT_BACKGROUND_STYLE = 'bg-in-primary-01';

export const TABLE_CELL_HIGHLIGHT_HOVER_BACKGROUND_STYLE =
  'group-hover:bg-in-primary-02';

export const TABLE_CELL_FIXED_LEFT_BACKGROUND_STYLE = 'bg-in-gray-02';

export const TABLE_CELL_FIXED_LEFT_BORDER_STYLE = 'border-in-gray-03';

export const TABLE_CELL_INPUT_STATE = {
  DEFAULT: 'DEFAULT',
  FOCUS: 'FOCUS',
  ERROR: 'ERROR',
  DISABLED: 'DISABLED',
} as const;

export const TABLE_CELL_INPUT_STYLES = {
  [TABLE_CELL_INPUT_STATE.DEFAULT]:
    'border border-transparent text-in-black placeholder-in-gray-04',
  [TABLE_CELL_INPUT_STATE.FOCUS]:
    'focus:outline-none focus:border-in-primary-05',
  [TABLE_CELL_INPUT_STATE.ERROR]:
    'group-[.error]:text-in-red-04 group-[.error]:border-in-red-04 group-[.error]:focus:border-in-red-04',
  [TABLE_CELL_INPUT_STATE.DISABLED]:
    'disabled:text-in-gray-05 disabled:border-in-gray-01 disabled:bg-in-gray-01 disabled:cursor-not-allowed disabled:placeholder-in-gray-05',
} as const;
