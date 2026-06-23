import { Children, cloneElement, PropsWithChildren } from 'react';

import { ChildrenElement } from '@/components/shared';
import {
  TABLE_CELL_ROLES,
  TABLE_FIXED_LEFT_GROUP_STYLE,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableCellProps, TableRowProps } from '@/components/Table/types';

export const renderTableCells = ({
  children,
  variant,
}: PropsWithChildren<Pick<TableRowProps, 'variant'>>) => {
  const cells = Children.toArray(children) as ChildrenElement<TableCellProps>[];

  const renderedCells = cells.map((cell, index) =>
    cloneElement(cell, {
      key: cell.key ?? index,
      role:
        variant === TABLE_ROW_VARIANTS.HEAD
          ? TABLE_CELL_ROLES.COLUMN_HEADER
          : cell.props.role,
    }),
  );

  const firstNonFixedIndex = cells.findIndex(({ props }) => !props.isFixedLeft);
  const fixedLeftCount =
    firstNonFixedIndex === -1 ? cells.length : firstNonFixedIndex;

  if (fixedLeftCount === 0) return renderedCells;

  return [
    <div className={TABLE_FIXED_LEFT_GROUP_STYLE} key='fixed-left-group'>
      {renderedCells.slice(0, fixedLeftCount)}
    </div>,
    ...renderedCells.slice(fixedLeftCount),
  ];
};
