import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  INPUT_FEEDBACK_THEME_STYLES,
  INPUT_FEEDBACK_THEMES,
} from '@/components/shared/components/InputFeedback/constants';
import { InputFeedbackProps } from '@/components/shared/components/InputFeedback/types';
import { Typography } from '@/components/Typography';

const InputFeedback = ({
  id,
  feedback,
  theme = INPUT_FEEDBACK_THEMES.ERROR,
  className,
}: InputFeedbackProps) => {
  return (
    <Typography
      id={id}
      as='p'
      role='alert'
      ariaLive='assertive'
      variant='body-12-m'
      color='primary-05'
      className={clsx(
        className,
        INPUT_FEEDBACK_THEME_STYLES[theme],
        'text-body-14-m mt-1.5 items-baseline gap-x-0.5 break-all',
      )}
    >
      <Icon iconKey='info' weight='fill' className='translate-y-[0.083em]' />
      {feedback}
    </Typography>
  );
};

export default InputFeedback;
