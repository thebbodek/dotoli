import { getIsAdjacentOption } from '@/components/Select/shared/utils/getOptionPosInSet';
import { FocusAdjacentOptionParams } from '@/components/Select/shared/utils/types';

export const focusAdjacentOption = ({
  option,
  targetOption,
}: FocusAdjacentOptionParams) => {
  if (targetOption && getIsAdjacentOption({ option, targetOption })) {
    targetOption.focus();

    return;
  }

  option.scrollIntoView({ block: 'nearest' });
};
