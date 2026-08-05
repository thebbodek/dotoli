import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  FLEX_ALIGN_STYLES,
  FLEX_BASIS_STYLES,
  FLEX_DIRECTION_STYLES,
  FLEX_DIRECTIONS,
  FLEX_ELEMENTS,
  FLEX_GAP_STYLES,
  FLEX_GAP_STYLES_BY_DIRECTION,
  FLEX_GROW_AND_SHRINK_AND_BASIS_STYLES,
  FLEX_GROW_STYLES,
  FLEX_JUSTIFY_STYLES,
  FLEX_ORDER_STYLES,
  FLEX_SHRINK_STYLES,
  FLEX_WRAP_STYLES,
} from '@/components/Flex/constants';
import {
  FlexAlignOptions,
  FlexAlignStyleValues,
  FlexElementType,
  FlexJustifyOptions,
  FlexJustifyStyleValues,
  FlexProps,
} from '@/components/Flex/types';

const Flex = <T extends FlexElementType = typeof FLEX_ELEMENTS.DIV>({
  as: Element,
  children,
  className,
  ...options
}: PropsWithChildren<FlexProps<T>>) => {
  const Component: FlexElementType = Element || FLEX_ELEMENTS.DIV;

  const getOptions = ({
    options,
  }: {
    options: Omit<FlexProps, 'children' | 'className'>;
  }) => {
    const {
      direction = FLEX_DIRECTIONS.ROW,
      align,
      justify,
      gap,
      wrap,
      basis,
      shrink,
      grow,
      flex,
      order,
    } = options;

    const classes = [
      FLEX_DIRECTION_STYLES[direction],
      wrap && FLEX_WRAP_STYLES[wrap],
      basis && FLEX_BASIS_STYLES[basis],
      shrink && FLEX_SHRINK_STYLES[shrink],
      grow && FLEX_GROW_STYLES[grow],
      flex && FLEX_GROW_AND_SHRINK_AND_BASIS_STYLES[flex],
      order && FLEX_ORDER_STYLES[order],
    ].filter(Boolean) as string[];

    if (gap) {
      if (typeof gap === 'string') {
        classes.push(FLEX_GAP_STYLES[gap]);
      }

      if (gap instanceof Object) {
        const { column, row } = gap;

        if (column) {
          classes.push(FLEX_GAP_STYLES_BY_DIRECTION.column[column]);
        }

        if (row) {
          classes.push(FLEX_GAP_STYLES_BY_DIRECTION.row[row]);
        }
      }
    }

    if (align) {
      Object.entries(align).forEach(([key, value]) => {
        if (!key || !value) return;

        classes.push(
          FLEX_ALIGN_STYLES[key as FlexAlignOptions][
            value as keyof FlexAlignStyleValues
          ],
        );
      });
    }

    if (justify) {
      Object.entries(justify).forEach(([key, value]) => {
        if (!key || !value) return;

        classes.push(
          FLEX_JUSTIFY_STYLES[key as FlexJustifyOptions][
            value as keyof FlexJustifyStyleValues
          ],
        );
      });
    }

    return classes;
  };

  return (
    <Component className={clsx(className, 'flex', ...getOptions({ options }))}>
      {children}
    </Component>
  );
};

export default Flex;
