import clsx from 'clsx';
import Link from 'next/link';

import {
  ICON_BUTTON_SIZES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { generateIconButtonStyle } from '@/components/Button/IconButton/utils';
import { LinkIconButtonProps } from '@/components/Button/LinkIconButton/types';
import { ButtonIcon } from '@/components/Button/shared';
import { generateLinkButtonClickHandler } from '@/components/Button/shared/utils';

const LinkIconButton = ({
  iconKey,
  weight,
  theme = ICON_BUTTON_THEMES.DEFAULT,
  size = ICON_BUTTON_SIZES.LG,
  isDisabled = false,
  className,
  ref,
  onClick,
  ...props
}: LinkIconButtonProps) => {
  return (
    <Link
      {...props}
      className={clsx(
        className,
        generateIconButtonStyle({ theme, size, disabled: isDisabled }),
      )}
      aria-disabled={isDisabled}
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      onClick={generateLinkButtonClickHandler({ isDisabled, onClick })}
    >
      <ButtonIcon iconKey={iconKey} weight={weight} />
    </Link>
  );
};

export default LinkIconButton;
