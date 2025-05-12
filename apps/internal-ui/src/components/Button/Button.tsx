import { ButtonProps } from '@/components/Button/types';

const Button = ({ content, ...props }: ButtonProps) => {
  return (
    <button disabled {...props}>
      {content}
    </button>
  );
};

export default Button;
