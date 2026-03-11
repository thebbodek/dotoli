import { ElementType, HTMLAttributes, RefObject, UIEvent } from 'react';

import { ComponentPropsRef } from '@/components/shared';

export interface VirtualListChildrenPrimitiveProps {
  startIndex: number;
  endIndex: number;
}

export interface VirtualListRootWrapperProps<T extends ElementType = 'div'>
  extends Pick<HTMLAttributes<HTMLElement>, 'className'>,
    ComponentPropsRef<HTMLElement> {
  as?: T;
  containerRef: RefObject<HTMLElement | null>;
  onScroll: (e: UIEvent<HTMLElement>) => void;
}

export interface VirtualListWrapperProps<T extends ElementType = 'div'>
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  as?: T;
  totalItemsHeight: number;
}

export interface VirtualListPrimitiveProps<
  T extends ElementType = 'div',
  P extends ElementType = 'div',
> extends Pick<HTMLAttributes<HTMLElement>, 'className'>,
    ComponentPropsRef<HTMLElement> {
  itemsTotalCount: number;
  itemHeight: number;
  gap?: number;
  as?: T;
  listOptions?: Pick<VirtualListWrapperProps<P>, 'as' | 'className'>;
}

export interface VirtualListItemBaseProps<T extends ElementType = 'div'>
  extends Pick<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  as?: T;
  topPosition: number;
}
