import clsx from 'clsx';
import Skeleton from 'react-loading-skeleton';

import { TABLE_ROW_GROUP_COMMON_STYLE } from '@/components/Table/constants';
import { TableBodySkeletonProps } from '@/components/Table/types';

const TableBodyLoading = <T extends string>({
  keys,
  styles,
}: TableBodySkeletonProps<T>) => {
  return (
    <div
      className={clsx(
        TABLE_ROW_GROUP_COMMON_STYLE,
        'bg-in-white in-flex-v-stack h-[calc(100%-2rem)] gap-y-8 py-5',
      )}
      role='rowgroup'
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          className='in-flex-h-stack w-full items-center'
          key={index}
          role='row'
        >
          {keys.map((key) => (
            <div
              className={clsx(styles[key], 'pl-4 last:pr-4')}
              key={key}
              role='cell'
            >
              <Skeleton height={12} width='90%' />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBodyLoading;
