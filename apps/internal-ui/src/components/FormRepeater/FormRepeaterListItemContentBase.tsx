import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FORM_REPEATER_PRIMITIVE_CONTENT_STYLE } from '@/components/FormRepeater/constants';
import { useFormRepeaterListItemContentContext } from '@/components/FormRepeater/context/FormRepeaterListItemContentContext';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';

const FormRepeaterListItemContentBase = ({
  className,
  children,
}: PropsWithChildren<FormRepeaterListItemContentProps>) => {
  const { column } = useFormRepeaterListItemContentContext();
  const { className: columnClassName } = column.props;

  return (
    <div
      className={clsx(
        className,
        columnClassName,
        FORM_REPEATER_PRIMITIVE_CONTENT_STYLE,
      )}
    >
      {children}
    </div>
  );
};

export default FormRepeaterListItemContentBase;
