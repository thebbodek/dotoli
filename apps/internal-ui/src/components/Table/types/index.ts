import { LinkProps } from 'next/link';
import {
  AnchorHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';

import { ButtonProps, IconButtonProps } from '@/components/Button';
import { InputFieldProps } from '@/components/Input';
import {
  TABLE_CELL_ROLES,
  TABLE_CELL_TEXT_TONES,
  TABLE_ROW_VARIANTS,
} from '@/components/Table/constants';

export type TableRowVariant =
  (typeof TABLE_ROW_VARIANTS)[keyof typeof TABLE_ROW_VARIANTS];

export type TableCellRole =
  (typeof TABLE_CELL_ROLES)[keyof typeof TABLE_CELL_ROLES];

export type TableCellTextTone =
  (typeof TABLE_CELL_TEXT_TONES)[keyof typeof TABLE_CELL_TEXT_TONES];

export interface TableProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  caption?: string;
}

export interface TableHeadProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {}

export interface TableBodyProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  emptyComponent?: ReactElement;
  loadingComponent?: ReactElement;
  isLoading?: boolean;
}

export interface TableBodySkeletonProps<T extends string> {
  keys: T[];
  styles: Record<T, string>;
}

export interface TableRowProps
  extends PropsWithChildren,
    Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'onClick'> {
  variant?: TableRowVariant;
}

export interface TableRowGroupProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  merged: ReactNode;
}

export interface TableLinkRowProps
  extends Omit<TableRowProps, 'variant' | 'onClick'>,
    LinkProps,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target'> {}

export interface TableCellProps
  extends PropsWithChildren,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  role?: TableCellRole;
  isFixedLeft?: boolean;
  isHighlighted?: boolean;
  textTone?: TableCellTextTone;
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
