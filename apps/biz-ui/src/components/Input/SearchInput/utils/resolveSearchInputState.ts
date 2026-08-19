import { SEARCH_INPUT_STATES } from '@/components/Input/SearchInput/constants';
import { ResolveSearchInputStateProps } from '@/components/Input/SearchInput/types';

export const resolveSearchInputState = ({
  errorMessage,
  isFocused,
  hasValue,
}: ResolveSearchInputStateProps) => {
  if (errorMessage) return SEARCH_INPUT_STATES.ERROR;

  if (isFocused) return SEARCH_INPUT_STATES.TYPING;

  if (hasValue) return SEARCH_INPUT_STATES.FILL;

  return SEARCH_INPUT_STATES.DEFAULT;
};
