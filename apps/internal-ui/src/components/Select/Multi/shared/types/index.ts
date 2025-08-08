import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

import { InputSearchProps } from '@/components/Input';
import {
  SelectBaseItemProps,
  SelectBaseProps,
} from '@/components/Select/shared';

export type MultiSelectBaseValue = string | number | null;

export interface MultiSelectBaseListItemProps<T extends MultiSelectBaseValue>
  extends Pick<SelectBaseItemProps, 'label' | 'isSelected'>,
    Pick<HTMLAttributes<HTMLLIElement>, 'className'> {
  optionKey: MultiSelectInternalOption<T>['key'];
}

export interface MultiSelectBaseCheckIconProps
  extends Pick<SelectBaseItemProps, 'isSelected'> {}

export interface MultiSelectBaseResultPanelProps
  extends Pick<HTMLAttributes<HTMLDListElement>, 'className'> {
  label: string;
  count: number;
}

export interface MultiSelectBaseListHeaderProps
  extends Pick<MultiSelectBaseResultPanelProps, 'count'> {}

export interface MultiSelectBaseProps
  extends Pick<SelectBaseProps, 'labelId' | 'className'> {
  searchPanel: ReactNode;
  selectedPanel: ReactNode;
  inputOption?: Omit<
    InputSearchProps,
    'rootClassName' | 'type' | 'onChange' | 'value' | 'hiddenLabel' | 'label'
  >;
}

export interface MultiSelectOption<T extends MultiSelectBaseValue> {
  value: T;
  label: string;
}

export interface MultiSelectBaseProviderProps<T extends MultiSelectBaseValue>
  extends Pick<
    MultiSelectBaseContextValue<T>,
    'selectListResultId' | 'selectedListResultId' | 'value'
  > {
  options: MultiSelectOption<T>[];
  onChange: (value: MultiSelectOption<T>[]) => void;
}

export interface MultiSelectInternalOption<T extends MultiSelectBaseValue>
  extends MultiSelectOption<T>,
    Pick<MultiSelectBaseListItemProps<T>, 'isSelected'> {
  key: string;
}

export interface MultiSelectBaseOnSearchParams {
  value: string | null;
}

export interface MultiSelectBaseContextValue<T extends MultiSelectBaseValue> {
  value: MultiSelectOption<T>[];
  onSelect: ({ key }: Pick<MultiSelectInternalOption<T>, 'key'>) => void;
  onRemove: ({ key }: Pick<MultiSelectInternalOption<T>, 'key'>) => void;
  internalOptions: MultiSelectInternalOption<T>[];
  onAllSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  selectListResultId: string;
  selectedListResultId: string;
  setMultiSelectInternalOptions: () => void;
  onChange: () => void;
  onSearch: ({ value }: MultiSelectBaseOnSearchParams) => void;
  currentSearchValue: string | null;
  setCurrentSearchValue: Dispatch<SetStateAction<string | null>>;
  onRemoveTriggerValueClick: ({
    key,
  }: Pick<MultiSelectInternalOption<T>, 'key'>) => void;
}

export interface GetOptionKeyParams
  extends MultiSelectOption<MultiSelectBaseValue> {}

export interface MultiSelectBaseSelectedListProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className'> {}
