import {
  ButtonPrimitiveProps,
  ButtonProps,
  LinkButtonProps,
} from '@/components/Button';
import { ACTION_BUTTON_ELEMENTS } from '@/components/shared/components/ActionButton/constants';

export type ActionButtonElement =
  (typeof ACTION_BUTTON_ELEMENTS)[keyof typeof ACTION_BUTTON_ELEMENTS];

export interface ActionButtonProps extends ButtonPrimitiveProps {
  as?: ActionButtonElement;
  buttonOption?: Omit<ButtonProps, keyof ButtonPrimitiveProps>;
  linkOption?: Omit<LinkButtonProps, keyof ButtonPrimitiveProps>;
}

export interface UseActionButtonPropsValidationEffect
  extends Pick<ActionButtonProps, 'as' | 'linkOption' | 'buttonOption'> {}
