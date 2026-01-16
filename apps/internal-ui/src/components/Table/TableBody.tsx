import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Children, cloneElement, PropsWithChildren } from 'react';

import { ChildrenElement } from '@/components/shared';
import {
  TABLE_ROW_GROUP_COMMON_STYLE,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import { TableBodyProps, TableRowProps } from '@/components/Table/types';

const TableBodySearchEmpty = dynamic(
  () => import('@/components/Table/TableBodySearchEmpty'),
  { ssr: false },
);

const TableBody = ({
  children,
  className,
  isLoading = false,
  loadingComponent,
  emptyComponent,
}: PropsWithChildren<TableBodyProps>) => {
  const rows = Children.toArray(children) as ChildrenElement<TableRowProps>[];
  const isEmpty = Children.count(children) <= 0;

  const renderer = () => {
    if (isLoading && loadingComponent) {
      return loadingComponent;
    }

    if (isEmpty) {
      return emptyComponent ?? <TableBodySearchEmpty />;
    }

    return rows.map((row) =>
      cloneElement(row, { variant: TABLE_ROW_VARIANTS.BODY }),
    );
  };

  return (
    <div
      className={clsx(
        className,
        TABLE_ROW_GROUP_COMMON_STYLE,
        'bg-in-white h-[calc(100%-2rem)]',
        isEmpty && 'sticky left-0',
      )}
      role='rowgroup'
    >
      {renderer()}
    </div>
  );
};

export default TableBody;
