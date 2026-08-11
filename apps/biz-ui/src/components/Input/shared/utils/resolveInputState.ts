import { INPUT_STATES } from '@/components/Input/shared/constants';
import { ResolveInputStateProps } from '@/components/Input/shared/types';

export const resolveInputState = ({
  disabled,
  readOnly,
  errorMessage,
}: ResolveInputStateProps) => {
  if (disabled || readOnly) return INPUT_STATES.DISABLED;

  if (errorMessage) return INPUT_STATES.ERROR;

  return INPUT_STATES.DEFAULT;
};
