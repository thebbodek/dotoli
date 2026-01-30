import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import InputLabelText from '@/components/shared/components/InputLabel/InputLabelTitle';
import InputLabelWrapper from '@/components/shared/components/InputLabel/InputLabelWrapper';
import { InputLabelProps } from '@/components/shared/components/InputLabel/types';

const InputLabel = ({
  htmlFor,
  children,
  hidden = false,
  className,
  badge,
  ...props
}: PropsWithChildren<InputLabelProps>) => {
  const classNames = clsx(className, 'mb-0.5', hidden && 'sr-only');

  if (htmlFor) {
    return (
      <InputLabelWrapper badge={badge} className={classNames} htmlFor={htmlFor}>
        <InputLabelText {...props}>{children}</InputLabelText>
        {badge && badge}
      </InputLabelWrapper>
    );
  }

  if (badge) {
    return (
      <InputLabelWrapper badge={badge} className={classNames}>
        <InputLabelText>{children}</InputLabelText>
        {badge}
      </InputLabelWrapper>
    );
  }

  return (
    <InputLabelText className={clsx(className, classNames)}>
      {children}
    </InputLabelText>
  );
};

export default InputLabel;
