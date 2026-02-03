import { OverlayAsyncControllerComponent } from 'overlay-kit';

import { ButtonProps } from '@/components/Button';
import {
  UseStepDialogParams,
  UseStepDialogReturnType,
} from '@/components/shared/components/DialogOverlay/StepDialog/hooks';
import { FormDialogOverlayProps } from '@/components/shared/components/DialogOverlay/types';
import {
  OverlayFooterPrimitiveProps,
  OverlayFooterWrapperProps,
} from '@/components/shared/components/Overlay';

export interface StepActionParams<T extends string> {
  step: T;
}

export interface StepDialogProps<T extends string>
  extends Omit<
      FormDialogOverlayProps,
      'confirmOption' | 'cancelOption' | 'title' | 'possibleConfirm'
    >,
    Pick<UseStepDialogParams<T>, 'steps'>,
    Pick<UseStepDialogReturnType<T>['models'], 'step'>,
    Pick<UseStepDialogReturnType<T>['operations'], 'goToStep'> {
  titles: Record<T, string>;
  previousOptions?: {
    disabled?: boolean;
    onClick?: (params: StepActionParams<T>) => void;
  };
  confirmOptions: Pick<
    OverlayFooterPrimitiveProps['confirmOption'],
    'tooltipOption'
  > & {
    disabled?: boolean;
    onClick: (params: StepActionParams<T>) => void;
  };
  onCancel: () => void;
}

export interface StepDialogFooterProps<T extends string>
  extends Pick<OverlayFooterWrapperProps, 'className'>,
    Pick<
      StepDialogProps<T>,
      | 'step'
      | 'steps'
      | 'previousOptions'
      | 'confirmOptions'
      | 'isPending'
      | 'goToStep'
    > {
  buttonOptions: Pick<ButtonProps, 'size' | 'className'>;
}

export interface StepDialogButtonPrimitiveProps<T extends string>
  extends Pick<
    StepDialogFooterProps<T>,
    'buttonOptions' | 'isPending' | 'goToStep'
  > {
  currentIndex: number;
  stepKeys: T[];
}

export interface StepDialogPreviousButtonProps<T extends string>
  extends StepDialogButtonPrimitiveProps<T>,
    Pick<StepDialogProps<T>, 'previousOptions'> {}

export interface StepDialogConfirmButtonProps<T extends string>
  extends StepDialogButtonPrimitiveProps<T>,
    Pick<StepDialogProps<T>, 'confirmOptions'> {}

export type OverlayAsyncProps<T> = Parameters<
  OverlayAsyncControllerComponent<T>
>[0];
