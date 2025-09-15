import clsx from 'clsx';
import { Children, cloneElement, PropsWithChildren } from 'react';

import {
  TABLE_ROW_GROUP_COMMON_STYLE,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableHeadProps, TableRowProps } from '@/components/Table/types';
import { ChildrenElement } from '@/components/shared';

const TableHead = ({
  children,
  className,
}: PropsWithChildren<TableHeadProps>) => {
  const rows = Children.toArray(children) as ChildrenElement<TableRowProps>[];

  const renderer = rows.map((row) =>
    cloneElement(row, {
      variant: TABLE_ROW_VARIANTS.HEAD,
    }),
  );

  return (
    <div
      role='rowgroup'
      className={clsx(
        className,
        TABLE_ROW_GROUP_COMMON_STYLE,
        'sticky top-0 z-[1]',
      )}
    >
      {renderer}
    </div>
  );
};

export default TableHead;
