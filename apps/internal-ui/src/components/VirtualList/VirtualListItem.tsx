import clsx from 'clsx';
import { ElementType, memo, PropsWithChildren } from 'react';

import { VirtualListItemProps } from '@/components/VirtualList/types';

const VirtualListItem = <T extends ElementType = 'div'>({
  topPosition,
  className,
  element: Element,
  children,
  height,
}: PropsWithChildren<VirtualListItemProps<T>>) => {
  const Component: ElementType = Element ?? 'div';
  const classNames = clsx(
    'absolute top-0 right-0 left-0 flex items-center will-change-transform',
    className,
  );
  const style = {
    transform: `translateY(${topPosition})`,
    height: `${height}px`,
  };

  return (
    <Component className={classNames} style={style}>
      {children}
    </Component>
  );
};
export default memo(VirtualListItem);
