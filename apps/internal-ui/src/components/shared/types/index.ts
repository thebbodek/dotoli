import { JSXElementConstructor, ReactElement, RefObject } from 'react';

export interface ComponentPropsRef<T> {
  ref?: RefObject<T | null>;
}

export type ChildrenElement<T> = ReactElement<T, JSXElementConstructor<T>>;

export type NonNullableType<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};
