import { PropsWithChildren } from 'react';

import FormRepeaterListItemContent from '@/components/FormRepeater/FormRepeaterListItemContent';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';
import { Typography } from '@/components/Typography';

const FormRepeaterListItemTextContent = ({
  className,
  children,
}: PropsWithChildren<FormRepeaterListItemContentProps>) => {
  return (
    <FormRepeaterListItemContent className={className}>
      <Typography color='black' variant='body-16-r'>
        {children}
      </Typography>
    </FormRepeaterListItemContent>
  );
};

export default FormRepeaterListItemTextContent;
