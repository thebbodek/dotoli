import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FORM_REPEATER_BASIC_CONTENT_STYLE } from '@/components/FormRepeater/constants';
import FormRepeaterListItemContentBase from '@/components/FormRepeater/FormRepeaterListItemContentBase';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';

const FormRepeaterListItemContent = ({
  className,
  children,
}: PropsWithChildren<FormRepeaterListItemContentProps>) => {
  return (
    <FormRepeaterListItemContentBase
      className={clsx(className, FORM_REPEATER_BASIC_CONTENT_STYLE)}
    >
      {children}
    </FormRepeaterListItemContentBase>
  );
};

export default FormRepeaterListItemContent;
