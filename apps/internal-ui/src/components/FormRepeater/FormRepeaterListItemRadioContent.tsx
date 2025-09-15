import clsx from 'clsx';
import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from 'react';

import { useFormRepeaterContext } from '@/components/FormRepeater/context/FormRepeaterContext';
import FormRepeaterListItemContent from '@/components/FormRepeater/FormRepeaterListItemContent';
import { FormRepeaterListItemContentProps } from '@/components/FormRepeater/types';
import { RADIO_SIZES, RadioProps } from '@/components/Radio';

const FormRepeaterListItemRadioContent = ({
  className,
  children,
}: PropsWithChildren<FormRepeaterListItemContentProps>) => {
  const { disabled: isAllDisabled } = useFormRepeaterContext();

  return (
    <FormRepeaterListItemContent className={clsx(className, 'gap-x-2.5')}>
      {Children.toArray(children).map((child) => {
        if (!isValidElement<RadioProps>(child)) {
          return null;
        }

        return cloneElement(child, {
          size: RADIO_SIZES.SM,
          disabled: child.props.disabled || isAllDisabled,
        });
      })}
    </FormRepeaterListItemContent>
  );
};

export default FormRepeaterListItemRadioContent;
