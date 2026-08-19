import clsx from 'clsx';
import { useId } from 'react';

import ToggleBase from '@/components/Toggle/ToggleBase';
import ToggleTrack from '@/components/Toggle/ToggleTrack';
import {
  TOGGLE_LIST_ITEM_BASE_STYLE,
  TOGGLE_LIST_ITEM_TEXT_COLORS,
  TOGGLE_LIST_ITEM_TEXT_STYLE,
  TOGGLE_LIST_ITEM_TEXT_VARIANTS,
  TOGGLE_LIST_ITEM_TRUNCATE_STYLE,
} from '@/components/ToggleListItem/constants';
import { ToggleListItemProps } from '@/components/ToggleListItem/types';
import { Typography } from '@/components/Typography';

const ToggleListItem = ({
  label,
  description,
  className,
  ...props
}: ToggleListItemProps) => {
  const { checked } = props;
  const generatedId = useId();

  const labelId = `${generatedId}-label`;
  const descriptionId = `${generatedId}-description`;

  return (
    <ToggleBase
      {...props}
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      className={clsx(className, TOGGLE_LIST_ITEM_BASE_STYLE)}
    >
      <span className={TOGGLE_LIST_ITEM_TEXT_STYLE}>
        <Typography
          as='span'
          className={TOGGLE_LIST_ITEM_TRUNCATE_STYLE}
          color={TOGGLE_LIST_ITEM_TEXT_COLORS.LABEL}
          id={labelId}
          variant={TOGGLE_LIST_ITEM_TEXT_VARIANTS.LABEL}
        >
          {label}
        </Typography>
        <Typography
          as='span'
          className={TOGGLE_LIST_ITEM_TRUNCATE_STYLE}
          color={TOGGLE_LIST_ITEM_TEXT_COLORS.DESCRIPTION}
          id={descriptionId}
          variant={TOGGLE_LIST_ITEM_TEXT_VARIANTS.DESCRIPTION}
        >
          {description}
        </Typography>
      </span>
      <ToggleTrack checked={checked} />
    </ToggleBase>
  );
};

export default ToggleListItem;
