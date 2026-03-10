import {
  Dispatch,
  ElementType,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

import { ComponentPropsRef } from '@/components/shared';

export interface VirtualListChildrenProps {
  startIndex: number;
  endIndex: number;
  getTopPosition: ({ index }: GetTopPositionParams) => string;
}

export interface GetTopPositionParams {
  index: number;
}

export interface VirtualListProps<
  T extends ElementType = 'div',
  P extends ElementType = 'div',
> extends Pick<HTMLAttributes<HTMLElement>, 'className'>,
    ComponentPropsRef<HTMLElement> {
  itemHeight: number;
  listClassName?: HTMLAttributes<HTMLElement>['className'];
  itemsTotalCount: number;
  rootElement?: T;
  listElement?: P;
  gap?: number;
  children: ({
    startIndex,
    endIndex,
    getTopPosition,
  }: VirtualListChildrenProps) => ReactNode;
}

export interface VirtualListItemProps<T extends ElementType = 'div'>
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  element?: T;
  topPosition: string;
  height: number;
}

export interface UseCalculateContainerHeightEffectProps {
  containerRef: RefObject<HTMLElement | null>;
  setContainerHeight: Dispatch<SetStateAction<number>>;
}
