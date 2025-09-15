import clsx from 'clsx';

import { FORM_REPEATER_PRIMITIVE_CONTENT_STYLE } from '@/components/FormRepeater/constants';
import { FormRepeaterHeaderContentProps } from '@/components/FormRepeater/types';
import { Typography } from '@/components/Typography';

const FormRepeaterHeaderContent = ({
  label,
  required = false,
  className,
}: FormRepeaterHeaderContentProps) => {
  return (
    <div className={clsx(className, FORM_REPEATER_PRIMITIVE_CONTENT_STYLE)}>
      <Typography
        className={clsx(required && 'before:content-["*"]')}
        color='gray-06'
        variant='body-14-m'
      >
        {label}
      </Typography>
    </div>
  );
};

export default FormRepeaterHeaderContent;
