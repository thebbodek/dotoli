import { CheckboxProps } from '@/components/Checkbox';
import { ITEM_CHECKBOX_STATES } from '@/components/ItemCheckbox/constants';

export type ItemCheckboxState =
  (typeof ITEM_CHECKBOX_STATES)[keyof typeof ITEM_CHECKBOX_STATES];

export interface ItemCheckboxProps
  extends Omit<CheckboxProps, 'aria-label' | 'aria-labelledby' | 'disabled'> {
  label: string;
}
