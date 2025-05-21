import {
  FlexAlignContentStyles,
  FlexAlignItemsStyles,
  FlexAlignSelfStyles,
  FlexAlignStyles,
  FlexColumnGapStyles,
  FlexDirectionsStyles,
  FlexGapStyles,
  FlexGapStylesByDirection,
  FlexJustifyContentStyles,
  FlexJustifyItemsStyles,
  FlexJustifySelfStyles,
  FlexJustifyStyles,
  FlexRowGapStyles,
} from '@/components/Flex/types';

export const FLEX_ELEMENTS = {
  DIV: 'div',
  SECTION: 'section',
  ARTICLE: 'article',
  NAV: 'nav',
  ASIDE: 'aside',
  MAIN: 'main',
  HEADER: 'header',
  FOOTER: 'footer',
  FORM: 'form',
  FIELDSET: 'fieldset',
  ADDRESS: 'address',
  FIGURE: 'figure',
  DETAILS: 'details',
  DIALOG: 'dialog',
} as const;

export const FLEX_DIRECTIONS = {
  ROW: 'row',
  COLUMN: 'column',
  ROW_REVERSE: 'row-reverse',
  COLUMN_REVERSE: 'column-reverse',
} as const;

export const FLEX_DIRECTION_STYLES: FlexDirectionsStyles = {
  [FLEX_DIRECTIONS.ROW]: 'flex-row',
  [FLEX_DIRECTIONS.COLUMN]: 'flex-col',
  [FLEX_DIRECTIONS.ROW_REVERSE]: 'flex-row-reverse',
  [FLEX_DIRECTIONS.COLUMN_REVERSE]: 'flex-col-reverse',
};

export const FLEX_ALIGN_ITEMS = {
  START: 'start',
  END: 'end',
  END_SAFE: 'end-safe',
  CENTER: 'center',
  CENTER_SAFE: 'center-safe',
  BASELINE: 'baseline',
  BASELINE_LAST: 'baseline-last',
  STRETCH: 'stretch',
} as const;

export const FLEX_ALIGN_ITEM_STYLES: FlexAlignItemsStyles = {
  [FLEX_ALIGN_ITEMS.START]: 'items-start',
  [FLEX_ALIGN_ITEMS.END]: 'items-end',
  [FLEX_ALIGN_ITEMS.END_SAFE]: 'items-end-safe',
  [FLEX_ALIGN_ITEMS.CENTER]: 'items-center',
  [FLEX_ALIGN_ITEMS.CENTER_SAFE]: 'items-center-safe',
  [FLEX_ALIGN_ITEMS.BASELINE]: 'items-baseline',
  [FLEX_ALIGN_ITEMS.BASELINE_LAST]: 'items-baseline-last',
  [FLEX_ALIGN_ITEMS.STRETCH]: 'items-stretch',
};

export const FLEX_ALIGN_CONTENTS = {
  NORMAL: 'normal',
  CENTER: 'center',
  START: 'start',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
  BASELINE: 'baseline',
  STRETCH: 'stretch',
} as const;

export const FLEX_ALIGN_CONTENT_STYLES: FlexAlignContentStyles = {
  [FLEX_ALIGN_CONTENTS.NORMAL]: 'content-normal',
  [FLEX_ALIGN_CONTENTS.CENTER]: 'content-center',
  [FLEX_ALIGN_CONTENTS.START]: 'content-start',
  [FLEX_ALIGN_CONTENTS.END]: 'content-end',
  [FLEX_ALIGN_CONTENTS.BETWEEN]: 'content-between',
  [FLEX_ALIGN_CONTENTS.AROUND]: 'content-around',
  [FLEX_ALIGN_CONTENTS.EVENLY]: 'content-evenly',
  [FLEX_ALIGN_CONTENTS.BASELINE]: 'content-baseline',
  [FLEX_ALIGN_CONTENTS.STRETCH]: 'content-stretch',
};

export const FLEX_ALIGN_SELFS = {
  AUTO: 'auto',
  START: 'start',
  END: 'end',
  END_SAFE: 'end-safe',
  CENTER: 'center',
  CENTER_SAFE: 'center-safe',
  STRETCH: 'stretch',
  BASELINE: 'baseline',
  BASELINE_LAST: 'baseline-last',
} as const;

