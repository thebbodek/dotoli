import clsx from 'clsx';

import CheckboxBase from '@/components/Checkbox/CheckboxBase';
import CheckboxIcon from '@/components/Checkbox/CheckboxIcon';
import { CHECKBOX_LABEL_STYLE } from '@/components/Checkbox/constants';
import { CheckboxProps } from '@/components/Checkbox/types';
import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';

const Checkbox = ({ className, ...props }: CheckboxProps) => {
  const { checked, disabled } = props;

  return (
    <CheckboxBase
      {...props}
      className={clsx(className, CHECKBOX_LABEL_STYLE, TOUCH_TARGET_STYLE)}
    >
      <CheckboxIcon checked={checked} disabled={disabled} />
    </CheckboxBase>
  );
};

export default Checkbox;
