import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

import {
  TABLE_LAST_ROW_BORDER_RESET_STYLE,
  TABLE_LOADING_DEFAULT_CELL_STYLE,
  TABLE_LOADING_DEFAULT_ROW_COUNT,
  TABLE_LOADING_ROW_STYLE,
  TABLE_LOADING_SKELETON_HEIGHT,
  TABLE_ROW_GROUP_COMMON_STYLE,
} from '@/components/Table/constants';
import TableCell from '@/components/Table/TableCell';
import TableRow from '@/components/Table/TableRow';
import { TableBodySkeletonProps } from '@/components/Table/types';

const TableLoading = <T extends string>({
  keys,
  styles,
  length = TABLE_LOADING_DEFAULT_ROW_COUNT,
  cellClassName = TABLE_LOADING_DEFAULT_CELL_STYLE,
  className,
}: TableBodySkeletonProps<T>) => {
  return (
    <div
      className={clsx(
        className,
        TABLE_ROW_GROUP_COMMON_STYLE,
        TABLE_LAST_ROW_BORDER_RESET_STYLE,
        'bg-in-white',
      )}
      role='rowgroup'
    >
      {Array.from({ length }).map((_, index) => (
        <TableRow className={TABLE_LOADING_ROW_STYLE} key={index}>
          {keys.map((key) => (
            <TableCell className={clsx(cellClassName, styles[key])} key={key}>
              <Skeleton
                containerClassName='w-full'
                height={TABLE_LOADING_SKELETON_HEIGHT}
                width='90%'
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </div>
  );
};

export default TableLoading;