export const FLEX_ALIGN_SELF_STYLES: FlexAlignSelfStyles = {
  [FLEX_ALIGN_SELFS.AUTO]: 'self-auto',
  [FLEX_ALIGN_SELFS.START]: 'self-start',
  [FLEX_ALIGN_SELFS.END]: 'self-end',
  [FLEX_ALIGN_SELFS.END_SAFE]: 'self-end-safe',
  [FLEX_ALIGN_SELFS.CENTER]: 'self-center',
  [FLEX_ALIGN_SELFS.CENTER_SAFE]: 'self-center-safe',
  [FLEX_ALIGN_SELFS.STRETCH]: 'self-stretch',
  [FLEX_ALIGN_SELFS.BASELINE]: 'self-baseline',
  [FLEX_ALIGN_SELFS.BASELINE_LAST]: 'self-baseline-last',
};

export const FLEX_ALIGN_OPTIONS = {
  CONTENT: 'content',
  SELF: 'self',
  ITEMS: 'items',
} as const;

export const FLEX_ALIGN_STYLES: FlexAlignStyles = {
  [FLEX_ALIGN_OPTIONS.CONTENT]: FLEX_ALIGN_CONTENT_STYLES,
  [FLEX_ALIGN_OPTIONS.SELF]: FLEX_ALIGN_SELF_STYLES,
  [FLEX_ALIGN_OPTIONS.ITEMS]: FLEX_ALIGN_ITEM_STYLES,
};

export const FLEX_JUSTIFY_CONTENTS = {
  START: 'start',
  END: 'end',
  END_SAFE: 'end-safe',
  CENTER: 'center',
  CENTER_SAFE: 'center-safe',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
  STRETCH: 'stretch',
  BASELINE: 'baseline',
  NORMAL: 'normal',
} as const;

export const FLEX_JUSTIFY_CONTENT_STYLES: FlexJustifyContentStyles = {
  [FLEX_JUSTIFY_CONTENTS.START]: 'justify-start',
  [FLEX_JUSTIFY_CONTENTS.END]: 'justify-end',
  [FLEX_JUSTIFY_CONTENTS.END_SAFE]: 'justify-end-safe',
  [FLEX_JUSTIFY_CONTENTS.CENTER]: 'justify-center',
  [FLEX_JUSTIFY_CONTENTS.CENTER_SAFE]: 'justify-center-safe',
  [FLEX_JUSTIFY_CONTENTS.BETWEEN]: 'justify-between',
  [FLEX_JUSTIFY_CONTENTS.AROUND]: 'justify-around',
  [FLEX_JUSTIFY_CONTENTS.EVENLY]: 'justify-evenly',
  [FLEX_JUSTIFY_CONTENTS.STRETCH]: 'justify-stretch',
  [FLEX_JUSTIFY_CONTENTS.BASELINE]: 'justify-baseline',
  [FLEX_JUSTIFY_CONTENTS.NORMAL]: 'justify-normal',
};

export const FLEX_JUSTIFY_ITEMS = {
  START: 'start',
  END: 'end',
  END_SAFE: 'end-safe',
  CENTER: 'center',
  CENTER_SAFE: 'center-safe',
  STRETCH: 'stretch',
  NORMAL: 'normal',
} as const;

export const FLEX_JUSTIFY_ITEM_STYLES: FlexJustifyItemsStyles = {
  [FLEX_JUSTIFY_ITEMS.START]: 'justify-items-start',
  [FLEX_JUSTIFY_ITEMS.END]: 'justify-items-end',
  [FLEX_JUSTIFY_ITEMS.END_SAFE]: 'justify-items-end-safe',
  [FLEX_JUSTIFY_ITEMS.CENTER]: 'justify-items-center',
  [FLEX_JUSTIFY_ITEMS.CENTER_SAFE]: 'justify-items-center-safe',
  [FLEX_JUSTIFY_ITEMS.STRETCH]: 'justify-items-stretch',
  [FLEX_JUSTIFY_ITEMS.NORMAL]: 'justify-items-normal',
};

export const FLEX_JUSTIFY_SELFS = {
  AUTO: 'auto',
  START: 'start',
  CENTER: 'center',
  CENTER_SAFE: 'center-safe',
  END: 'end',
  END_SAFE: 'end-safe',
  STRETCH: 'stretch',
} as const;

