import { SELECT_OPTION_POS_IN_SET } from '@/components/Select/shared/constants';
import {
  GetIsAdjacentOptionParams,
  GetOptionPosInSetParams,
} from '@/components/Select/shared/utils/types';

export const getOptionPosInSet = ({ option }: GetOptionPosInSetParams) => {
  const posInSet = option.getAttribute(SELECT_OPTION_POS_IN_SET.ATTRIBUTE);

  return posInSet === null ? null : Number(posInSet);
};

export const getIsAdjacentOption = ({
  option,
  targetOption,
}: GetIsAdjacentOptionParams) => {
  const posInSet = getOptionPosInSet({ option });
  const targetPosInSet = getOptionPosInSet({ option: targetOption });

  if (posInSet === null || targetPosInSet === null) return true;

  return Math.abs(posInSet - targetPosInSet) === 1;
};

export const getIsFirstOption = ({ option }: GetOptionPosInSetParams) => {
  const posInSet = getOptionPosInSet({ option });

  return posInSet === null || posInSet === SELECT_OPTION_POS_IN_SET.FIRST;
};
