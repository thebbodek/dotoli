import clsx from 'clsx';
import { MouseEvent } from 'react';

import { ButtonProps } from '@/components/Button/Button/types';
import ButtonIcon from '@/components/Button/shared/ButtonIcon';
import { BUTTON_PENDING_ICON_KEY } from '@/components/Button/shared/constants';
import useButtonPropsValidationEffect from '@/components/Button/shared/hooks/effects/useButtonRenderErrorEffect';
import { generateButtonStyle } from '@/components/Button/shared/utils/generateButtonStyle';
import { IconProps } from '@/components/Icon';

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
  const { variant, theme, size, iconOption } = props;
  const iconKey = isPending ? BUTTON_PENDING_ICON_KEY : iconOption?.iconKey;
  const isDisabled = disabled || isPending;

  useButtonPropsValidationEffect({ variant, theme, size });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        className,
        generateButtonStyle({
          ...props,
          iconOption: { iconKey: iconKey as IconProps['iconKey'] },
          disabled: isDisabled,
        }),
      )}
      disabled={isDisabled}
      ref={ref}
      type={type}
      onClick={handleClick}
    >
      {iconKey && (
        <ButtonIcon
          iconKey={iconKey}
          size={size}
          className={clsx(isPending && 'animate-spin')}
          responsive={props.responsive}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
