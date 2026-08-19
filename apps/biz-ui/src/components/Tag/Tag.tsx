import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  TAG_ARIA_LABEL_SUFFIX,
  TAG_BASE_STYLE,
  TAG_ICON_KEY,
  TAG_ICON_STYLE,
  TAG_ICON_WEIGHT,
} from '@/components/Tag/constants';
import { TagProps } from '@/components/Tag/types';

const Tag = ({
  label,
  className,
  onClick,
  ref,
  'aria-label': ariaLabel,
}: TagProps) => {
  return (
    <button
      aria-label={ariaLabel ?? `${label} ${TAG_ARIA_LABEL_SUFFIX}`}
      className={clsx(className, TAG_BASE_STYLE)}
      ref={ref}
      type='button'
      onClick={onClick}
    >
      {label}
      <Icon
        className={TAG_ICON_STYLE}
        iconKey={TAG_ICON_KEY}
        weight={TAG_ICON_WEIGHT}
        aria-hidden
      />
    </button>
  );
};

export default Tag;
