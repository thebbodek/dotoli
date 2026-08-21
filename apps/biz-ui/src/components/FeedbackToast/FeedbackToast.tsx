import clsx from 'clsx';

import {
  FEEDBACK_TOAST_BASE_STYLE,
  FEEDBACK_TOAST_DEFAULT_ROLE,
  FEEDBACK_TOAST_ICON_STYLE,
  FEEDBACK_TOAST_ICON_WEIGHT,
  FEEDBACK_TOAST_MESSAGE_STYLE,
  FEEDBACK_TOAST_STYLES,
  FEEDBACK_TOAST_TYPES,
} from '@/components/FeedbackToast/constants';
import { FeedbackToastProps } from '@/components/FeedbackToast/types';
import { Icon } from '@/components/Icon';
import { Typography, TYPOGRAPHY_ELEMENTS } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const FeedbackToast = ({
  message,
  type = FEEDBACK_TOAST_TYPES.SUCCESS,
  className,
  role = FEEDBACK_TOAST_DEFAULT_ROLE,
  'aria-live': ariaLive,
}: FeedbackToastProps) => {
  const { ICON_KEY, ICON } = FEEDBACK_TOAST_STYLES[type];

  return (
    <div
      aria-live={ariaLive}
      className={clsx(className, FEEDBACK_TOAST_BASE_STYLE)}
      role={role}
    >
      <Icon
        className={clsx(FEEDBACK_TOAST_ICON_STYLE, ICON)}
        iconKey={ICON_KEY}
        weight={FEEDBACK_TOAST_ICON_WEIGHT}
        aria-hidden
      />
      <Typography
        as={TYPOGRAPHY_ELEMENTS.P}
        className={FEEDBACK_TOAST_MESSAGE_STYLE}
        color={COLOR_VARIANTS.WHITE}
        variant={TYPOGRAPHY_VARIANTS.BODY_SEMIBOLD}
      >
        {message}
      </Typography>
    </div>
  );
};

export default FeedbackToast;
