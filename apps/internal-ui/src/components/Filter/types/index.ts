import { ButtonProps, IconButtonProps } from '@/components/Button';
import { CalendarVariants } from '@/components/Calendar';
import { FILTER_STEPS, FILTER_TYPES } from '@/components/Filter/constants';
import {
  SelectBaseChildrenProps,
  SelectBaseLabelProps,
  SelectBaseProps,
} from '@/components/Select';
import { ToggleProps } from '@/components/Toggle';

export type FilterType = (typeof FILTER_TYPES)[keyof typeof FILTER_TYPES];
export type FilterStep = (typeof FILTER_STEPS)[keyof typeof FILTER_STEPS];
export type FilterOptionKey = string;
export type FilterOptionLabel = string;
export type FilterOptionValue = string;

export interface FilterToggleOption {
  key: FilterOptionKey;
  label: FilterOptionLabel;
}

export interface FilterSelectOption {
  displayValue: string;
  value: FilterOptionValue;
}

export interface FilterSelectOptions {
  type: FilterType;
  key: FilterOptionKey;
  label: FilterOptionLabel;
  options?: FilterSelectOption[];
}

export interface FilterProps
  extends Pick<SelectBaseProps, 'className' | 'popoverOption' | 'disabled'>,
    Pick<SelectBaseLabelProps, 'label'>,
    FilterContextValue {}

export interface FilterContextProviderProps extends FilterContextValue {}

export interface FilterOnChangeParams
  extends Required<Pick<FilterContextValue, 'toggleValues' | 'selectValues'>> {}

export interface FilterContextValue {
  toggleValues?: FilterOptionKey[] | null;
  toggleOptions: FilterToggleOption[];
  selectValues?: Record<
    FilterOptionKey,
    FilterSelectOption['value'][] | null
  > | null;
  selectOptions: FilterSelectOptions[];
  onChange: (params: FilterOnChangeParams) => void;
}

export interface FilterPanelContextValue {
  filterStep: FilterStep;
  setFilterStep: (filterStep: FilterStep) => void;
  currentOptions: FilterSelectOptions | null;
  setCurrentOptions: (currentOptions: FilterSelectOptions | null) => void;
  currentSelectValue: FilterContextValue['selectValues'];
  setCurrentSelectValue: (
    currentSelectValue: FilterContextValue['selectValues'],
  ) => void;
}

export interface FilterHeaderProps extends SelectBaseChildrenProps {}

export interface FilterCloseButtonProps
  extends Pick<IconButtonProps, 'className'> {
  onClose: IconButtonProps['onClick'];
}

export interface FilterHeaderCloseButtonProps extends SelectBaseChildrenProps {}

export interface FilterHeaderMobileCloseButtonProps
  extends SelectBaseChildrenProps {}

export interface FilterToggleOptionItemProps
  extends Pick<FilterToggleOption, 'label' | 'key'>,
    Pick<ToggleProps, 'checked'> {
  optionKey: FilterSelectOptions['key'];
  handleChange: ({
    optionKey,
  }: {
    optionKey: FilterSelectOptions['key'];
  }) => void;
}

export interface FilterSelectOptionCategoryProps extends FilterSelectOptions {
  optionKey: FilterSelectOptions['key'];
}

export interface FilterMultiSelectOptionSummaryProps {
  selectedValues: FilterSelectOption['value'][];
  optionKey: FilterSelectOptions['key'];
}

export interface FilterCalendarSummaryProps
  extends Pick<FilterSelectOptions, 'type'> {
  selectedValues: FilterSelectOption['value'][];
}

export interface FilterCalendarPanelProps {
  variant: CalendarVariants;
}

export interface FilterSelectButtonProps
  extends Pick<ButtonProps, 'disabled' | 'onClick'> {}
