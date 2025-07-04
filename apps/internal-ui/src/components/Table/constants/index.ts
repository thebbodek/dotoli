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

export const TABLE_ROW_STYLES = {
  [TABLE_ROW_VARIANTS.HEAD]:
    'text-in-body-14-m border-in-gray-03 border-b first:[&_.cell:first-child]:rounded-tl-in-8 first:[&_.cell:last-child]:rounded-tr-in-8 h-8',
  [TABLE_ROW_VARIANTS.BODY]:
    'text-in-body-14-r hover:bg-in-gray-01 last:[&_.cell]:border-0 [&_.cell]:border-b',
} as const;

export const TABLE_CELL_ROLE_COMMON_STYLES = {
  [TABLE_ROW_VARIANTS.HEAD]: 'bg-in-gray-02 text-in-gray-06',
  [TABLE_ROW_VARIANTS.BODY]: 'py-2.5 min-h-full in-flex-h-stack items-center',
} as const;

export const TABLE_CELL_STYLES = {
  [TABLE_CELL_ROLES.COLUMN_HEADER]: `${TABLE_CELL_ROLE_COMMON_STYLES.head} h-full py-1.5`,
  [TABLE_CELL_ROLES.CELL]: `${TABLE_CELL_ROLE_COMMON_STYLES.body} text-in-black border-in-gray-01`,
  [TABLE_CELL_ROLES.ROW_HEADER]: `${TABLE_CELL_ROLE_COMMON_STYLES.body} ${TABLE_CELL_ROLE_COMMON_STYLES.head} border-in-gray-03`,
} as const;

export const TABLE_CELL_INPUT_STATE = {
  DEFAULT: 'DEFAULT',
  FOCUS: 'FOCUS',
  ERROR: 'ERROR',
  DISABLED: 'DISABLED',
} as const;

export const TABLE_CELL_INPUT_STYLES = {
  [TABLE_CELL_INPUT_STATE.DEFAULT]:
    'text-in-body-14-r border border-transparent text-in-black placeholder-in-gray-04',
  [TABLE_CELL_INPUT_STATE.FOCUS]:
    'focus:outline-none focus:border-in-primary-05',
  [TABLE_CELL_INPUT_STATE.ERROR]:
    'group-[.error]:text-in-red-04 group-[.error]:border-in-red-04 group-[.error]:focus:border-in-red-04',
  [TABLE_CELL_INPUT_STATE.DISABLED]:
    'disabled:text-in-gray-05 disabled:border-in-gray-01 disabled:bg-in-gray-01 disabled:cursor-not-allowed disabled:placeholder-in-gray-05',
} as const;
