import { ButtonProps } from '@/components/Button/types';

const Button = ({ content, ...props }: ButtonProps) => {
  return <button {...props}>{content}</button>;
};

export default Button;
