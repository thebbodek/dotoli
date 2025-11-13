import clsx from 'clsx';
import { Children, cloneElement, PropsWithChildren } from 'react';

import { ChildrenElement } from '@/components/shared';
import {
  TABLE_ROW_GROUP_COMMON_STYLE,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableHeadProps, TableRowProps } from '@/components/Table/types';

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
      className={clsx(
        className,
        TABLE_ROW_GROUP_COMMON_STYLE,
        'sticky top-0 z-[1]',
      )}
      role='rowgroup'
    >
      {renderer}
    </div>
  );
};

export default TableHead;