export const FLEX_JUSTIFY_SELF_STYLES: FlexJustifySelfStyles = {
  [FLEX_JUSTIFY_SELFS.AUTO]: 'justify-self-auto',
  [FLEX_JUSTIFY_SELFS.START]: 'justify-self-start',
  [FLEX_JUSTIFY_SELFS.CENTER]: 'justify-self-center',
  [FLEX_JUSTIFY_SELFS.CENTER_SAFE]: 'justify-self-center-safe',
  [FLEX_JUSTIFY_SELFS.END]: 'justify-self-end',
  [FLEX_JUSTIFY_SELFS.END_SAFE]: 'justify-self-end-safe',
  [FLEX_JUSTIFY_SELFS.STRETCH]: 'justify-self-stretch',
};

export const FLEX_JUSTIFY_OPTIONS = {
  CONTENT: 'content',
  ITEMS: 'items',
  SELF: 'self',
} as const;

export const FLEX_JUSTIFY_STYLES: FlexJustifyStyles = {
  [FLEX_JUSTIFY_OPTIONS.CONTENT]: FLEX_JUSTIFY_CONTENT_STYLES,
  [FLEX_JUSTIFY_OPTIONS.ITEMS]: FLEX_JUSTIFY_ITEM_STYLES,
  [FLEX_JUSTIFY_OPTIONS.SELF]: FLEX_JUSTIFY_SELF_STYLES,
};

export const FLEX_GAPS = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  ELEVEN: 11,
  TWELVE: 12,
  THIRTEEN: 13,
  FOURTEEN: 14,
  FIFTEEN: 15,
} as const;

export const FLEX_GAP_STYLES: FlexGapStyles = {
  [FLEX_GAPS.NONE]: 'gap-0',
  [FLEX_GAPS.ONE]: 'gap-1',
  [FLEX_GAPS.TWO]: 'gap-2',
  [FLEX_GAPS.THREE]: 'gap-3',
  [FLEX_GAPS.FOUR]: 'gap-4',
  [FLEX_GAPS.FIVE]: 'gap-5',
  [FLEX_GAPS.SIX]: 'gap-6',
  [FLEX_GAPS.SEVEN]: 'gap-7',
  [FLEX_GAPS.EIGHT]: 'gap-8',
  [FLEX_GAPS.NINE]: 'gap-9',
  [FLEX_GAPS.TEN]: 'gap-10',
  [FLEX_GAPS.ELEVEN]: 'gap-11',
  [FLEX_GAPS.TWELVE]: 'gap-12',
  [FLEX_GAPS.THIRTEEN]: 'gap-13',
  [FLEX_GAPS.FOURTEEN]: 'gap-14',
  [FLEX_GAPS.FIFTEEN]: 'gap-15',
};

export const FLEX_COLUMN_GAP_STYLES: FlexColumnGapStyles = {
  [FLEX_GAPS.NONE]: 'gap-y-0',
  [FLEX_GAPS.ONE]: 'gap-y-1',
  [FLEX_GAPS.TWO]: 'gap-y-2',
  [FLEX_GAPS.THREE]: 'gap-y-3',
  [FLEX_GAPS.FOUR]: 'gap-y-4',
  [FLEX_GAPS.FIVE]: 'gap-y-5',
  [FLEX_GAPS.SIX]: 'gap-y-6',
  [FLEX_GAPS.SEVEN]: 'gap-y-7',
  [FLEX_GAPS.EIGHT]: 'gap-y-8',
  [FLEX_GAPS.NINE]: 'gap-y-9',
  [FLEX_GAPS.TEN]: 'gap-y-10',
  [FLEX_GAPS.ELEVEN]: 'gap-y-11',
  [FLEX_GAPS.TWELVE]: 'gap-y-12',
  [FLEX_GAPS.THIRTEEN]: 'gap-y-13',
  [FLEX_GAPS.FOURTEEN]: 'gap-y-14',
  [FLEX_GAPS.FIFTEEN]: 'gap-y-15',
};

