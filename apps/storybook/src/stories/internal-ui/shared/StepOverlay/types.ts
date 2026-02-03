import { StepDialogProps } from '@bbodek/internal-ui';

import { ConfirmModalArgs } from '@/stories/internal-ui/Modal/ConfirmModal.stories';
import { STEPS_MAPPER } from '@/stories/internal-ui/shared/StepOverlay/constants';

export type Steps = (typeof STEPS_MAPPER)[keyof typeof STEPS_MAPPER];

export type StepDialogExtraConfirmModalArgsKeys = keyof Pick<
  ConfirmModalArgs,
  'children' | 'className' | 'ref' | 'isLoading' | 'isOpen' | 'isPending'
>;

export interface StepDialogArgs
  extends Pick<ConfirmModalArgs, StepDialogExtraConfirmModalArgsKeys>,
    Omit<StepDialogProps<Steps>, StepDialogExtraConfirmModalArgsKeys> {}
