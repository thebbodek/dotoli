import { HTMLAttributes, ReactNode } from 'react';

import { ChipProps } from '@/components/Chip';
import { IconProps } from '@/components/Icon';
import { InputSearchProps } from '@/components/Input';

export type MultiSelectValue = string | number | null;

export interface MultiSelectListItemProps<T extends MultiSelectValue> {
  heightClassName: Required<HTMLAttributes<HTMLLIElement>['className']>;
  value: T;
}

export interface MultiSelectCheckIconProps {
  activeClassName: Required<IconProps['className']>;
}

export interface MultiSelectResultPanelProps
  extends Pick<HTMLAttributes<HTMLDListElement>, 'className'>,
    Required<Pick<HTMLAttributes<HTMLDListElement>, 'id'>> {
  label: string;
  count: number;
}

export interface MultiSelectListHeaderProps
  extends Pick<MultiSelectResultPanelProps, 'count'> {}

export interface MultiSelectProps<T extends MultiSelectValue>
  extends Omit<
    MultiSelectContextValue<T>,
    'selectListResultId' | 'selectedListResultId'
  > {
  searchPanel: ReactNode;
  selectedPanel: ReactNode;
  inputOption: Omit<InputSearchProps, 'rootClassName' | 'type'>;
}

export interface MultiSelectSelectedListItemProps
  extends Pick<ChipProps, 'label'>,
    Pick<MultiSelectListItemProps<MultiSelectValue>, 'value'> {}

export interface MultiSelectProviderProps<T extends MultiSelectValue>
  extends Omit<
    MultiSelectContextValue<T>,
    'selectListResultId' | 'selectedListResultId'
  > {}

export interface MultiSelectContextValue<T extends MultiSelectValue> {
  onSelect: ({ value }: { value: T }) => void;
  onRemove: ({ value }: { value: T }) => void;
  onAllSelect: () => void;
  selectListResultId: string;
  selectedListResultId: string;
  selectedValues: T[];
}
