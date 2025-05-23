import clsx from 'clsx';
import Link from 'next/link';
import { MouseEvent } from 'react';

import { LinkButtonProps } from '@/components/Button/LinkButton/types';
import ButtonIcon from '@/components/Button/shared/ButtonIcon';
import useButtonRenderErrorEffect from '@/components/Button/shared/hooks/effects/useButtonRenderErrorEffect';
import { generateButtonStyle } from '@/components/Button/shared/utils/generateButtonStyle';

const LinkButton = ({
  href,
  label,
  className,
  ref,
  onClick,
  ...props
}: LinkButtonProps) => {
  const { variant, theme, size, disabled, leftIconKey, rightIconKey, ...rest } =
    props;

  useButtonRenderErrorEffect({ variant, theme, size });

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };

  return (
    <Link
      aria-disabled={disabled}
      className={clsx(generateButtonStyle(props), className)}
      href={href}
      ref={ref}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      {...rest}
    >
      {leftIconKey && <ButtonIcon iconKey={leftIconKey} />}
      {label}
      {rightIconKey && <ButtonIcon iconKey={rightIconKey} />}
    </Link>
  );
};

export default LinkButton;
