import { CHECKBOX_STATES } from '@/components/Checkbox/constants';
import { ResolveCheckboxStateProps } from '@/components/Checkbox/types';

export const resolveCheckboxState = ({
  checked,
  disabled,
}: ResolveCheckboxStateProps) => {
  if (disabled) {
    return checked
      ? CHECKBOX_STATES.CHECKED_DISABLED
      : CHECKBOX_STATES.DISABLED;
  }

  return checked ? CHECKBOX_STATES.CHECKED : CHECKBOX_STATES.DEFAULT;
};
