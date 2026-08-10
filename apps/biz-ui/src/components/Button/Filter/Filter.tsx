import clsx from 'clsx';

import {
  FILTER_BASE_STYLE,
  FILTER_STATES,
  FILTER_STYLES,
} from '@/components/Button/Filter/constants';
import { FilterProps } from '@/components/Button/Filter/types';
import { ButtonIcon } from '@/components/Button/shared';

const Filter = ({
  label,
  selected = false,
  iconOption,
  type = 'button',
  className,
  onClick,
  ref,
}: FilterProps) => {
  const { iconKey, weight } = iconOption ?? {};
  const { CONTAINER, ICON } =
    FILTER_STYLES[selected ? FILTER_STATES.SELECTED : FILTER_STATES.DEFAULT];

  return (
    <button
      aria-pressed={selected}
      className={clsx(className, FILTER_BASE_STYLE, CONTAINER)}
      ref={ref}
      type={type}
      onClick={onClick}
    >
      {!!iconKey && (
        <ButtonIcon className={ICON} iconKey={iconKey} weight={weight} />
      )}
      {label}
    </button>
  );
};

export default Filter;
