import { InputFieldProps } from '@/components/Input/InputField';

export interface InputPasswordRule {
  [key: string]: {
    message: string;
    regex: RegExp;
  };
}

export interface InputPasswordProps extends Omit<InputFieldProps, 'type'> {
  rules?: InputPasswordRule;
}

export interface InputPasswordRuleProps
  extends Required<Pick<InputPasswordProps, 'rules'>>,
    Pick<InputPasswordProps, 'value'> {}
