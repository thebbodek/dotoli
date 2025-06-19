import { clsx } from 'clsx';
import { Children, cloneElement } from 'react';

import {
  TABLE_CELL_ROLES,
  TABLE_ROW_STYLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import {
  ChildrenElement,
  TableCellProps,
  TableRowProps,
} from '@/components/Table/types';

const TableRow = ({
  variant = TABLE_ROW_VARIANTS.BODY,
  className,
  children,
}: TableRowProps) => {
  const cells = Children.toArray(children) as ChildrenElement<TableCellProps>[];

  return (
    <div
      role='row'
      className={clsx(
        className,
        'flex-h-stack min-w-fit',
        TABLE_ROW_STYLES[variant],
      )}
    >
      {cells.map((cell) =>
        cloneElement(cell, {
          role:
            variant === TABLE_ROW_VARIANTS.HEAD
              ? TABLE_CELL_ROLES.COLUMN_HEADER
              : cell.props.role,
        }),
      )}
    </div>
  );
};

export default TableRow;
