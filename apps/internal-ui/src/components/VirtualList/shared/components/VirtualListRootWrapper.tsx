import { mergeRefs } from '@bbodek/utils';
import clsx from 'clsx';
import { ElementType, PropsWithChildren } from 'react';

import { VirtualListRootWrapperProps } from '@/components/VirtualList/shared/types';

const VirtualListRootWrapper = <T extends ElementType = 'div'>({
  as,
  ref,
  containerRef,
  onScroll,
  className,
  children,
}: PropsWithChildren<VirtualListRootWrapperProps<T>>) => {
  const Component: ElementType = as ?? 'div';

  return (
    <Component
      className={clsx(className, 'overflow-y-auto')}
      // eslint-disable-next-line react-hooks/refs -- mergeRefs는 커밋 시점 콜백만 생성하고 렌더 중 current를 읽지 않음
      ref={ref ? mergeRefs(containerRef, ref) : containerRef}
      onScroll={onScroll}
    >
      {children}
    </Component>
  );
};

export default VirtualListRootWrapper;
