import clsx from 'clsx';

import {
  FLOATING_PILL_BASE_STYLE,
  FLOATING_PILL_SCROLL_TO_TOP_ICON_KEY,
  FLOATING_PILL_STYLES,
  FLOATING_PILL_VARIANTS,
} from '@/components/Button/FloatingPill/constants';
import { FloatingPillProps } from '@/components/Button/FloatingPill/types';
import { ButtonIcon } from '@/components/Button/shared';

const FloatingPill = ({
  label,
  variant = FLOATING_PILL_VARIANTS.NAVIGATE,
  type = 'button',
  className,
  onClick,
  ref,
}: FloatingPillProps) => {
  return (
    <button
      className={clsx(
        className,
        FLOATING_PILL_BASE_STYLE,
        FLOATING_PILL_STYLES[variant],
      )}
      ref={ref}
      type={type}
      onClick={onClick}
    >
      {label}
      {variant === FLOATING_PILL_VARIANTS.SCROLL_TO_TOP && (
        <ButtonIcon iconKey={FLOATING_PILL_SCROLL_TO_TOP_ICON_KEY} />
      )}
    </button>
  );
};

export default FloatingPill;
