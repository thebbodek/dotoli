import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { MultiSelectSearchPanelBaseProps } from '@/components/Select/Multi/shared/types';

const SelectBaseListEmpty = dynamic(
  () => import('@/components/Select/shared/SelectBaseListEmpty'),
  { ssr: false },
);

const MultiSelectSearchPanelBase = ({
  slot,
  children,
}: PropsWithChildren<MultiSelectSearchPanelBaseProps>) => {
  const { currentSearchValue, filteredInternalOptions } =
    useMultiSelectBaseContext();
  const isEmpty = !!currentSearchValue && filteredInternalOptions.length === 0;

  const renderer = () => {
    if (isEmpty) return <SelectBaseListEmpty />;

    return children;
  };

  return (
    <>
      {slot}
      {renderer()}
    </>
  );
};

export default MultiSelectSearchPanelBase;
