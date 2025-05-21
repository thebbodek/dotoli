import { ElementType, HTMLAttributes } from 'react';

import {
  FLEX_ALIGN_CONTENTS,
  FLEX_ALIGN_ITEMS,
  FLEX_ALIGN_OPTIONS,
  FLEX_ALIGN_SELFS,
  FLEX_BASES,
  FLEX_DIRECTIONS,
  FLEX_ELEMENTS,
  FLEX_GAPS,
  FLEX_GROW_AND_SHRINK_AND_BASIS,
  FLEX_GROWS,
  FLEX_JUSTIFY_CONTENTS,
  FLEX_JUSTIFY_ITEMS,
  FLEX_JUSTIFY_OPTIONS,
  FLEX_JUSTIFY_SELFS,
  FLEX_ORDERS,
  FLEX_SHRINKS,
  FLEX_WRAPS,
} from '@/components/Flex/constants';

export type FlexElements = (typeof FLEX_ELEMENTS)[keyof typeof FLEX_ELEMENTS];

export type FlexElementType = Extract<ElementType, FlexElements>;

export type FlexDirection =
  (typeof FLEX_DIRECTIONS)[keyof typeof FLEX_DIRECTIONS];

export type FlexAlignOptions =
  (typeof FLEX_ALIGN_OPTIONS)[keyof typeof FLEX_ALIGN_OPTIONS];

export type FlexAlignItems =
  (typeof FLEX_ALIGN_ITEMS)[keyof typeof FLEX_ALIGN_ITEMS];

export type FlexAlignSelf =
  (typeof FLEX_ALIGN_SELFS)[keyof typeof FLEX_ALIGN_SELFS];

export type FlexAlignContent =
  (typeof FLEX_ALIGN_CONTENTS)[keyof typeof FLEX_ALIGN_CONTENTS];

export type FlexJustifyOptions =
  (typeof FLEX_JUSTIFY_OPTIONS)[keyof typeof FLEX_JUSTIFY_OPTIONS];

export type FlexJustifyItems =
  (typeof FLEX_JUSTIFY_ITEMS)[keyof typeof FLEX_JUSTIFY_ITEMS];

export type FlexJustifyContent =
  (typeof FLEX_JUSTIFY_CONTENTS)[keyof typeof FLEX_JUSTIFY_CONTENTS];

export type FlexJustifySelf =
  (typeof FLEX_JUSTIFY_SELFS)[keyof typeof FLEX_JUSTIFY_SELFS];

export type FlexGap = (typeof FLEX_GAPS)[keyof typeof FLEX_GAPS];

export type FlexWrap = (typeof FLEX_WRAPS)[keyof typeof FLEX_WRAPS];

export type FlexBasis = (typeof FLEX_BASES)[keyof typeof FLEX_BASES];

export type FlexShrink = (typeof FLEX_SHRINKS)[keyof typeof FLEX_SHRINKS];

export type FlexGrow = (typeof FLEX_GROWS)[keyof typeof FLEX_GROWS];

export type FlexGrowAndShrinkAndBasis =
  (typeof FLEX_GROW_AND_SHRINK_AND_BASIS)[keyof typeof FLEX_GROW_AND_SHRINK_AND_BASIS];

export type FlexOrder = (typeof FLEX_ORDERS)[keyof typeof FLEX_ORDERS];

export type FlexDirectionsStyles = Record<FlexDirection, string>;

export type FlexAlignItemsStyles = Record<FlexAlignItems, string>;

export type FlexAlignSelfStyles = Record<FlexAlignSelf, string>;

export type FlexAlignContentStyles = Record<FlexAlignContent, string>;

export type FlexJustifyItemsStyles = Record<FlexJustifyItems, string>;

export type FlexJustifyContentStyles = Record<FlexJustifyContent, string>;

export type FlexJustifySelfStyles = Record<FlexJustifySelf, string>;

export type FlexJustifyStyleValues =
  | FlexJustifyItemsStyles
  | FlexJustifyContentStyles
  | FlexJustifySelfStyles;

export type FlexJustifyStyles = Record<
  FlexJustifyOptions,
  FlexJustifyStyleValues
>;

export type FlexGapStyles = Record<FlexGap, string>;

export type FlexColumnGapStyles = Record<FlexGap, string>;

export type FlexRowGapStyles = Record<FlexGap, string>;

export type FlexGapStylesByDirection = Record<
  Extract<FlexDirection, 'column' | 'row'>,
  FlexGapStyles
>;

export type FlexAlignStyleValues =
  | FlexAlignItemsStyles
  | FlexAlignSelfStyles
  | FlexAlignContentStyles;

export type FlexAlignStyles = Record<FlexAlignOptions, FlexAlignStyleValues>;

export type FlexAlignProps = Record<
  FlexAlignOptions,
  FlexAlignContent | FlexAlignSelf | FlexAlignItems
>;

export type FlexJustifyProps = Record<
  FlexJustifyOptions,
  FlexJustifyContent | FlexJustifyItems | FlexJustifySelf
>;

export type FlexGapProps =
  | FlexGap
  | Partial<Record<Extract<FlexDirection, 'column' | 'row'>, FlexGap>>;

export interface FlexProps<T extends FlexElementType = typeof FLEX_ELEMENTS.DIV>
  extends Pick<HTMLAttributes<T>, 'className'> {
  as?: T;
  direction?: FlexDirection;
  align?: Partial<FlexAlignProps>;
  justify?: Partial<FlexJustifyProps>;
  gap?: FlexGapProps;
  wrap?: FlexWrap;
  basis?: FlexBasis;
  shrink?: FlexShrink;
  grow?: FlexGrow;
  flex?: FlexGrowAndShrinkAndBasis;
  order?: FlexOrder;
}
