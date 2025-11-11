import {
  ButtonHTMLAttributes,
  ChangeEvent,
  Dispatch,
  ElementType,
  FormEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
} from 'react';

import { IconProps } from '@/components/Icon';
import { INPUT_ELEMENTS } from '@/components/Input/shared/constants';
import { InputLabelProps } from '@/components/shared';
import { InputTriggerWrapperProps } from '@/components/shared/components/InputTriggerWrapper';
import { ComponentPropsRef } from '@/components/shared/types';

export type InputElements =
  (typeof INPUT_ELEMENTS)[keyof typeof INPUT_ELEMENTS];

export type InputElementType = Extract<ElementType, InputElements>;

export type InputElement<T extends InputElementType> =
  T extends typeof INPUT_ELEMENTS.INPUT
    ? HTMLInputElement
    : HTMLTextAreaElement;

export interface InputContextProps {
  feedbackId?: string;
  isError?: boolean;
}

export interface InputProviderProps extends InputContextProps {}

export interface InputBaseProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Pick<InputContextProps, 'isError'>,
    Pick<InputLabelProps, 'badge'>,
    Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'required'> {
  label: string;
  hiddenLabel?: InputLabelProps['hidden'];
  value: string | null;
  feedback?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export interface InputDefaultProps<
  T extends InputElementType,
  P extends InputElement<T>,
> extends Pick<InputBaseProps, 'id' | 'required' | 'value'>,
    Pick<InputTriggerWrapperProps, 'variant'>,
    Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    ComponentPropsRef<P>,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      'placeholder' | 'disabled' | 'readOnly' | 'name' | 'autoComplete'
    > {
  as?: T;
  addonEnd?: ReactNode;
  popover?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset?: () => void;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  maxLength?: number;
  inputClassName?: HTMLAttributes<P>['className'];
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
> extends Pick<InputProps<T, P>, 'value' | 'onChange' | 'name'>,
    Required<Pick<InputDefaultProps<T, P>, 'maxLength'>> {
  regCallback?: (value: string) => string;
}

export interface InputIconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'onClick' | 'type' | 'className' | 'aria-label'
    >,
    Pick<IconProps, 'iconKey' | 'weight'> {}
