import clsx from 'clsx';

import {
  COLLAPSE_BUTTON_BASE_STYLE,
  COLLAPSE_BUTTON_ICON_KEY,
  COLLAPSE_BUTTON_ICON_STYLE,
  COLLAPSE_BUTTON_ICON_WEIGHT,
  COLLAPSE_BUTTON_LABELS,
  COLLAPSE_BUTTON_OPEN_ICON_STYLE,
} from '@/components/Button/CollapseButton/constants';
import { CollapseButtonProps } from '@/components/Button/CollapseButton/types';
import { ButtonIcon } from '@/components/Button/shared';

const CollapseButton = ({
  isOpen,
  className,
  onClick,
  ref,
  'aria-controls': ariaControls,
}: CollapseButtonProps) => {
  const { EXPANDED, COLLAPSED } = COLLAPSE_BUTTON_LABELS;

  return (
    <button
      aria-controls={ariaControls}
      aria-expanded={isOpen}
      className={clsx(className, COLLAPSE_BUTTON_BASE_STYLE)}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      {isOpen ? EXPANDED : COLLAPSED}
      <ButtonIcon
        className={clsx(
          COLLAPSE_BUTTON_ICON_STYLE,
          isOpen && COLLAPSE_BUTTON_OPEN_ICON_STYLE,
        )}
        iconKey={COLLAPSE_BUTTON_ICON_KEY}
        weight={COLLAPSE_BUTTON_ICON_WEIGHT}
      />
    </button>
  );
};

export default CollapseButton;
