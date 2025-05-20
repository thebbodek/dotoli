import clsx from 'clsx';

import { ButtonProps } from '@/components/Button/Button/types';
import ButtonIcon from '@/components/Button/shared/ButtonIcon';
import useButtonPropsValidationEffect from '@/components/Button/shared/hooks/effects/useButtonRenderErrorEffect';
import { generateButtonStyle } from '@/components/Button/shared/utils/generateButtonStyle';

const Button = ({
  label,
  type = 'button',
  className,
  ref,
  onClick,
  ...props
}: ButtonProps) => {
  const { variant, theme, size, disabled, iconKey } = props;

  useButtonPropsValidationEffect({ variant, theme, size });

  return (
    <button
      className={clsx(generateButtonStyle(props), className)}
      disabled={disabled}
      ref={ref}
      type={type}
      onClick={onClick}
    >
      {iconKey && <ButtonIcon iconKey={iconKey} />}
      {label}
    </button>
  );
};

export default Button;
