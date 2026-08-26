import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { SelectBasePopoverWrapperProps } from '@/components/Select/shared/types';

const SelectBasePopoverWrapper = ({
  children,
  className,
  useMobile = false,
  ref,
  tabIndex,
  onKeyDown,
}: PropsWithChildren<SelectBasePopoverWrapperProps>) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- 셀렉트 옵션 키보드 내비게이션용 포커스 컨테이너, 자체 인터랙션 요소 아님
    <div
      className={clsx(
        className,
        'animate-in-fade-in-select rounded-in-8 shadow-in-8 bg-in-white overflow-hidden focus:outline-none',
        useMobile &&
          'in-tablet:static in-tablet:inset-auto in-flex-v-stack in-tablet:block fixed inset-0',
      )}
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
};

export default SelectBasePopoverWrapper;