export const FLEX_ROW_GAP_STYLES: FlexRowGapStyles = {
  [FLEX_GAPS.NONE]: 'gap-x-0',
  [FLEX_GAPS.ONE]: 'gap-x-1',
  [FLEX_GAPS.TWO]: 'gap-x-2',
  [FLEX_GAPS.THREE]: 'gap-x-3',
  [FLEX_GAPS.FOUR]: 'gap-x-4',
  [FLEX_GAPS.FIVE]: 'gap-x-5',
  [FLEX_GAPS.SIX]: 'gap-x-6',
  [FLEX_GAPS.SEVEN]: 'gap-x-7',
  [FLEX_GAPS.EIGHT]: 'gap-x-8',
  [FLEX_GAPS.NINE]: 'gap-x-9',
  [FLEX_GAPS.TEN]: 'gap-x-10',
  [FLEX_GAPS.ELEVEN]: 'gap-x-11',
  [FLEX_GAPS.TWELVE]: 'gap-x-12',
  [FLEX_GAPS.THIRTEEN]: 'gap-x-13',
  [FLEX_GAPS.FOURTEEN]: 'gap-x-14',
  [FLEX_GAPS.FIFTEEN]: 'gap-x-15',
};

export const FLEX_GAP_STYLES_BY_DIRECTION: FlexGapStylesByDirection = {
  column: FLEX_COLUMN_GAP_STYLES,
  row: FLEX_ROW_GAP_STYLES,
};

export const FLEX_WRAPS = {
  NOWRAP: 'nowrap',
  WRAP: 'wrap',
  WRAP_REVERSE: 'wrap-reverse',
} as const;

export const FLEX_WRAP_STYLES = {
  [FLEX_WRAPS.NOWRAP]: 'flex-nowrap',
  [FLEX_WRAPS.WRAP]: 'flex-wrap',
  [FLEX_WRAPS.WRAP_REVERSE]: 'flex-wrap-reverse',
} as const;

export const FLEX_SHRINKS = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export const FLEX_SHRINK_STYLES = {
  [FLEX_SHRINKS.NONE]: 'shrink-0',
  [FLEX_SHRINKS.ONE]: 'shrink-1',
  [FLEX_SHRINKS.TWO]: 'shrink-2',
  [FLEX_SHRINKS.THREE]: 'shrink-3',
  [FLEX_SHRINKS.FOUR]: 'shrink-4',
  [FLEX_SHRINKS.FIVE]: 'shrink-5',
} as const;

export const FLEX_GROWS = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export const FLEX_GROW_STYLES = {
  [FLEX_GROWS.NONE]: 'grow-0',
  [FLEX_GROWS.ONE]: 'grow-1',
  [FLEX_GROWS.TWO]: 'grow-2',
  [FLEX_GROWS.THREE]: 'grow-3',
  [FLEX_GROWS.FOUR]: 'grow-4',
  [FLEX_GROWS.FIVE]: 'grow-5',
} as const;

export const FLEX_ORDERS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
} as const;

export const FLEX_ORDER_STYLES = {
  [FLEX_ORDERS.FIRST]: 'order-1',
  [FLEX_ORDERS.SECOND]: 'order-2',
  [FLEX_ORDERS.THIRD]: 'order-3',
  [FLEX_ORDERS.FOURTH]: 'order-4',
  [FLEX_ORDERS.FIFTH]: 'order-5',
} as const;

export const FLEX_BASES = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
} as const;

export const FLEX_BASIS_STYLES = {
  [FLEX_BASES.FIRST]: 'basis-1',
  [FLEX_BASES.SECOND]: 'basis-2',
  [FLEX_BASES.THIRD]: 'basis-3',
  [FLEX_BASES.FOURTH]: 'basis-4',
  [FLEX_BASES.FIFTH]: 'basis-5',
} as const;

export const FLEX_GROW_AND_SHRINK_AND_BASIS = {
  NONE: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export const FLEX_GROW_AND_SHRINK_AND_BASIS_STYLES = {
  [FLEX_GROW_AND_SHRINK_AND_BASIS.NONE]: 'flex-none',
  [FLEX_GROW_AND_SHRINK_AND_BASIS.ONE]: 'flex-1',
  [FLEX_GROW_AND_SHRINK_AND_BASIS.TWO]: 'flex-2',
  [FLEX_GROW_AND_SHRINK_AND_BASIS.THREE]: 'flex-3',
  [FLEX_GROW_AND_SHRINK_AND_BASIS.FOUR]: 'flex-4',
  [FLEX_GROW_AND_SHRINK_AND_BASIS.FIVE]: 'flex-5',
} as const;
