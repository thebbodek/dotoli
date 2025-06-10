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
  isPending = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const { variant, theme, size } = props;
  const iconKey = isPending ? 'circle-notch' : props.iconKey;
  const isDisabled = disabled || isPending;

  useButtonPropsValidationEffect({ variant, theme, size });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        generateButtonStyle({ ...props, iconKey, disabled: isDisabled }),
        className,
      )}
      disabled={isDisabled}
      ref={ref}
      type={type}
      onClick={handleClick}
    >
      {iconKey && (
        <ButtonIcon
          iconKey={iconKey}
          className={clsx(isPending && 'animate-spin')}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
