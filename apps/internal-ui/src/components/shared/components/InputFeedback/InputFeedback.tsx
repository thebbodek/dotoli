import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import {
  INPUT_FEEDBACK_THEMES,
  INPUT_FEEDBACK_TYPOGRAPHY_COLOR,
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
      aria-live='assertive'
      as='p'
      className={clsx(className, 'mt-1.5 items-baseline gap-x-0.5 break-all')}
      color={INPUT_FEEDBACK_TYPOGRAPHY_COLOR[theme]}
      id={id}
      role='alert'
      variant='body-12-m'
    >
      <Icon className='translate-y-[0.083em]' iconKey='info' weight='fill' />
      {feedback}
    </Typography>
  );
};

export default InputFeedback;
