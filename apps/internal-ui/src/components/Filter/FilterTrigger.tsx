import clsx from 'clsx';
import { MouseEvent } from 'react';

import { useFilterContext } from '@/components/Filter/context';
import { Flex } from '@/components/Flex';
import { Icon } from '@/components/Icon';
import { useSelectTriggerContext } from '@/components/Select/shared';
import { Typography } from '@/components/Typography';

const FilterTrigger = () => {
  const { toggleValues = [], selectValues = {} } = useFilterContext();
  const { ref, onToggle, disabled } = useSelectTriggerContext();
  const toggleValuesCount = toggleValues?.length ?? 0;
  const selectValuesCount =
    selectValues !== null
      ? Object.values(selectValues).filter((value) => value !== null).length
      : 0;
  const count = toggleValuesCount + selectValuesCount;
  const hasValue = count > 0;

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    onToggle();
  };

  return (
    <div
      ref={ref}
      role='button'
      className={clsx(
        'rounded-in-8 border-in-gray-02 flex h-8 w-full items-center justify-between gap-x-1 overflow-hidden border px-4 py-2',
        hasValue && 'border-in-primary-05 text-in-primary-06 bg-white',
        disabled &&
          'bg-in-gray-02 border-in-gray-04 text-in-gray-04 cursor-not-allowed',
      )}
      aria-disabled={disabled}
      onClick={onClick}
    >
      <Flex gap={{ row: '1' }} align={{ items: 'center' }}>
        <Icon
          iconKey='funnel-simple'
          className={clsx(
            'text-in-gray-06 text-[1rem]',
            hasValue && 'text-inherit',
          )}
          weight='regular'
          aria-hidden
        />
        <Typography
          variant='body-14-m'
          color={!hasValue ? 'gray-07' : undefined}
        >
          필터
        </Typography>
        {hasValue && (
          <dl className='bg-in-primary-02 rounded-in-full in-flex-v-stack-center h-[1.125rem] w-[1.125rem] text-center'>
            <dt className='sr-only'>선택된 필터 옵션 갯수</dt>
            <dd className='text-in-body-12-b'>{count}</dd>
          </dl>
        )}
      </Flex>
    </div>
  );
};

export default FilterTrigger;
