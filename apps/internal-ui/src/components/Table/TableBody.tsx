import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Children, cloneElement, PropsWithChildren } from 'react';

import {
  TABLE_ROW_GROUP_COMMON_STYLE,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';
import {
  ChildrenElement,
  TableBodyProps,
  TableRowProps,
} from '@/components/Table/types';

const TableBodyEmpty = dynamic(
  () => import('@/components/Table/TableBodyEmpty'),
  {
    ssr: false,
  },
);

const TableBody = ({
  children,
  className,
}: PropsWithChildren<TableBodyProps>) => {
  const rows = Children.toArray(children) as ChildrenElement<TableRowProps>[];
  const isEmpty = Children.count(children) <= 0;

  const renderer = () => {
    if (isEmpty) return <TableBodyEmpty />;

    return rows.map((row) =>
      cloneElement(row, { variant: TABLE_ROW_VARIANTS.BODY }),
    );
  };

  return (
    <div
      role='rowgroup'
      className={clsx(
        className,
        TABLE_ROW_GROUP_COMMON_STYLE,
        'bg-in-white h-[calc(100%-2rem)]',
        isEmpty && 'sticky left-0',
      )}
    >
      {renderer()}
    </div>
  );
};

export default TableBody;
