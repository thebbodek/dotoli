import {
  HTMLAttributes,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
} from 'react';

import { ButtonProps, IconButtonProps } from '@/components/Button';
import { InputFieldProps } from '@/components/Input';
import {
  TABLE_CELL_ROLES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';

export type TableRowVariant =
  (typeof TABLE_ROW_VARIANTS)[keyof typeof TABLE_ROW_VARIANTS];

export type TableCellRole =
  (typeof TABLE_CELL_ROLES)[keyof typeof TABLE_CELL_ROLES];

export type ChildrenElement<T> = ReactElement<T, JSXElementConstructor<T>>;

export interface TableProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  caption?: string;
}

export interface TableHeadProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface TableBodyProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface TableRowProps
  extends PropsWithChildren,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  variant?: TableRowVariant;
}

export interface TableCellProps
  extends PropsWithChildren,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  role?: TableCellRole;
  isFixedLeft?: boolean;
}

export interface TableInputCellProps
  extends TableCellProps,
    Pick<
      InputFieldProps,
      | 'value'
      | 'onChange'
      | 'isError'
      | 'feedback'
      | 'disabled'
      | 'readOnly'
      | 'autoComplete'
      | 'name'
      | 'regCallback'
      | 'type'
      | 'placeholder'
      | 'maxLength'
    > {}

export interface TableCellButtonProps {
  items: Omit<ButtonProps, 'size' | 'variant'>[];
}

export interface TableCellIconButtonProps {
  items: Omit<IconButtonProps, 'type' | 'theme'>[];
}
