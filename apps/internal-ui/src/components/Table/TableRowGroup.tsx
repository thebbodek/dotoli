import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  TABLE_FIXED_LEFT_GROUP_STYLE,
  TABLE_LAST_ROW_BORDER_RESET_STYLE,
  TABLE_ROW_COMMON_STYLE,
  TABLE_ROW_GROUP_MERGE_STYLE,
} from '@/components/Table/constants';
import { TableRowGroupProps } from '@/components/Table/types';

const TableRowGroup = ({
  merged,
  className,
  children,
}: PropsWithChildren<TableRowGroupProps>) => {
  return (
    <div
      className={clsx(
        className,
        TABLE_ROW_COMMON_STYLE,
        TABLE_ROW_GROUP_MERGE_STYLE,
      )}
    >
      <div className={TABLE_FIXED_LEFT_GROUP_STYLE}>{merged}</div>
      <div
        className={clsx(
          'in-flex-v-stack min-w-fit flex-1',
          TABLE_LAST_ROW_BORDER_RESET_STYLE,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default TableRowGroup;
