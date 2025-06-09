import {
  ButtonHTMLAttributes,
  ChangeEvent,
  Dispatch,
  ElementType,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

import { IconProps } from '@/components/Icon';
import {
  INPUT_ELEMENTS,
  INPUT_STATE,
  INPUT_VARIANTS,
} from '@/components/Input/shared/constants';
import { ComponentPropsRef } from '@/components/shared/types';

export type InputElements =
  (typeof INPUT_ELEMENTS)[keyof typeof INPUT_ELEMENTS];

export type InputVariants =
  (typeof INPUT_VARIANTS)[keyof typeof INPUT_VARIANTS];

export type InputState = (typeof INPUT_STATE)[keyof typeof INPUT_STATE];

export type InputElementType = Extract<ElementType, InputElements>;

export type InputElement<T extends InputElementType> =
  T extends typeof INPUT_ELEMENTS.INPUT
    ? HTMLInputElement
    : HTMLTextAreaElement;

export interface InputBaseProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'required'> {
  value?: string;
  label?: string;
  feedback?: string;
  error?: boolean;
  badge?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface InputDefaultProps<
  T extends InputElementType,
  P extends InputElement<T>,
> extends Pick<InputBaseProps, 'id' | 'required' | 'value'>,
    ComponentPropsRef<P>,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'className'
      | 'placeholder'
      | 'disabled'
      | 'readOnly'
      | 'name'
      | 'autoComplete'
    > {
  as?: T;
  variant?: InputVariants;
  addonEnd?: ReactNode;
  popover?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset?: () => void;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export type InputProps<
  T extends InputElementType,
  P extends InputElement<T>,
> = InputDefaultProps<T, P> &
  (T extends typeof INPUT_ELEMENTS.INPUT
    ? Pick<InputHTMLAttributes<HTMLInputElement>, 'type'>
    : {});

export interface UseInputChangeProps<
  T extends InputElementType,
  P extends InputElement<T>,
> extends Pick<InputProps<T, P>, 'value' | 'onChange' | 'name'> {
  regCallback?: (value: string) => string;
}

export interface InputIconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'onClick' | 'type'
    >,
    Pick<IconProps, 'iconKey' | 'weight'> {
  ariaLabel?: string;
}
