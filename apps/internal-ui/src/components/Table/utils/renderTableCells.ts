import { Children, cloneElement, PropsWithChildren } from 'react';

import { ChildrenElement } from '@/components/shared';
import {
  TABLE_CELL_ROLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableCellProps, TableRowProps } from '@/components/Table/types';

export const renderTableCells = ({
  children,
  variant,
}: PropsWithChildren<Pick<TableRowProps, 'variant'>>) => {
  const cells = Children.toArray(children) as ChildrenElement<TableCellProps>[];

  return cells.map((cell, index) =>
    cloneElement(cell, {
      key: cell.key ?? index,
      role:
        variant === TABLE_ROW_VARIANTS.HEAD
          ? TABLE_CELL_ROLES.COLUMN_HEADER
          : cell.props.role,
    }),
  );
};
