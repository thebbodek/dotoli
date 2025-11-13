import clsx from 'clsx';
import Link from 'next/link';
import { MouseEvent } from 'react';

import { LinkButtonProps } from '@/components/Button/LinkButton/types';
import ButtonIcon from '@/components/Button/shared/ButtonIcon';
import useButtonPropsValidationEffect from '@/components/Button/shared/hooks/effects/useButtonRenderErrorEffect';
import { generateButtonStyle } from '@/components/Button/shared/utils/generateButtonStyle';

const LinkButton = ({
  href,
  label,
  className,
  ref,
  onClick,
  variant,
  theme,
  size,
  disabled,
  iconOption,
  iconPosition,
  responsive,
  ...props
}: LinkButtonProps) => {
  const { iconKey } = iconOption ?? {};

  useButtonPropsValidationEffect({ variant, theme, size });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };

  return (
    <Link
      className={clsx(
        className,
        generateButtonStyle({
          variant,
          theme,
          size,
          disabled,
          iconOption,
          iconPosition,
          responsive,
        }),
      )}
      aria-disabled={disabled}
      href={href}
      ref={ref}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      {...props}
    >
      {iconKey && (
        <ButtonIcon iconKey={iconKey} responsive={responsive} size={size} />
      )}
      {label}
    </Link>
  );
};

export default LinkButton;
