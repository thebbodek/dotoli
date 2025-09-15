import clsx from 'clsx';

import {
  FORM_REPEATER_BASIC_CONTENT_STYLE,
  FORM_REPEATER_PRIMITIVE_CONTENT_STYLE,
} from '@/components/FormRepeater/constants';
import FormRepeaterDeleteButton from '@/components/FormRepeater/FormRepeaterDeleteButton';
import FormRepeaterResetButton from '@/components/FormRepeater/FormRepeaterResetButton';
import { FormRepeaterListItemActionsContentProps } from '@/components/FormRepeater/types';

const FormRepeaterListItemActionsContent = ({
  isChanged,
  isAdded,
  onDelete,
  onReset,
}: FormRepeaterListItemActionsContentProps) => {
  return (
    <>
      <div className='bg-in-gray-02 h-[2.5rem] w-px shrink-0' />
      <div
        className={clsx(
          FORM_REPEATER_PRIMITIVE_CONTENT_STYLE,
          FORM_REPEATER_BASIC_CONTENT_STYLE,
          'gap-x-1',
        )}
      >
        {onDelete && (
          <FormRepeaterDeleteButton isChanged={isChanged} onClick={onDelete} />
        )}
        {onReset && (
          <FormRepeaterResetButton
            isChanged={isChanged}
            isAdded={isAdded}
            onClick={onReset}
          />
        )}
      </div>
    </>
  );
};

export default FormRepeaterListItemActionsContent;
